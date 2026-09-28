import { useDatos } from '../data/contexto'
import { IconoEmail, IconoInstagram, IconoTelefono, IconoUbicacion, IconoWhatsapp } from './Iconos'
import { Revelar } from './Revelar'

export function Contacto() {
  const { negocio } = useDatos()
  const mensaje = encodeURIComponent(`Hola! Te escribo desde la página de ${negocio.nombre}.`)

  return (
    <section id="contacto" className="bg-graphite py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-3xl uppercase text-kraft sm:text-4xl">Contacto</h2>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Revelar>
            <div className="relative h-full -rotate-1 border-2 border-kraft/60 bg-kraft p-6 text-graphite shadow-[6px_8px_0_rgba(0,0,0,0.35)] sm:p-7">
              <span className="cinta-esquina -left-3 -top-3 -rotate-6" />
              <p className="font-condensed text-xs font-bold uppercase tracking-widest text-graphite-soft">
                Ficha del local
              </p>
              <p className="mt-1 font-display text-xl uppercase text-graphite">{negocio.nombre}</p>

              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <IconoUbicacion className="mt-0.5 h-5 w-5 shrink-0 text-tool" />
                  <div>
                    <dt className="sr-only">Dirección</dt>
                    <dd>
                      {negocio.direccion}, {negocio.ciudad}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconoTelefono className="mt-0.5 h-5 w-5 shrink-0 text-tool" />
                  <div>
                    <dt className="sr-only">Teléfono</dt>
                    <dd>
                      <a href={`tel:+598${negocio.telefonoFijo.replace(/\s/g, '')}`} className="hover:text-tool">
                        {negocio.telefonoFijo}
                      </a>{' '}
                      (ejemplo)
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconoEmail className="mt-0.5 h-5 w-5 shrink-0 text-tool" />
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a href={`mailto:${negocio.email}`} className="break-all hover:text-tool">
                        {negocio.email}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconoInstagram className="mt-0.5 h-5 w-5 shrink-0 text-tool" />
                  <div>
                    <dt className="sr-only">Instagram</dt>
                    <dd>
                      <a
                        href={`https://instagram.com/${negocio.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-tool"
                      >
                        {negocio.instagram}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <p className="mt-5 border-t border-dashed border-graphite/25 pt-3 font-marcador text-lg text-tool-deep">
                Tocá timbre nomás, siempre hay alguien atendiendo.
              </p>
            </div>
          </Revelar>

          <Revelar retraso={80}>
            <a
              href={`https://wa.me/${negocio.whatsappNumero}?text=${mensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tarjeta-viva group flex h-full flex-col justify-between border-2 border-ok bg-ok/10 p-6 sm:p-8"
            >
              <div>
                <IconoWhatsapp className="h-10 w-10 text-ok" />
                <p className="mt-4 font-display text-2xl uppercase text-kraft sm:text-3xl">
                  Escribinos por WhatsApp
                </p>
                <p className="mt-2 max-w-sm text-sm text-kraft/70">
                  Es la vía más rápida para consultar precio, stock o coordinar un envío. Te
                  contesta alguien del local, no un contestador automático.
                </p>
              </div>
              <p className="enlace-flecha mt-6 inline-flex items-center gap-2 font-condensed text-base font-bold uppercase tracking-wide text-ok">
                {negocio.whatsappDisplay} (ejemplo)
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </p>
            </a>
          </Revelar>
        </div>
      </div>
    </section>
  )
}
