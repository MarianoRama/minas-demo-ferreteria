import { useEffect, useRef, useState } from 'react'

function prefiereMovimientoReducido(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
  )
}

/**
 * Hook de aparición al hacer scroll (fade + slide corto), una sola vez.
 * Uso: const { ref, visible } = useReveal<HTMLDivElement>(delayMs)
 * Aplicar clases condicionales según `visible`. Respeta prefers-reduced-motion
 * mostrando el contenido de entrada, sin animar.
 */
export function useReveal<T extends HTMLElement>(delayMs = 0) {
  const ref = useRef<T | null>(null)
  // Si el usuario prefiere menos movimiento, o el navegador no soporta
  // IntersectionObserver, arrancamos visibles directamente (sin animar).
  const [visible, setVisible] = useState(
    () => prefiereMovimientoReducido() || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    if (visible) return
    const nodo = ref.current
    if (!nodo || typeof IntersectionObserver === 'undefined') return

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            window.setTimeout(() => setVisible(true), delayMs)
            observador.disconnect()
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )

    observador.observe(nodo)

    // Red de seguridad: si por algún motivo el observer nunca detecta la
    // intersección (navegador raro, scroll programático inusual, etc.), el
    // contenido no debe quedar oculto para siempre.
    const idRespaldo = window.setTimeout(() => setVisible(true), 4000)

    return () => {
      observador.disconnect()
      window.clearTimeout(idRespaldo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayMs])

  return { ref, visible }
}
