import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { brutalClasses } from '../components/brutal'
import { NoteCard } from '../components/NoteCard'
import { TopicStrip } from '../components/TopicStrip'
import { NOTES } from '../data/notes'
import { ROADMAP } from '../data/roadmap'

export function Notes() {
  const [topicId, setTopicId] = useState<number>(ROADMAP[0].id)

  const topic = ROADMAP.find((t) => t.id === topicId) ?? ROADMAP[0]
  const [open, setOpen] = useState<Set<number>>(() => new Set())
  const notes = NOTES.filter((n) => n.topicId === topic.id)
  const allOpen = notes.length > 0 && open.size === notes.length
  const toggle = (id: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(notes.map((n) => n.id)))
  const pdfUrl = `${import.meta.env.BASE_URL}notes/${topic.id}.pdf`

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[5] h-[66px] border-b-[3px] border-line bg-bg sm:h-[90px]"
      />

      <Link
        to="/"
        className={`fixed top-3 left-3 z-10 h-10 sm:top-5 sm:left-5 ${brutalClasses('accent', 'sm')}`}
      >
        <span aria-hidden="true">&lt;</span> Home
      </Link>

      <main className="w-full px-4 pt-24 pb-16 sm:px-8 sm:pt-32 lg:px-12 lg:pb-24">
        <motion.header
          className="mx-auto mb-8 max-w-5xl sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <h1 className="font-pixel text-[clamp(1.75rem,6vw,3.25rem)] leading-tight text-ink [text-shadow:3px_3px_0_var(--secondary)] sm:[text-shadow:5px_5px_0_var(--secondary)]">
            Notes
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Pick a topic to see its notes.
          </p>
          <a
            href="https://docs.google.com/document/d/1EY7Jz2lPWhYs6i9JnzOgfhsLHx9lwBylK3-Ga20ZEWo/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className={`mt-5 inline-flex h-10 items-center ${brutalClasses('accent', 'sm')}`}
          >
            Reference Docs
          </a>
        </motion.header>

        <TopicStrip
          topics={ROADMAP.map(({ id, title }) => ({ id, title }))}
          selectedId={topic.id}
          onSelect={(id) => {
            setTopicId(id)
            setOpen(new Set())
          }}
        />

        <section aria-live="polite" className="mx-auto mt-8 max-w-5xl sm:mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-base font-bold text-ink sm:text-xl">
              Topic {String(topic.id).padStart(2, '0')}: {topic.title}
            </h2>
            <div className="flex gap-3">
            <button
              type="button"
              onClick={toggleAll}
              className={`inline-flex h-10 cursor-pointer items-center ${brutalClasses('secondary', 'sm')}`}
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex h-10 items-center ${brutalClasses('surface', 'sm')}`}
            >
              Open Notes as PDF
            </a>
            </div>
          </div>

          <ol key={topic.id} className="flex flex-col gap-5 sm:gap-6">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                item={note}
                isOpen={open.has(note.id)}
                onToggle={() => toggle(note.id)}
              />
            ))}
          </ol>
        </section>
      </main>
    </>
  )
}
