import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import { BrutalButton } from '../components/BrutalButton'

const NAV_ITEMS = [
  { label: 'Roadmap', variant: 'primary', to: '/roadmap' },
  { label: 'Notes', variant: 'secondary', to: null }, // page not built yet
] as const

export function Home() {
  const navigate = useNavigate()

  return (
    // Content is centred vertically; extra bottom padding lifts it slightly above
    // the exact middle (optical centre). Top padding keeps clear of the switch.
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pt-20 pb-[max(5rem,12svh)] sm:px-8 lg:px-12">
      <motion.h1
        className="relative font-pixel text-[clamp(2.25rem,9vw,5rem)] leading-none text-ink [text-shadow:4px_4px_0_var(--secondary)] sm:[text-shadow:6px_6px_0_var(--secondary)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        GenAI
        <motion.span
          aria-hidden="true"
          className="absolute bottom-0 left-full ml-[0.15em] text-accent [text-shadow:none]"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        >
          _
        </motion.span>
      </motion.h1>

      <nav
        aria-label="Main"
        className="mt-10 flex w-full max-w-xs flex-col gap-5 sm:mt-14 sm:w-auto sm:max-w-none sm:flex-row sm:gap-8 lg:mt-16"
      >
        {NAV_ITEMS.map((item, i) => (
          <BrutalButton
            key={item.label}
            variant={item.variant}
            className="w-full sm:w-44"
            onClick={item.to ? () => navigate(item.to) : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.25 + i * 0.1 }}
          >
            {item.label}
          </BrutalButton>
        ))}
      </nav>
    </main>
  )
}
