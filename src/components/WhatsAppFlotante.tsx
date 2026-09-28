import { useDatos } from '../data/contexto'
import { IconoWhatsapp } from './Iconos'

export function WhatsAppFlotante() {
  const { negocio } = useDatos()
  const mensaje = encodeURIComponent(
    `Hola! Vi la página de ${negocio.nombre} y quería hacer una consulta.`,
  )

  return (
    <a
      href={`https://wa.me/${negocio.whatsappNumero}?text=${mensaje}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Escribinos por WhatsApp (número de ejemplo: ${negocio.whatsappDisplay})`}
      className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center border-2 border-graphite bg-ok text-kraft shadow-[4px_4px_0_rgba(0,0,0,0.3)] transition hover:-translate-y-0.5 hover:shadow-[5px_6px_0_rgba(0,0,0,0.32)] sm:bottom-6 sm:right-6"
    >
      <IconoWhatsapp className="h-7 w-7" />
      <span className="sr-only">Escribinos por WhatsApp</span>
    </a>
  )
}
