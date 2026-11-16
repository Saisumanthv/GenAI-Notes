"""Extract 'Reading the response object.pdf' (extended notes) into src/data/extra.generated.json.
Run: python scripts/extract_extra.py   (needs pymupdf; takes a few minutes because of table detection)"""
import json, re, sys, pymupdf as fitz

SRC = 'Reading the response object.pdf'
# (topic, card title, start page, regex matched against the line text, or None = top of page). Keep in page order.
SEGMENTS = [
    (3, 'Reading the response object', 0, None),
    (4, 'Validating and repairing model output', 1, None),
    (4, 'Handling multiple tool calls', 3, None),
    (4, 'Function and tool calling: how the model requests a call', 6, None),
    (9, 'Prompt design for grounding answers in retrieved context', 10, r'^- Prompt design'),
    (9, 'Metadata filtering before retrieval', 11, r'^Metadata filtering'),
    (9, 'Failure modes: reranking retrieved chunks', 13, r'^Failure Modes'),
    (9, 'RAG vs fine-tuning: when each is appropriate', 16, r'^Notion Doc'),
    (7, 'Why orchestration frameworks exist', 21, r'^- Why orchestration'),
    (7, 'When raw API calls are the better choice', 21, r'^- When raw API'),
    (7, 'Overview of LangChain, LlamaIndex, and Haystack', 21, r'^- Overview of LangChain'),
    (7, 'LangChain installation and setup', 22, r'^- LangChain installation'),
    (7, 'Core components: model wrappers, prompt templates, chains', 23, r'^- Core components'),
    (7, 'LCEL and composing steps with the pipe operator', 24, r'^- LCEL'),
    (7, 'Output parsers for structured results', 24, r'^- Output parsers'),
    (7, 'Memory: conversation buffer and windowed memory', 28, r'^- Memory'),
    (11, 'Text-to-image models and how they differ from LLMs', 33, r'^The core difference'),
    (11, 'Prompt techniques for image generation', 35, r'^- Prompt techniques'),
    (11, 'Negative prompts and parameters', 37, r'^Negative Prompts'),
    (11, 'Calling an image generation API', 39, r'^Calling an Image'),
    (11, 'Image sizes, formats, and costs', 41, r'^- Image sizes'),
    (11, 'Text-to-speech APIs and voice selection', 42, r'^1\. How a TTS call works'),
    (11, 'Combining LLM text generation with TTS', 47, r'^Write for the ear'),
    (11, 'Practical use cases and limitations', 51, r'^1\. Practical use cases'),
    (10, 'The agent loop, built by hand', 57, r'^Agents:'),
    (10, 'Workflows vs agents', 59, r'^Workflows vs agents'),
    (10, 'The ReAct pattern: reasoning and acting in a loop', 60, r'^- The ReAct'),
    (10, 'Giving an agent tools and writing tool descriptions', 63, r'^- Giving an agent'),
    (10, 'The agent loop: think, act, observe, repeat', 64, r'^- The agent loop'),
    (10, 'Stopping conditions and iteration limits', 66, r'^- Stopping conditions'),
    (10, 'ReAct vs plan-and-execute', 71, r'^ReAct vs plan-and-execute'),
    (10, 'Reading and debugging agent traces', 75, r'^What a trace is'),
    (10, 'Failure modes: loops, wrong tool choice, ignoring results', 80, r'^Failure modes: loops'),
    (10, 'Agent cost: why it grows and how to reduce it', 86, r'^Where the cost comes from'),
    (10, 'Multi-agent systems', 92, r'^The core idea'),
    (12, 'How LLM evaluation differs from normal testing', 98, r'^Why this is different'),
    (12, 'Why manual spot-checking does not scale', 103, r'^What spot-checking looks like'),
    (12, 'Building an evaluation dataset of inputs and expected behaviour', 105, r'^- Building an evaluation dataset'),
    (12, 'Deterministic checks: format, schema, required fields, keywords', 110, r'^- Deterministic checks'),
    (12, 'LLM-as-judge: using a model to score outputs', 117, r'^What it is'),
    (12, 'Writing a scoring rubric', 126, r'^- Writing a scoring rubric'),
    (12, 'Measuring RAG separately: retrieval quality vs answer quality', 132, r'^- Measuring RAG'),
    (12, 'Regression testing when you change a prompt', 141, r'^- Regression testing'),
    (12, 'Tracing and logging every request and response', 147, r'^- Tracing and logging'),
    (12, 'Latency and reliability as part of quality', 156, r'^- Latency and reliability'),
    (13, 'How token-based pricing works: input vs output', 165, r'^How Token-Based Pricing'),
    (13, 'Estimating and measuring cost per request', 169, r'^- Estimating and measuring'),
    (13, 'Counting tokens before sending', 170, r'^- Counting tokens'),
    (13, 'Rate limits, quotas, and queuing', 174, r'^What rate limits and quotas'),
    (13, 'Caching repeated requests', 178, r'^- Caching repeated'),
]
DROP = re.compile(r'^(None|- (Choosing a cheaper model|Reducing prompt size|Prompt injection|Not leaking API keys|Handling and logging failures|Rate limits, quotas)\b.*)$')
BULLET = re.compile(r'^([●○■▪•◦])\s*(.*)$')
NUMBER = re.compile(r'^(\d{1,2}[.)])\s+(.*)$')
ZW = re.compile('[​‎‏﻿]')


