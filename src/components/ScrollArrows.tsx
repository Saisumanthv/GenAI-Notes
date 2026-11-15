import { useEffect, useState } from 'react'
import { PixelIcon } from './PixelIcon'

// Small up/down arrows that replace the hidden native scrollbar.
// Each arrow disables itself when there's nowhere left to scroll in that direction.

const BTN =
  'flex size-8 cursor-pointer items-center justify-center border-[3px] border-line bg-surface text-ink shadow-brutal-sm transition-[translate,box-shadow,opacity] duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-30'

export function ScrollArrows() {
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      setAtTop(el.scrollTop <= 2)
      setAtBottom(el.scrollTop + window.innerHeight >= el.scrollHeight - 2)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    // Content height changes when topics expand/collapse
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [])

  // Nothing to scroll: hide entirely
  if (atTop && atBottom) return null

  const scrollPage = (dir: 1 | -1) =>
    window.scrollBy({ top: dir * window.innerHeight * 0.8, behavior: 'smooth' })

  return (
    <div className="fixed right-3 bottom-3 z-10 flex flex-col gap-2 sm:right-5 sm:bottom-5">
      <button
        type="button"
        aria-label="Scroll up"
        title="Scroll up"
        disabled={atTop}
        onClick={() => scrollPage(-1)}
        className={BTN}
      >
        <PixelIcon name="up" className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Scroll down"
        title="Scroll down"
        disabled={atBottom}
        onClick={() => scrollPage(1)}
        className={BTN}
      >
        <PixelIcon name="down" className="size-3.5" />
      </button>
    </div>
  )
}
