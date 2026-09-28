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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Revelar>
          <div className="relative mx-auto max-w-xs -rotate-2 border-2 border-graphite bg-[#fff4b8] p-6 shadow-[5px_6px_0_rgba(43,41,36,0.18)] lg:mx-0">
            <span className="cinta-esquina -left-3 -top-3 -rotate-6" />
            <span className="cinta-esquina -right-3 -top-3 rotate-6" />
            <p className="font-marcador text-[1.7rem] leading-tight text-graphite">
              "La gente vuelve porque siempre le decimos la verdad de lo que necesita,
              aunque sea lo más barato del local."
            </p>
            <p className="mt-4 font-condensed text-sm font-bold uppercase tracking-wide text-graphite-soft">
              Así lo pensamos acá adentro
            </p>
          </div>
        </Revelar>

        <div>
          <h2 className="font-display text-3xl uppercase text-graphite sm:text-4xl">
            ¿Por qué elegirnos?
          </h2>
          <ul className="mt-6 divide-y-2 divide-graphite/15 border-y-2 border-graphite/15">
            {BENEFICIOS.map((beneficio, i) => {
              const Icono = ICONOS[beneficio.icono]
              return (
                <Revelar key={beneficio.id} as="li" retraso={i * 70}>
                  <div className="group flex items-start gap-4 py-4">
                    <Icono className="mt-0.5 h-7 w-7 shrink-0 text-tool transition-transform duration-300 group-hover:-rotate-6" />
                    <div>
                      <h3 className="font-display text-lg uppercase leading-tight text-graphite">
                        {beneficio.nombre}
                      </h3>
                      <p className="mt-0.5 text-sm text-graphite-soft">{beneficio.descripcion}</p>
                    </div>
                  </div>
                </Revelar>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
