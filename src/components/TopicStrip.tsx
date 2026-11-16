import { useCallback, useEffect, useRef, useState } from 'react'
import { PixelIcon } from './PixelIcon'

// Single-line row of topic buttons. When they don't all fit, left/right arrows
// appear on either side (each disables at its end) to reveal the rest.

const ARROW =
  'flex size-10 shrink-0 cursor-pointer items-center justify-center border-[3px] border-line bg-surface text-ink shadow-brutal-sm transition-[translate,box-shadow,opacity] duration-150 hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-30'

// Index chips cycle through the app's accent colours, like the Roadmap badges
const CHIP_COLORS = ['bg-primary', 'bg-secondary', 'bg-accent'] as const

type Topic = { id: number; title: string }

type TopicStripProps = {
  topics: Topic[]
  selectedId: number
  onSelect: (id: number) => void
}

export function TopicStrip({ topics, selectedId, onSelect }: TopicStripProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [overflowing, setOverflowing] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const rafRef = useRef(0)
  const animRef = useRef(0)

  const update = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setOverflowing(el.scrollWidth > el.clientWidth + 2)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }, [])

  // Scroll events can fire many times per frame: do the work at most once per frame
  const scheduleUpdate = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0
      update()
    })
  }, [update])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', scheduleUpdate, { passive: true })
    const ro = new ResizeObserver(scheduleUpdate)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', scheduleUpdate)
      ro.disconnect()
      cancelAnimationFrame(rafRef.current)
      cancelAnimationFrame(animRef.current)
    }
  }, [update, scheduleUpdate])

  // Short eased glide that always lands on whole pixels (the pixel font
  // shimmers and blurs when it rests on fractional offsets)
  const glideTo = useCallback((target: number) => {
    const el = scrollerRef.current
    if (!el) return
    cancelAnimationFrame(animRef.current)
    const max = el.scrollWidth - el.clientWidth
    const to = Math.round(Math.min(max, Math.max(0, target)))
    const from = el.scrollLeft
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || from === to) {
      el.scrollLeft = to
      return
    }
    const duration = 220
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      el.scrollLeft = Math.round(from + (to - from) * eased)
      if (t < 1) animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
  }, [])

  // Bring the chosen topic into view only when the selection changes
  // (not on every scroll, which would fight the user's own scrolling)
  useEffect(() => {
    const sc = scrollerRef.current
    const node = sc?.querySelector<HTMLElement>('[data-selected]')
    if (!sc || !node) return
    const left = node.offsetLeft - sc.offsetLeft
    if (left < sc.scrollLeft || left + node.offsetWidth > sc.scrollLeft + sc.clientWidth) {
      glideTo(left - 8)
    }
  }, [selectedId, glideTo])

  // Step about half the visible width per click
  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollerRef.current
    if (el) glideTo(el.scrollLeft + dir * el.clientWidth * 0.5)
  }

  return (
    <div className="flex items-center gap-3">
      {overflowing && (
        <button
          type="button"
          aria-label="Show previous topics"
          title="Previous topics"
          disabled={atStart}
          onClick={() => scrollByDir(-1)}
          className={ARROW}
        >
          <PixelIcon name="left" className="size-3.5" />
        </button>
      )}

      <div
        ref={scrollerRef}
        role="tablist"
        aria-label="Topics"
        // py/-my + px/-mx leave room for the buttons' hard shadows and hover lift
        className="-mx-1 -my-2 flex min-w-0 flex-1 gap-3 overflow-x-auto overscroll-x-contain px-1 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {topics.map((topic, i) => {
          const selected = topic.id === selectedId
          return (
            <button
              key={topic.id}
              type="button"
              role="tab"
              aria-selected={selected}
              title={topic.title}
              data-selected={selected || undefined}
              onClick={() => onSelect(topic.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-2 border-[3px] border-line px-3 py-2.5 font-pixel text-[10px] leading-none whitespace-nowrap shadow-brutal-sm transition-[translate,box-shadow] duration-150 select-none hover:-translate-x-px hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:text-xs ${
                selected ? 'bg-primary text-on-bright' : 'bg-surface text-ink'
              }`}
            >
              <span
                className={`border-2 border-line px-1.5 py-1 text-on-bright ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
              >
                {String(topic.id).padStart(2, '0')}
              </span>
              <span className="font-body text-xs font-bold sm:text-sm">{topic.title}</span>
            </button>
          )
        })}
      </div>

      {overflowing && (
        <button
          type="button"
          aria-label="Show more topics"
          title="More topics"
          disabled={atEnd}
          onClick={() => scrollByDir(1)}
          className={ARROW}
        >
          <PixelIcon name="right" className="size-3.5" />
        </button>
      )}
    </div>
  )
}
