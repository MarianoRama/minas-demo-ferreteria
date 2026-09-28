import { useEffect, useState } from 'react'
import type { Rango } from '../config'
import { calcularEstadoHorario, type EstadoHorario } from '../utils/horario'

/** Estado abierto/cerrado, recalculado cada minuto y cuando cambian los horarios. */
export function useEstadoHorario(horarios: Record<number, Rango[]>): EstadoHorario {
  const [, latir] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => latir((n) => n + 1), 60_000)
    return () => window.clearInterval(id)
  }, [])

  // Se recalcula en cada render (es una función liviana): tanto por el
  // "latido" del reloj como por un cambio de horarios desde el panel.
  return calcularEstadoHorario(horarios)
}
