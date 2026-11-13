import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { BrutalButton } from '../components/BrutalButton'
import { brutalClasses } from '../components/brutal'
import { TopicCard } from '../components/TopicCard'
import { ROADMAP } from '../data/roadmap'

export function Roadmap() {
  const [open, setOpen] = useState<Set<number>>(() => new Set([1]))
  const allOpen = open.size === ROADMAP.length

  const toggle = (id: number) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(ROADMAP.map((t) => t.id)))

  return (
    <>
      {/* Solid top bar so scrolling content passes beneath the fixed Home link + theme switch */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[5] h-[66px] border-b-[3px] border-line bg-bg sm:h-[90px]"
      />

      {/* Mirrors the theme switch in the opposite corner */}
      <Link
        to="/"
        className={`fixed top-3 left-3 z-10 h-10 sm:top-5 sm:left-5 ${brutalClasses('accent', 'sm')}`}
      >
        <span aria-hidden="true">&lt;</span> Home
      </Link>

      <main className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:px-8 sm:pt-32 lg:pb-24">
        <motion.header
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <h1 className="font-pixel text-[clamp(1.75rem,6vw,3.25rem)] leading-tight text-ink [text-shadow:3px_3px_0_var(--primary)] sm:[text-shadow:5px_5px_0_var(--primary)]">
            Roadmap
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {ROADMAP.length} topics from LLM fundamentals to a deployed GenAI app. Each topic covers a
            set of concepts, a practice task, and a project to build.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <BrutalButton
              variant="surface"
              size="sm"
              onClick={toggleAll}
              aria-label={allOpen ? 'Collapse all topics' : 'Expand all topics'}
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </BrutalButton>
          </div>
        </motion.header>

        <ol className="flex flex-col gap-5 sm:gap-6">
          {ROADMAP.map((topic, i) => (
            <TopicCard
              key={topic.id}
              item={topic}
              colorIndex={i}
              isOpen={open.has(topic.id)}
              onToggle={() => toggle(topic.id)}
            />
          ))}
        </ol>
      </main>
    </>
  )
}