def clean(t):
    t = ZW.sub('', t)
    return re.sub(r'\s+', ' ', t).strip()


def cell_text(page, bbox):
    words = page.get_text('words')
    words = [w for w in words if bbox[0] - 2 <= (w[0] + w[2]) / 2 <= bbox[2] + 2 and bbox[1] - 2 <= (w[1] + w[3]) / 2 <= bbox[3] + 2]
    words.sort(key=lambda w: (round(w[3] / 4), w[0]))
    return clean(' '.join(ZW.sub('', w[4]) for w in words))


def page_items(pno, page):
    items = []
    tables = []
    try:
        tables = page.find_tables().tables
    except Exception:
        pass
    keep = []
    for t in tables:
        rows = [[cell_text(page, c) if c else '' for c in r.cells] for r in t.rows]
        rows = [r for r in rows if any(r)]
        if len(rows) >= 2 and max(len(r) for r in rows) >= 2:
            keep.append(fitz.Rect(t.bbox))
            items.append(dict(page=pno, y=t.bbox[1], kind='table', headers=rows[0], rows=rows[1:]))
    for b in page.get_text('dict')['blocks']:
        for l in b.get('lines', []):
            bb = fitz.Rect(l['bbox'])
            if any((bb & r).get_area() > 0.4 * bb.get_area() for r in keep if bb.intersects(r)):
                continue
            spans = l['spans']
            text = ZW.sub('', ''.join(s['text'] for s in spans))
            nonblank = [s for s in spans if ZW.sub('', s['text']).strip()]
            if not nonblank:
                items.append(dict(page=pno, y=bb.y0, kind='blank'))
                continue
            mono_chars = sum(len(s['text'].strip()) for s in nonblank if 'Consolas' in s['font'] or 'Mono' in s['font'])
            code = mono_chars >= 0.7 * sum(len(s['text'].strip()) for s in nonblank)
            bold = all('Bold' in s['font'] for s in nonblank)
            items.append(dict(page=pno, y=bb.y0, kind='line', text=text, code=code, bold=bold,
                              size=round(nonblank[0]['size'], 1), x=bb.x0, x1=bb.x1))
    items.sort(key=lambda i: (i['y'], i.get('x', 0)))
    return items


PLAIN_MAX_PAGE = 15  # pages 0-15 are unformatted text: code is only recognisable by its shape
SEP = re.compile(r'^\s*-{2,}\s*$')
CODEY = re.compile(
    r'^\s*(def |class |import |from \S+ import |try:|except\b|finally:|else:|elif .*:|if .*:|for .*:|while .*:|with .*:|return\b|raise |assert |print\(|@\w+|#|[\]\)\}\{]|\.\.\.'
    r'|[A-Za-z_][\w\.\[\]"\']*\s*=\s*\S|\w+=\S.*|"[^"]+"\s*:|\'[^\']+\'\s*:|[\w\.]+\(.*\)\s*,?\s*$|\w[\w\.]*\(\s*$)'
)
SECRET = re.compile(r'(lsv2_pt_[A-Za-z0-9_]+|sk-[A-Za-z0-9_\-]{20,}|AIza[0-9A-Za-z_\-]{30,})')


def redact(t):
    return SECRET.sub(lambda m: m.group(0)[:6] + 'xxxxxxxxxxxx', t)


