import { AnimatePresence, motion } from 'motion/react'
import type { Note, NoteBlock } from '../data/notes'

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className="inline-block self-start border-2 border-line bg-primary px-2 py-1.5 font-pixel text-[9px] leading-none text-on-bright uppercase sm:text-[10px]">
          {block.text}
        </h3>
      )
    case 'paragraph':
      return <p className="text-sm leading-relaxed text-ink">{block.text}</p>
    case 'bullets':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span
                aria-hidden="true"
                className="mt-[0.5em] size-2 shrink-0 border border-line bg-secondary"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <div className="overflow-x-auto border-[3px] border-line shadow-brutal-sm">
          <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-primary text-on-bright">
                {block.headers.map((h, i) => (
                  <th key={i} className="border-2 border-line px-3 py-2 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="bg-surface">
                  {row.map((c, i) => (
                    <td key={i} className="border-2 border-line px-3 py-2 align-top leading-relaxed text-ink">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'code':
      return (
        <pre className="overflow-x-auto border-[3px] border-line bg-[#1e1e2e] p-4 text-xs leading-relaxed text-[#e6e6ef] shadow-brutal-sm">
          <code>{block.text}</code>
        </pre>
      )
  }
}

type NoteCardProps = {
  item: Note
  isOpen: boolean
  onToggle: () => void
}

export function NoteCard({ item, isOpen, onToggle }: NoteCardProps) {
  const panelId = `note-${item.id}-panel`

  return (
    <motion.li
      className="scroll-mt-24 border-[3px] border-line border-x-[10px] bg-surface shadow-brutal sm:scroll-mt-28 sm:border-x-[14px] [&:nth-child(3n+1)]:border-x-primary [&:nth-child(3n+2)]:border-x-secondary [&:nth-child(3n)]:border-x-accent"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center gap-3 p-3 text-left sm:gap-4 sm:p-5"
        >
          <span className="min-w-0 flex-1 text-sm font-bold text-ink sm:text-lg">
            {item.title.replace(/^\d+\.\s*/, '')}
          </span>
          {item.extended && (
            <span className="hidden shrink-0 border-2 border-line bg-accent px-2 py-1 font-pixel text-[9px] leading-none text-on-bright uppercase sm:inline">
              Extended
            </span>
          )}
          <motion.span
            aria-hidden="true"
            className="shrink-0 font-pixel text-base text-ink sm:text-lg"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            +
          </motion.span>
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5 border-t-[3px] border-line p-4 sm:p-6">
              {item.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
