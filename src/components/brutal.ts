// Shared neo-brutalist button styles (used by <BrutalButton> and links styled as buttons).
// Hover lifts it; pressing pushes it flat into its shadow.

export type BrutalVariant = 'primary' | 'secondary' | 'accent' | 'surface'
export type BrutalSize = 'sm' | 'md'

const BASE =
  'inline-flex cursor-pointer items-center justify-center border-[3px] border-line font-pixel leading-none uppercase shadow-brutal transition-[translate,box-shadow] duration-150 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg active:translate-x-1 active:translate-y-1 active:shadow-none'

const VARIANTS: Record<BrutalVariant, string> = {
  primary: 'bg-primary text-on-bright',
  secondary: 'bg-secondary text-on-bright',
  accent: 'bg-accent text-on-bright',
  surface: 'bg-surface text-ink',
}

const SIZES: Record<BrutalSize, string> = {
  sm: 'gap-2 px-3 py-2.5 text-[10px] sm:text-xs',
  md: 'gap-3 px-6 py-4 text-xs sm:text-sm',
}

export function brutalClasses(variant: BrutalVariant = 'primary', size: BrutalSize = 'md') {
  return `${BASE} ${VARIANTS[variant]} ${SIZES[size]}`
}
