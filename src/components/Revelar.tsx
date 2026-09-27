import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  children: ReactNode
  retraso?: number
  className?: string
  as?: 'div' | 'li' | 'article'
}

/** Envoltorio que aplica fade + slide corto cuando el elemento entra en pantalla. */
export function Revelar({ children, retraso = 0, className = '', as = 'div' }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>(retraso)
  const Etiqueta = as as 'div'

  return (
    <Etiqueta
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
    >
      {children}
    </Etiqueta>
  )
}
