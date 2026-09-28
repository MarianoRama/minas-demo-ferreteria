import { useMemo, useRef, useState } from 'react'

/**
 * Paginado genérico para listas largas. Vuelve a la página 1 cuando cambia
 * la cantidad de ítems totales (por ejemplo, al cambiar un filtro o el
 * texto de búsqueda) y hace scroll suave al contenedor al cambiar de
 * página, respetando prefers-reduced-motion.
 */
export function usePaginacion<T>(items: T[], porPagina: number) {
  const [pagina, setPagina] = useState(1)
  const contenedorRef = useRef<HTMLDivElement | null>(null)
  const totalPaginas = Math.max(1, Math.ceil(items.length / porPagina))

  // Ajuste durante el render (patrón recomendado por React en vez de un
  // efecto): si cambió la cantidad total de ítems (filtro o búsqueda
  // nuevos), volvemos a la página 1 antes de pintar.
  const [longitudPrevia, setLongitudPrevia] = useState(items.length)
  if (longitudPrevia !== items.length) {
    setLongitudPrevia(items.length)
    if (pagina !== 1) setPagina(1)
  }

  const paginaSegura = Math.min(pagina, totalPaginas)

  const itemsPagina = useMemo(() => {
    const inicio = (paginaSegura - 1) * porPagina
    return items.slice(inicio, inicio + porPagina)
  }, [items, paginaSegura, porPagina])

  function irAPagina(nueva: number) {
    setPagina(nueva)
    const prefiereReducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    contenedorRef.current?.scrollIntoView({
      behavior: prefiereReducido ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const desde = items.length === 0 ? 0 : (paginaSegura - 1) * porPagina + 1
  const hasta = Math.min(items.length, paginaSegura * porPagina)

  return {
    contenedorRef,
    pagina: paginaSegura,
    totalPaginas,
    itemsPagina,
    irAPagina,
    resumen: `Mostrando ${desde}–${hasta} de ${items.length}`,
  }
}
