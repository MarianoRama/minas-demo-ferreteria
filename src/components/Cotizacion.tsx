import { type FormEvent, useState } from 'react'
import { useDatos } from '../data/contexto'
import { construirMensajeCotizacion } from '../utils/cotizacion'
import {
  IconoAdjuntar,
  IconoAsunto,
  IconoEmail,
  IconoEmpresa,
  IconoMensaje,
  IconoPersona,
  IconoTelefono,
} from './Iconos'
import { Revelar } from './Revelar'

const inputClase =
  'mt-1 w-full min-h-[44px] border-2 border-graphite-soft/30 bg-kraft px-3 py-2 text-sm text-graphite outline-none transition focus:border-tool'

export function Cotizacion() {
  const { negocio } = useDatos()
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [nombreArchivo, setNombreArchivo] = useState('')
  const [enviado, setEnviado] = useState(false)

  function alEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    const texto = construirMensajeCotizacion(
      {
        nombre,
        telefono,
        email,
        empresa,
        asunto,
        mensaje,
        nombreArchivo,
      },
      negocio.nombre,
    )
    window.open(`https://wa.me/${negocio.whatsappNumero}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener,noreferrer')
    setEnviado(true)
  }

  return (
    <section className="textura-diagonal bg-kraft-deep py-16 sm:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl uppercase text-graphite sm:text-4xl">
            Solicitá tu cotización
          </h2>
          <p className="mt-3 text-sm text-graphite-soft">
            Completá el formulario y te la mandamos por WhatsApp con precio y disponibilidad.
          </p>
        </div>

        <Revelar retraso={80}>
          <form
            onSubmit={alEnviar}
            className="mt-8 border-2 border-graphite bg-kraft p-6 shadow-[6px_6px_0_rgba(43,41,36,0.12)] sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
                <span className="flex items-center gap-1.5">
                  <IconoPersona className="h-4 w-4 text-tool" /> Nombre y apellido
                </span>
                <input
                  required
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={inputClase}
                  placeholder="Juan Pérez"
                />
              </label>

              <label className="block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
                <span className="flex items-center gap-1.5">
                  <IconoTelefono className="h-4 w-4 text-tool" /> Teléfono
                </span>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className={inputClase}
                  placeholder="099 123 456"
                />
              </label>

              <label className="block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
                <span className="flex items-center gap-1.5">
                  <IconoEmail className="h-4 w-4 text-tool" /> Email (opcional)
                </span>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClase}
                  placeholder="juan@email.com"
                />
              </label>

              <label className="block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
                <span className="flex items-center gap-1.5">
                  <IconoEmpresa className="h-4 w-4 text-tool" /> Empresa (opcional)
                </span>
                <input
                  type="text"
                  autoComplete="organization"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  className={inputClase}
                  placeholder="Constructora Rodó S.A."
                />
              </label>
            </div>

            <label className="mt-5 block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
              <span className="flex items-center gap-1.5">
                <IconoAsunto className="h-4 w-4 text-tool" /> Asunto
              </span>
              <input
                required
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className={inputClase}
                placeholder="Cotización de materiales para contrapiso"
              />
            </label>

            <label className="mt-5 block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
              <span className="flex items-center gap-1.5">
                <IconoMensaje className="h-4 w-4 text-tool" /> Mensaje
              </span>
              <textarea
                required
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className={`${inputClase} resize-y`}
                placeholder="Contanos qué necesitás y en qué cantidad podríamos ayudarte."
              />
            </label>

            <label className="mt-5 block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
              <span className="flex items-center gap-1.5">
                <IconoAdjuntar className="h-4 w-4 text-tool" /> Adjuntar archivo (opcional)
              </span>
              <input
                type="file"
                onChange={(e) => setNombreArchivo(e.target.files?.[0]?.name ?? '')}
                className="mt-1 block w-full text-sm text-graphite-soft file:mr-3 file:min-h-[44px] file:border-2 file:border-graphite file:bg-kraft-deep file:px-3 file:py-2 file:font-condensed file:text-xs file:font-bold file:uppercase file:text-graphite"
              />
              <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-graphite-soft">
                Mencionamos el nombre del archivo en el mensaje; lo adjuntás vos directamente en el
                chat de WhatsApp.
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center border-2 border-ok bg-ok px-6 font-condensed text-base font-bold uppercase tracking-wide text-kraft transition hover:bg-[#2f5f36]"
            >
              Pedir cotización
            </button>

            {enviado && (
              <p className="mt-3 text-center text-xs text-graphite-soft" role="status">
                Se abrió WhatsApp con tu consulta armada. Si no se abrió, escribinos directamente
                al {negocio.whatsappDisplay}.
              </p>
            )}
          </form>
        </Revelar>
      </div>
    </section>
  )
}
