import { motion, type HTMLMotionProps } from 'motion/react'
import { brutalClasses, type BrutalSize, type BrutalVariant } from './brutal'

type BrutalButtonProps = HTMLMotionProps<'button'> & {
  variant?: BrutalVariant
  size?: BrutalSize
}

// Neo-brutalist button: thick border + hard offset shadow.
export function BrutalButton({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  children,
  ...props
}: BrutalButtonProps) {
  return (
    <motion.button type={type} className={`${brutalClasses(variant, size)} ${className}`} {...props}>
      {children}
    </motion.button>
  )
}
