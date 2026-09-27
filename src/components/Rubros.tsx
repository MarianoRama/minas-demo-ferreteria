import { ICONOS_RUBRO } from '../data/iconosRubro'
import { RUBROS } from '../data/rubros'
import { Revelar } from './Revelar'

type Props = {
  onSeleccionar: (rubroId: string) => void
}

export function Rubros({ onSeleccionar }: Props) {
  return (
    <section id="rubros" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-tool">
            Índice del local
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase text-graphite sm:text-5xl">
            Nuestros rubros
          </h2>
        </div>
        <p className="max-w-xs text-sm text-graphite-soft sm:text-right">
          Siete rincones del local, cada uno con su gente que sabe. Tocá un rubro para ver
          productos y sumarlos a tu pedido.
        </p>
      </div>

      <ul className="mt-10 border-t-2 border-graphite">
        {RUBROS.map((rubro, i) => {
          const Icono = ICONOS_RUBRO[rubro.id]
          return (
            <Revelar key={rubro.id} as="li" retraso={i * 60} className="border-b-2 border-graphite">
              <button
                type="button"
                onClick={() => onSeleccionar(rubro.id)}
                className="group enlace-flecha flex w-full flex-col gap-3 py-5 text-left transition-colors duration-300 hover:bg-graphite/[0.04] sm:flex-row sm:items-center sm:gap-6 sm:py-6"
              >
                <span className="font-mono text-sm text-graphite-soft/70 sm:w-10">
                  {rubro.numero}
                </span>
                <Icono className="h-9 w-9 shrink-0 text-tool transition-transform duration-300 group-hover:scale-110" />
                <span className="flex-1">
                  <span className="block font-display text-2xl uppercase tracking-wide text-graphite sm:text-3xl">
                    {rubro.nombre}
                  </span>
                  <span className="mt-1 block text-sm text-graphite-soft">{rubro.descripcion}</span>
                </span>
                <span className="hidden max-w-xs text-sm text-graphite-soft/80 md:block">
                  {rubro.detalle}
                </span>
                <span className="inline-flex items-center gap-1 font-condensed text-sm font-bold uppercase tracking-wide text-tool underline decoration-2 underline-offset-4 group-hover:text-tool-deep">
                  Ver productos
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </span>
              </button>
            </Revelar>
          )
        })}
      </ul>
    </section>
  )
}
