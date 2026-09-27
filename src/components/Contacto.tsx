import { NEGOCIO } from '../config'
import { IconoEmail, IconoInstagram, IconoTelefono, IconoUbicacion } from './Iconos'
import { Revelar } from './Revelar'

export function Contacto() {
  const tarjetas = [
    {
      icono: IconoEmail,
      titulo: 'Email',
      valor: NEGOCIO.email,
      href: `mailto:${NEGOCIO.email}`,
    },
    {
      icono: IconoTelefono,
      titulo: 'Teléfono',
      valor: NEGOCIO.telefonoFijo,
      href: `tel:+598${NEGOCIO.telefonoFijo.replace(/\s/g, '')}`,
    },
    {
      icono: IconoUbicacion,
      titulo: 'Dirección',
      valor: `${NEGOCIO.direccion}, ${NEGOCIO.ciudad}`,
      href: '#horarios',
      extra: 'Ver en el mapa',
    },
    {
      icono: IconoInstagram,
      titulo: 'Instagram',
      valor: NEGOCIO.instagram,
      href: `https://instagram.com/${NEGOCIO.instagram.replace('@', '')}`,
    },
  ]

  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-center font-condensed text-sm font-bold uppercase tracking-[0.3em] text-tool">
        Hablemos
      </p>
      <h2 className="mt-2 text-center font-display text-3xl uppercase text-graphite sm:text-4xl">
        Contacto
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tarjetas.map((tarjeta, i) => {
          const Icono = tarjeta.icono
          return (
            <Revelar key={tarjeta.titulo} retraso={i * 70}>
              <a
                href={tarjeta.href}
                target={tarjeta.href.startsWith('http') ? '_blank' : undefined}
                rel={tarjeta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="tarjeta-viva flex h-full flex-col items-center gap-2 border-2 border-graphite/20 bg-kraft p-6 text-center"
              >
                <Icono className="h-8 w-8 text-tool" />
                <p className="font-condensed text-sm font-bold uppercase tracking-widest text-graphite-soft">
                  {tarjeta.titulo}
                </p>
                <p className="text-sm text-graphite">{tarjeta.valor}</p>
                {tarjeta.extra && (
                  <span className="mt-1 font-condensed text-xs font-bold uppercase tracking-wide text-tool underline underline-offset-2">
                    {tarjeta.extra}
                  </span>
                )}
              </a>
            </Revelar>
          )
        })}
      </div>
    </section>
  )
}
