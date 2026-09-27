import { NEGOCIO } from '../config'
import { SERVICIOS } from '../data/servicios'
import { IconoCorte, IconoEnvio, IconoLlave, IconoPintura } from './Iconos'
import { Revelar } from './Revelar'

const ICONOS = {
  llave: IconoLlave,
  corte: IconoCorte,
  pintura: IconoPintura,
  envio: IconoEnvio,
}

export function Servicios() {
  return (
    <section id="servicios" className="bg-kraft-deep py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-tool">
          Más que venta de mostrador
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase text-graphite sm:text-5xl">
          Servicios del local
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden border-2 border-graphite bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map((servicio, i) => {
            const Icono = ICONOS[servicio.icono]
            return (
              <Revelar key={servicio.id} retraso={i * 70}>
                <div className="tarjeta-viva relative flex h-full flex-col bg-kraft-deep p-6">
                  <Icono className="h-10 w-10 text-tool transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-4 font-display text-lg uppercase leading-tight text-graphite">
                    {servicio.nombre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-graphite-soft">{servicio.descripcion}</p>
                  <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-wide text-tool-deep">
                    ⏱ {servicio.tiempo}
                  </p>
                </div>
              </Revelar>
            )
          })}
        </div>

        <p className="mt-6 max-w-2xl text-sm text-graphite-soft">
          Envíos a domicilio dentro de {NEGOCIO.ciudad.split(',')[0]}. Consultá costo y tiempos
          por WhatsApp según el barrio y el volumen del pedido.
        </p>
      </div>
    </section>
  )
}
