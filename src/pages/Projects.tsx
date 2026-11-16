import { motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router'
import { brutalClasses } from '../components/brutal'
import { ProjectCard } from '../components/ProjectCard'
import { TopicStrip } from '../components/TopicStrip'
import { PROJECT_CATEGORIES } from '../data/projects'

export function Projects() {
  const [categoryId, setCategoryId] = useState<number>(PROJECT_CATEGORIES[0].id)
  const category = PROJECT_CATEGORIES.find((c) => c.id === categoryId) ?? PROJECT_CATEGORIES[0]

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
            Projects
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Pick a category to see its projects.
          </p>
        </motion.header>

        <TopicStrip
          topics={PROJECT_CATEGORIES.map(({ id, title }) => ({ id, title }))}
          selectedId={category.id}
          onSelect={setCategoryId}
        />

        <section aria-live="polite" className="mx-auto mt-8 max-w-5xl sm:mt-10">
          <h2 className="mb-6 text-base font-bold text-ink sm:text-xl">
            {category.title}{' '}
            <span className="text-muted">({category.projects.length})</span>
          </h2>

          <ol key={category.id} className="flex flex-col gap-5 sm:gap-6">
            {category.projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </ol>
        </section>
      </main>
    </>
  )
}
