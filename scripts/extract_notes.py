"""Extract text from public/notes/*.pdf into src/data/notes.generated.json (run: python scripts/extract_notes.py)."""
import json, re, pymupdf as fitz

def clean(t):
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r' ([,.;:)\]!?])', r'\1', t)
    t = re.sub(r'([(\[]) ', r'\1', t)
    return t

def cell_text(page, bbox):
    words = page.get_text('words', clip=fitz.Rect(bbox) + (-1, -1, 1, 1))
    words = [w for w in words if bbox[0] - 2 <= (w[0] + w[2]) / 2 <= bbox[2] + 2 and bbox[1] - 2 <= (w[1] + w[3]) / 2 <= bbox[3] + 2]
    words.sort(key=lambda w: (round(w[3] / 3), w[0]))
    return clean(' '.join(w[4] for w in words))

def page_items(page):
    items = []  # (y, kind, payload)
    tables = page.find_tables().tables
    tb = [fitz.Rect(t.bbox) for t in tables]
    for t in tables:
        rows = []
        for r in t.rows:
            rows.append([cell_text(page, c) if c else '' for c in r.cells])
        rows = [r for r in rows if any(r)]
        if len(rows) >= 2:
            items.append((t.bbox[1], 'table', {'type': 'table', 'headers': rows[0], 'rows': rows[1:]}))
    for b in page.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            bb = fitz.Rect(l['bbox'])
            if any(bb.intersects(r) and (bb & r).get_area() > 0.4 * bb.get_area() for r in tb):
                continue
            spans = l['spans']
            text = ''.join(s['text'] for s in spans)
            if not text.strip():
                continue
            size = round(spans[0]['size'], 1)
            if size < 8 and bb.y0 < 30 or size <= 7.5 and not spans[0]['font'].endswith('Mono'):
                continue  # header / footer
            mono = 'Mono' in spans[0]['font']
            items.append((bb.y0, 'line', dict(text=text, size=size, x=bb.x0, x1=bb.x1, y=bb.y0, mono=mono, pw=page.rect.width)))
    items.sort(key=lambda i: i[0])
    return items

def parse(path):
    doc = fitz.open(path)
    all_items = []
    for p in doc:
        all_items += [i for i in page_items(p)] + [(1e9, 'pagebreak', None)]
    sizes = [i[2]['size'] for i in all_items if i[1] == 'line']
    big = max(sizes)
    heads = sorted({s for s in sizes if s >= 16 and s < big})
    head_size = heads[0] if heads else 18
    body_x = min(i[2]['x'] for i in all_items if i[1] == 'line' and i[2]['size'] == 12 and not i[2]['mono'])
    code_max_x1 = {}
    for i in all_items:
        if i[1] == 'line' and i[2]['mono'] and i[2]['size'] >= 8 and body_x + 6 <= i[2]['x'] <= body_x + 16 and i[2]['x1'] < i[2]['pw'] - 20:
            k = i[2]['size']; code_max_x1[k] = max(code_max_x1.get(k, 0), i[2]['x1'])
    sections, cur = [], None
    def start(title):
        nonlocal cur
        cur = {'title': title, 'blocks': []}; sections.append(cur)
    def add(b):
        if cur is None: return
        cur['blocks'].append(b)

    para = None   # {'kind','lines','last_y','x'}
    code = None
    def flush():
        nonlocal para, code
        if para:
            t = clean(' '.join(para['lines']))
            if para['kind'] == 'bullet':
                if cur and cur['blocks'] and cur['blocks'][-1]['type'] == 'bullets': cur['blocks'][-1]['items'].append(t)
                else: add({'type': 'bullets', 'items': [t]})
            elif para['kind'] == 'sub':
                add({'type': 'subheading', 'text': t})
            else:
                add({'type': 'paragraph', 'text': t})
        if code:
            add({'type': 'code', 'text': '\n'.join(code['lines']).strip('\n')})
        para = code = None

    prev_y = None; prev_head_y = None; prev_x1 = 0
    for y, kind, d in all_items:
        if kind == 'pagebreak':
            prev_y = None; continue
        if kind == 'table':
            flush(); add(d); prev_y = None; continue
        size, x, mono, text = d['size'], d['x'], d['mono'], d['text']
        if size >= big: continue
        if size >= head_size:
            if cur is not None and prev_head_y is not None and 0 < y - prev_head_y < 28 and not cur['blocks'] and not para and not code:
                cur['title'] = clean(cur['title'] + ' ' + text)
            else:
                flush(); start(clean(text))
            prev_head_y = y; prev_y = y; continue
        if kind == 'line' and prev_y is not None and y - prev_y > 40: prev_head_y = None
        is_code = mono and size >= 8 and body_x + 6 <= x <= body_x + 16
        gap = None if prev_y is None else y - prev_y
        if is_code:
            if para: flush()
            if code is None: code = {'lines': []}
            elif gap and gap > 19.5 * 1.6: code['lines'].append('')
            if gap is not None and gap < 20 and prev_x1 >= code_max_x1.get(d['size'], 1e9) - d['size'] * 0.7 and code['lines'] and code['lines'][-1]:
                code['lines'][-1] += text.strip()
            else:
                code['lines'].append(text.rstrip())
            prev_x1 = d['x1']
            prev_y = y; continue
        if code: flush()
        kind_ = 'bullet' if x >= body_x + 14 else 'para'
        new = para is None or para['kind'] != kind_ or (gap is not None and gap > 19.5)
        if not new and gap is None:  # page continuation
            new = bool(re.search(r'[.:?!)]$', para['lines'][-1])) or not text.lstrip()[:1].islower()
        if new:
            flush(); para = {'kind': kind_, 'lines': [text], 'n': 1}
        else:
            para['lines'].append(text); para['n'] += 1
        prev_y = y
        # remember for subheading detection
    flush()
    # promote short unpunctuated single-line paragraphs followed by a bullet list/code to subheadings
    for s in sections:
        bl = s['blocks']
        for i, b in enumerate(bl):
            if b['type'] == 'paragraph' and len(b['text']) < 60 and not re.search(r'[.:?!,;]$', b['text']) and i + 1 < len(bl) and bl[i + 1]['type'] in ('bullets', 'code', 'table', 'paragraph'):
                b['type'] = 'subheading'
    return [s for s in sections if s['blocks']]

out = {}
for n in range(1, 16):
    out[n] = parse(f'public/notes/{n}.pdf')
json.dump(out, open('src/data/notes.generated.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
for n, s in out.items(): print(n, len(s), sum(len(x['blocks']) for x in s))
