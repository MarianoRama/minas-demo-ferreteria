import { BENEFICIOS } from '../data/beneficios'
import { IconoAsesoramiento, IconoConfianza, IconoMarcasTop, IconoRapidez } from './Iconos'
import { Revelar } from './Revelar'

const ICONOS = {
  confianza: IconoConfianza,
  rapidez: IconoRapidez,
  asesoramiento: IconoAsesoramiento,
  marcas: IconoMarcasTop,
}

export function PorQueElegirnos() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-tool">
        Lo que nos distingue
      </p>
      <h2 className="mt-2 font-display text-3xl uppercase text-graphite sm:text-4xl">
        ¿Por qué elegirnos?
      </h2>

      <div className="mt-10 grid grid-cols-1 divide-y-2 divide-graphite/15 border-y-2 border-graphite/15 sm:grid-cols-2 sm:divide-y-0 sm:divide-x-2 lg:grid-cols-4">
        {BENEFICIOS.map((beneficio, i) => {
          const Icono = ICONOS[beneficio.icono]
          return (
            <Revelar key={beneficio.id} retraso={i * 70}>
              <div className="group flex h-full flex-col gap-3 py-6 pr-4 sm:px-6">
                <Icono className="h-9 w-9 text-tool transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display text-lg uppercase leading-tight text-graphite">
                  {beneficio.nombre}
                </h3>
                <p className="text-sm text-graphite-soft">{beneficio.descripcion}</p>
              </div>
            </Revelar>
          )
        })}
      </div>
    </section>
  )
}
