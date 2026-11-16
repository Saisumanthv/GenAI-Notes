import { motion } from 'motion/react'
import type { Project } from '../data/projects'

const SIDE_COLORS = [
  'border-x-primary',
  'border-x-secondary',
  'border-x-accent',
] as const

type ProjectCardProps = {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.li
      className={`border-[3px] border-line border-x-[10px] bg-surface shadow-brutal sm:border-x-[14px] ${SIDE_COLORS[index % SIDE_COLORS.length]}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <h3 className="text-base font-bold text-ink sm:text-lg">
          <span className="mr-2 text-muted">{String(index + 1).padStart(2, '0')}</span>
          {project.title}
        </h3>

        {project.stack.length > 0 && (
          <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="border-2 border-line bg-bg px-2 py-1 text-xs leading-none text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <ul className="flex flex-col gap-2.5">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-relaxed text-ink">
              <span
                aria-hidden="true"
                className="mt-[0.5em] size-2 shrink-0 border border-line bg-secondary"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  )
}
