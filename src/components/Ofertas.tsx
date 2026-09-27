import { OFERTAS } from '../data/ofertas'
import { formatearPrecio } from '../data/productos'
import { Revelar } from './Revelar'

export function Ofertas() {
  return (
    <section id="ofertas" className="bg-graphite-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-4xl uppercase text-kraft sm:text-5xl">
            Ofertas de la semana
          </h2>
          <p className="font-condensed text-sm font-bold uppercase tracking-widest text-safety">
            Precios en pesos uruguayos
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFERTAS.map((oferta, i) => {
            const descuento = Math.round(100 - (oferta.precioAhora / oferta.precioAntes) * 100)
            return (
              <Revelar key={oferta.id} retraso={i * 70} as="article">
                <div className="tarjeta-viva relative flex h-full flex-col justify-between overflow-hidden border-2 border-safety bg-kraft p-5 pt-8">
                  <span className="absolute -left-10 top-4 w-40 -rotate-45 bg-tool py-1 text-center font-condensed text-xs font-bold uppercase tracking-widest text-kraft">
                    Oferta -{descuento}%
                  </span>
                  <div>
                    <p className="font-condensed text-xs font-bold uppercase tracking-widest text-graphite-soft">
                      {oferta.rubro}
                    </p>
                    <h3 className="mt-1 font-display text-xl uppercase leading-tight text-graphite">
                      {oferta.nombre}
                    </h3>
                  </div>
                  <div className="mt-6">
                    <p className="font-mono text-sm text-graphite-soft line-through">
                      {formatearPrecio(oferta.precioAntes)}
                    </p>
                    <p className="font-mono text-3xl font-bold text-tool-deep">
                      {formatearPrecio(oferta.precioAhora)}
                      <span className="ml-1 text-sm font-normal text-graphite-soft">
                        / {oferta.unidad}
                      </span>
                    </p>
                    <p className="mt-2 font-condensed text-xs uppercase tracking-wide text-graphite-soft">
                      {oferta.vigencia}
                    </p>
                  </div>
                </div>
              </Revelar>
            )
          })}
        </div>
      </div>
    </section>
  )
}
