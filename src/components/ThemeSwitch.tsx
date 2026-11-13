import { AnimatePresence, motion } from 'motion/react'
import { useTheme } from '../hooks/useTheme'
import { PixelIcon } from './PixelIcon'

// Track: 84px wide with a 3px border -> 78px inside. Thumb: 28px, inset 3px.
// Thumb travel = 78 - 28 - 3 * 2 = 44px.
const THUMB_TRAVEL = 44

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      className="group fixed top-3 right-3 z-10 cursor-pointer sm:top-5 sm:right-5"
    >
      <span className="relative flex h-10 w-[84px] items-center justify-between border-[3px] border-line bg-track px-[7px] text-ink shadow-brutal transition-[background-color,box-shadow,translate] duration-150 group-hover:-translate-x-px group-hover:-translate-y-px group-active:translate-x-[3px] group-active:translate-y-[3px] group-active:shadow-none">
        {/* Track icons: sun on the left (light), moon on the right (dark) */}
        <PixelIcon name="sun" className="size-4 opacity-60" />
        <PixelIcon name="moon" className="size-4 opacity-60" />

        {/* Thumb */}
        <motion.span
          className="absolute top-[3px] left-[3px] flex size-7 items-center justify-center border-[3px] border-line bg-surface"
          initial={false}
          animate={{ x: isDark ? THUMB_TRAVEL : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              className="flex"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              <PixelIcon
                name={isDark ? 'moon' : 'sun'}
                className={`size-4 ${isDark ? 'text-primary' : 'text-ink'}`}
              />
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </span>
    </button>
  )
}
