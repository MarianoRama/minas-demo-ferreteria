import { DIAS_LABEL } from '../config'
import { useDatos } from '../data/contexto'
import { useEstadoHorario } from '../hooks/useEstadoHorario'
import { IconoReloj, IconoUbicacion } from './Iconos'
import { Revelar } from './Revelar'

function textoRango(rangos: { desde: [number, number]; hasta: [number, number] }[]): string {
  if (!rangos || rangos.length === 0) return 'Cerrado'
  return rangos
    .map(
      (r) =>
        `${String(r.desde[0]).padStart(2, '0')}:${String(r.desde[1]).padStart(2, '0')} a ${String(
          r.hasta[0],
        ).padStart(2, '0')}:${String(r.hasta[1]).padStart(2, '0')}`,
    )
    .join(' y ')
}

export function HorariosUbicacion() {
  const { negocio } = useDatos()
  const estado = useEstadoHorario(negocio.horarios)

  return (
    <section id="horarios" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-display text-4xl uppercase text-graphite sm:text-5xl">
        Horarios y ubicación
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Revelar>
          <div className="relative border-2 border-graphite bg-kraft p-6 sm:p-8">
            <div className="absolute -top-3 right-6 -rotate-3 bg-graphite px-3 py-1 font-marcador text-lg text-safety">
              Pizarrón del local
            </div>
            <div className="flex items-center gap-2">
              <IconoReloj className="h-6 w-6 text-tool" />
              <h3 className="font-display text-xl uppercase tracking-wide text-graphite">
                Horario de atención
              </h3>
            </div>

            {estado && (
              <p
                className={`mt-3 inline-flex items-center gap-2 border-2 px-3 py-1.5 font-condensed text-sm font-bold uppercase tracking-wide ${
                  estado.abierto
                    ? 'border-ok bg-ok/10 text-ok'
                    : 'border-tool bg-tool/10 text-tool-deep'
                }`}
                role="status"
              >
                <span className={`h-2 w-2 rounded-full ${estado.abierto ? 'bg-ok' : 'bg-tool'}`} />
                {estado.abierto ? 'Abierto ahora' : 'Cerrado ahora'}: {estado.mensaje}
              </p>
            )}

            <dl className="mt-5 divide-y divide-graphite/15 font-mono text-sm">
              {DIAS_LABEL.map((label, dia) => (
                <div key={label} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-graphite-soft">{label}</dt>
                  <dd className="text-right font-semibold text-graphite">
                    {textoRango(negocio.horarios[dia] ?? [])}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-graphite-soft/70">
              * Horarios de ejemplo para esta demo. El estado "abierto/cerrado" se calcula en
              tiempo real con la hora de Uruguay.
            </p>
          </div>
        </Revelar>

        <Revelar retraso={90}>
          <div className="flex h-full flex-col border-2 border-graphite bg-kraft">
            <div className="flex items-center gap-2 p-6 pb-0 sm:p-8 sm:pb-0">
              <IconoUbicacion className="h-6 w-6 text-tool" />
              <h3 className="font-display text-xl uppercase tracking-wide text-graphite">
                Cómo llegar
              </h3>
            </div>
            <p className="px-6 pt-3 text-sm text-graphite-soft sm:px-8">
              {negocio.direccion}, {negocio.ciudad}. {negocio.referencia}. Estacionás en la
              puerta, no hace falta dar la vuelta a la manzana.
            </p>

            <div className="relative mt-4 min-h-[280px] flex-1 border-t-2 border-graphite bg-kraft-deep">
              <div className="absolute inset-0 grid place-items-center px-6 text-center">
                <div>
                  <IconoUbicacion className="mx-auto h-10 w-10 text-graphite-soft/40" />
                  <p className="mt-2 font-condensed text-sm uppercase tracking-wide text-graphite-soft/60">
                    Mapa de {negocio.ciudad}
                  </p>
                </div>
              </div>
              <iframe
                title={`Ubicación de ${negocio.nombre} en ${negocio.ciudad}`}
                src={`https://www.google.com/maps?q=${negocio.mapsQuery}&output=embed`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