def build_plain(items):
    lines = []  # dicts: kind in blank|sep|code|text|num
    in_fence = False
    last_code = False
    for it in items:
        if it['kind'] == 'table':
            continue
        if it['kind'] == 'blank':
            lines.append({'kind': 'blank'})
            continue
        raw = it['text'].rstrip()
        st = raw.strip()
        if not st:
            lines.append({'kind': 'blank'})
            continue
        if '```' in st:
            in_fence = not in_fence
            raw = raw.replace('```', '').rstrip()
            if raw.strip():
                lines.append({'kind': 'code', 'raw': raw.strip() if in_fence else raw, 'x1': it['x1']})
            last_code = True
            continue
        if in_fence:
            lines.append({'kind': 'code', 'raw': raw, 'x1': it['x1']})
            last_code = True
            continue
        if SEP.match(st) or re.match(r'^-{5,}', st):
            lines.append({'kind': 'sep'})
            continue
        indent = len(raw) - len(raw.lstrip(' '))
        if CODEY.match(raw) or (last_code and indent >= 2):
            lines.append({'kind': 'code', 'raw': raw, 'x1': it['x1']})
            last_code = True
        elif NUMBER.match(st):
            lines.append({'kind': 'num', 'raw': st, 'x1': it['x1']})
            last_code = False
        else:
            lines.append({'kind': 'text', 'raw': st, 'x1': it['x1']})
            last_code = False

    n = len(lines)
    blocks = []
    i = 0

    def next_nonblank(j):
        while j < n and lines[j]['kind'] == 'blank':
            j += 1
        return j

    while i < n:
        ln = lines[i]
        k = ln['kind']
        if k in ('blank', 'sep'):
            i += 1
            continue
        if k == 'code':
            buf = []
            while i < n:
                kk = lines[i]['kind']
                if kk == 'code':
                    buf.append(lines[i]['raw'])
                    i += 1
                elif kk == 'blank':
                    j = next_nonblank(i)
                    if j < n and lines[j]['kind'] == 'code':
                        buf.append('')
                        i += 1
                    else:
                        break
                else:
                    break
            while buf and not buf[-1].strip():
                buf.pop()
            ind = min((len(b) - len(b.lstrip(' ')) for b in buf if b.strip()), default=0)
            blocks.append({'type': 'code', 'text': '\n'.join(b[ind:] for b in buf)})
            continue
        if k == 'num':
            items_ = []
            while i < n and lines[i]['kind'] in ('num', 'blank'):
                if lines[i]['kind'] == 'num':
                    items_.append(lines[i]['raw'])
                    i += 1
                    while i < n and lines[i]['kind'] == 'text' and lines[i - 1].get('x1', 0) >= 518:
                        items_[-1] += ' ' + lines[i]['raw']
                        i += 1
                else:
                    j = next_nonblank(i)
                    if j < n and lines[j]['kind'] == 'num':
                        i += 1
                    else:
                        break
            blocks.append({'type': 'bullets', 'items': items_})
            continue
        prev_sep = i > 0 and lines[i - 1]['kind'] == 'sep'
        text = ln['raw']
        while i + 1 < n and lines[i + 1]['kind'] == 'text' and lines[i].get('x1', 0) >= 518:
            i += 1
            text += ' ' + lines[i]['raw']
        next_sep = i + 1 < n and lines[i + 1]['kind'] == 'sep'
        nn = next_nonblank(i + 1)
        before_code = nn < n and lines[nn]['kind'] == 'code'
        if len(text) < 100 and (prev_sep or next_sep or (text.endswith(':') and before_code)):
            blocks.append({'type': 'heading', 'text': text.rstrip(':').strip()})
        else:
            blocks.append({'type': 'paragraph', 'text': text})
        i += 1
    return blocks


def build(items):
    if items and items[0]['page'] <= PLAIN_MAX_PAGE and any(i['kind'] == 'line' and not i['code'] for i in items):
        return build_plain(items)
    return build_formatted(items)


