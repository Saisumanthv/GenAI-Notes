// Generated from the PDFs in public/notes (scripts/extract_notes.py -> notes.generated.json)
// plus the extended notes PDF (scripts/extract_extra.py -> extra.generated.json).
import generated from './notes.generated.json'
import extra from './extra.generated.json'

export type NoteBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'code'; text: string; language?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }

export type Note = {
  id: number
  topicId: number // matches a Roadmap topic id (1-15)
  title: string
  extended?: boolean // from the extended notes PDF
  blocks: NoteBlock[]
}

type Raw = {
  title: string
  extended?: boolean
  blocks: (NoteBlock | { type: 'subheading'; text: string })[]
}

const toBlocks = (blocks: Raw['blocks']): NoteBlock[] =>
  blocks.map((b) => (b.type === 'subheading' ? { type: 'heading' as const, text: b.text } : b))

const main = generated as unknown as Record<string, Raw[]>
const more = extra as unknown as Record<string, Raw[]>

let nextId = 1
export const NOTES: Note[] = Array.from({ length: 15 }, (_, i) => String(i + 1)).flatMap((topicId) =>
  [...(main[topicId] ?? []), ...(more[topicId] ?? [])].map((s) => ({
    id: nextId++,
    topicId: Number(topicId),
    title: s.title,
    extended: s.extended,
    blocks: toBlocks(s.blocks),
  })),
)
