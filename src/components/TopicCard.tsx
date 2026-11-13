import { AnimatePresence, motion } from 'motion/react'
import type { RoadmapTopic } from '../data/roadmap'

const BADGE_COLORS = ['bg-primary', 'bg-secondary', 'bg-accent'] as const

function Label({ children, className = '' }: { children: string; className?: string }) {
  return (
    <h3
      className={`inline-block border-2 border-line px-2 py-1.5 font-pixel text-[9px] leading-none text-on-bright uppercase sm:text-[10px] ${className}`}
    >
      {children}
    </h3>
  )
}

type TopicCardProps = {
  item: RoadmapTopic
  colorIndex: number
  isOpen: boolean
  onToggle: () => void
}

export function TopicCard({ item, colorIndex, isOpen, onToggle }: TopicCardProps) {
  const panelId = `topic-${item.id}-panel`
  const badge = BADGE_COLORS[colorIndex % BADGE_COLORS.length]

  return (
    <motion.li
      className="scroll-mt-24 border-[3px] border-line bg-surface shadow-brutal sm:scroll-mt-28"
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
          <span
            className={`shrink-0 border-[3px] border-line px-2 py-2 font-pixel text-[10px] leading-none text-on-bright sm:text-xs ${badge}`}
          >
            Topic {String(item.id).padStart(2, '0')}
          </span>
          <span className="min-w-0 flex-1 text-sm font-bold text-ink sm:text-lg">
            {item.title}
          </span>
          {item.checkpoint && (
            <span className="hidden shrink-0 border-2 border-line bg-secondary px-2 py-1.5 font-pixel text-[9px] leading-none text-on-bright md:inline">
              Checkpoint
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
            <div className="grid gap-6 border-t-[3px] border-line p-4 sm:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-8">
              <section>
                <Label className="bg-primary">Concepts</Label>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {item.concepts.map((concept) => (
                    <li key={concept} className="flex gap-3 text-sm leading-relaxed text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] size-2 shrink-0 border border-line bg-secondary"
                      />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="flex flex-col gap-5">
                <section className="border-[3px] border-line bg-bg p-4 shadow-brutal-sm">
                  <Label className="bg-accent">Practice task</Label>
                  {item.checkpoint && (
                    <p className="mt-3 inline-block border-2 border-line bg-secondary px-2 py-1.5 font-pixel text-[9px] leading-relaxed text-on-bright sm:text-[10px]">
                      {item.checkpoint.label}
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-ink">{item.practice}</p>
                  {item.checkpoint && (
                    <div className="mt-4">
                      <p className="text-xs font-bold text-muted uppercase">Evaluates</p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {item.checkpoint.evaluates.map((skill) => (
                          <li
                            key={skill}
                            className="border-2 border-line bg-surface px-2 py-1 text-xs text-ink"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>

                <section className="border-[3px] border-line bg-bg p-4 shadow-brutal-sm">
                  <Label className="bg-secondary">Project to build</Label>
                  <p className="mt-3 text-base font-bold text-ink">{item.project.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {item.project.description}
                  </p>
                </section>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
