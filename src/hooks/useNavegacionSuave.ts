import { useEffect } from 'react'

/**
 * Scroll suave al navegar por anclas internas (#rubros, #pedido, etc.),
 * implementado por JS en vez de `scroll-behavior: smooth` global para no
 * interferir con scrollTo programático (herramientas de test, lectores, etc.).
 * Respeta prefers-reduced-motion.
 */
export function useNavegacionSuave() {
  useEffect(() => {
    function alClickear(evento: MouseEvent) {
      const objetivo = (evento.target as HTMLElement)?.closest('a[href^="#"]')
      if (!objetivo) return
      const href = objetivo.getAttribute('href')
      if (!href || href === '#') return
      const destino = document.querySelector(href)
      if (!destino) return

      evento.preventDefault()
      const prefiereReducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      destino.scrollIntoView({
        behavior: prefiereReducido ? 'auto' : 'smooth',
        block: 'start',
      })
      history.pushState(null, '', href)
    }

    document.addEventListener('click', alClickear)
    return () => document.removeEventListener('click', alClickear)
  }, [])
}
