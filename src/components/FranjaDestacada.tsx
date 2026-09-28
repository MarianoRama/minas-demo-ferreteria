import { useDatos } from '../data/contexto'

/** Franja sólida y corta, tipo cartel de local, entre el hero y los rubros. */
export function FranjaDestacada() {
  const { negocio } = useDatos()
  return (
    <div className="border-y-2 border-graphite bg-safety py-3">
      <p className="mx-auto max-w-6xl px-4 text-center font-condensed text-sm font-bold uppercase tracking-[0.25em] text-graphite sm:text-base sm:px-6">
        {negocio.avisoHome}
      </p>
    </div>
  )
}