def build_formatted(items):
    blocks = []
    state = {'code': None, 'para': None}
    prev = None

    def flush():
        code, para = state['code'], state['para']
        if code is not None:
            while code and not code[-1].strip():
                code.pop()
            if code:
                blocks.append({'type': 'code', 'text': '\n'.join(code)})
        if para is not None:
            t = clean(para['text'])
            if t:
                if para['kind'] == 'bullet':
                    if blocks and blocks[-1]['type'] == 'bullets':
                        blocks[-1]['items'].append(t)
                    else:
                        blocks.append({'type': 'bullets', 'items': [t]})
                else:
                    blocks.append({'type': 'paragraph', 'text': t})
        state['code'] = state['para'] = None

    for it in items:
        if it['kind'] == 'table':
            flush()
            blocks.append({'type': 'table', 'headers': it['headers'], 'rows': it['rows']})
            prev = None
            continue
        if it['kind'] == 'blank':
            if state['code'] is not None:
                state['code'].append('')
            elif state['para'] is not None:
                flush()
            prev = None
            continue
        text, size = it['text'], it['size']
        stripped = clean(text)
        if not stripped or DROP.match(stripped):
            continue
        gap = None if prev is None or prev['page'] != it['page'] else it['y'] - prev['y']
        if it['code'] or (text.startswith('    ') and CODEY.match(text)) or re.match(r'^\s*(print\(|def \w+\(|class \w+|import \w+|return)', text):
            if state['para'] is not None:
                flush()
            if state['code'] is None:
                state['code'] = []
            code = state['code']
            if code and gap is not None and gap < 17.5 and prev and prev['x1'] >= 522 and code[-1]:
                code[-1] += text.rstrip()
            else:
                code.append(text.rstrip())
            prev = it
            continue
        if state['code'] is not None:
            flush()
        if it['bold'] and (size >= 13 or (len(stripped) < 80 and not stripped.endswith('.') and it['x'] < 80)):
            flush()
            blocks.append({'type': 'heading', 'text': stripped.rstrip(':')})
            prev = None
            continue
        mb = BULLET.match(stripped)
        mn = NUMBER.match(stripped) if it['x'] < 120 else None
        if mb or mn:
            flush()
            state['para'] = {'kind': 'bullet', 'text': mb.group(2) if mb else mn.group(1) + ' ' + mn.group(2)}
        elif state['para'] is not None and gap is not None and gap < 19:
            state['para']['text'] += ' ' + stripped
        else:
            flush()
            state['para'] = {'kind': 'para', 'text': stripped}
        prev = it
    flush()
    return blocks


def redact_blocks(blocks):
    for b in blocks:
        if 'text' in b:
            b['text'] = redact(b['text'])
        if 'items' in b:
            b['items'] = [redact(x) for x in b['items']]
        if 'rows' in b:
            b['rows'] = [[redact(c) for c in r] for r in b['rows']]
    return blocks


def main():
    doc = fitz.open(SRC)
    import os, tempfile
    cache = os.path.join(tempfile.gettempdir(), 'extra_items_cache.json')  # table detection is slow; reuse it
    if os.path.exists(cache) and '--fresh' not in sys.argv:
        items = json.load(open(cache, encoding='utf8'))
    else:
        items = []
        for i, p in enumerate(doc):
            items += page_items(i, p)
            print('page', i, flush=True)
        json.dump(items, open(cache, 'w', encoding='utf8'))
    starts = []
    pos = 0
    for topic, title, page, rx in SEGMENTS:
        found = None
        for idx in range(pos, len(items)):
            it = items[idx]
            if it['page'] < page - 1:
                continue
            if it['page'] > page + 1:
                break
            if rx is None:
                if it['page'] == page:
                    found = idx
                    break
            elif it['kind'] == 'line' and re.search(rx, clean(it['text'])):
                found = idx
                break
        if found is None:
            print('WARN marker not found:', title, file=sys.stderr)
            continue
        starts.append((found, topic, title, rx))
        pos = found
    out = {}
    for n, (idx, topic, title, rx) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(items)
        seg = items[idx:end]
        if rx is not None:  # the card title replaces the marker line
            seg = seg[1:]
        elif seg and seg[0]['kind'] == 'line' and clean(seg[0]['text']).lower().startswith(title.lower()[:18]):
            seg = seg[1:]
        blocks = redact_blocks(build(seg))
        if blocks:
            out.setdefault(str(topic), []).append({'title': title, 'extended': True, 'blocks': blocks})
    json.dump(out, open('src/data/extra.generated.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    for t, s in sorted(out.items(), key=lambda x: int(x[0])):
        print(t, len(s), sum(len(x['blocks']) for x in s))


main()
