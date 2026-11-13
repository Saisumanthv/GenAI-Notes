// Tiny pixel-art icons drawn from a character grid ('#' = filled pixel)
const ICONS = {
  sun: [
    '....#....',
    '.#.....#.',
    '...###...',
    '..#####..',
    '#.#####.#',
    '..#####..',
    '...###...',
    '.#.....#.',
    '....#....',
  ],
  moon: [
    '...####..',
    '..###....',
    '.###.....',
    '.###.....',
    '.###.....',
    '.###.....',
    '..###....',
    '...####..',
    '.........',
  ],
} as const

export type PixelIconName = keyof typeof ICONS

export function PixelIcon({ name, className }: { name: PixelIconName; className?: string }) {
  const grid = ICONS[name]
  return (
    <svg
      viewBox={`0 0 ${grid[0].length} ${grid.length}`}
      className={className}
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
    >
      {grid.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null,
        ),
      )}
    </svg>
  )
}
