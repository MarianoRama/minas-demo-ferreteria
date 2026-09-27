import type { SVGProps } from 'react'

export type IconoProps = SVGProps<SVGSVGElement>

const base = {
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function IconoBulonera(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="6.5" />
      <circle cx="16" cy="16" r="2" />
      <path d="M16 4.5v3M16 24.5v3M27.5 16h-3M7.5 16h-3M23.9 8.1l-2.1 2.1M10.2 21.7l-2.1 2.1M23.9 23.9l-2.1-2.1M10.2 10.3 8.1 8.1" />
    </svg>
  )
}

export function IconoElectricidad(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M17.5 3 8 18h6.5L14 29l10-16h-6.5L17.5 3Z" />
    </svg>
  )
}

export function IconoSanitaria(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 5h7v7a5 5 0 0 0 5 5h6v10h-7v-7a5 5 0 0 0-5-5H7V5Z" />
      <circle cx="24" cy="8" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconoPinturas(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 27c1.8 0 2.5-1.1 2.5-2.6v-3.6L20 9.3l3.7 3.7L12.2 24.5H8.6c-1.3 0-2.6.7-2.6 2.5Z" />
      <path d="M18.5 7.2 22 3.7l6.3 6.3-3.5 3.5" />
    </svg>
  )
}

export function IconoHerramientas(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 6.5a6 6 0 0 0-8 8L5 21.5 10.5 27l7-7a6 6 0 0 0 8-8l-3.8 3.8-3-3L22.8 9Z" />
    </svg>
  )
}

export function IconoJardin(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 28V13" />
      <path d="M16 13c-5 0-9-4-9-9 5 0 9 4 9 9Zm0 0c0-5 4-9 9-9 0 5-4 9-9 9Z" />
    </svg>
  )
}

export function IconoConstruccion(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 27V14l12-8 12 8v13M4 27h24M12 27v-8h8v8" />
    </svg>
  )
}

export function IconoLlave(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="16" r="5.5" />
      <path d="M15 16h13M23 16v5M27 16v4" />
    </svg>
  )
}

export function IconoCorte(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h24M4 24h24" />
      <path d="M12 8v16M20 8v16" strokeDasharray="1 4" />
    </svg>
  )
}

export function IconoPintura(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <rect x="10" y="4" width="12" height="7" rx="1" />
      <path d="M11 11v5c0 1-1 1.5-2 2.4A5 5 0 0 0 7 22v5h18v-5a5 5 0 0 0-2-3.6c-1-.9-2-1.4-2-2.4v-5" />
    </svg>
  )
}

export function IconoEnvio(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9h15v13H4z" />
      <path d="M19 13h5l4 4v5h-9z" />
      <circle cx="10" cy="24.5" r="2" />
      <circle cx="23" cy="24.5" r="2" />
    </svg>
  )
}

export function IconoWhatsapp(props: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.2.5.1.7-.1l.7-.8c.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.2.1.9-.1 1.6Z" />
    </svg>
  )
}

export function IconoUbicacion(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 28s9-8.5 9-15a9 9 0 1 0-18 0c0 6.5 9 15 9 15Z" />
      <circle cx="16" cy="13" r="3.2" />
    </svg>
  )
}

export function IconoReloj(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 9v7l5 3" />
    </svg>
  )
}

export function IconoMenu(props: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}

export function IconoCerrar(props: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function IconoCarro(props: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.5L7 15h11l3-8H5.7" />
    </svg>
  )
}

export function IconoConfianza(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4 6 8v8c0 6.5 4.4 10.6 10 12 5.6-1.4 10-5.5 10-12V8Z" />
      <path d="M11.5 16.3l3 3 6-6.6" />
    </svg>
  )
}

export function IconoRapidez(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19h13V9H4z" />
      <path d="M17 12.5h5l4 4V19h-9" />
      <circle cx="10" cy="23.5" r="2" />
      <circle cx="23" cy="23.5" r="2" />
      <path d="M4 13.5h6M4 16.5h4" />
    </svg>
  )
}

export function IconoAsesoramiento(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 20.5V13a10 10 0 0 1 20 0v5" />
      <path d="M6 20.5h3v-6H6a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z" />
      <path d="M26 20.5h-3v-6h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z" />
      <path d="M23 21.5v1.5a4 4 0 0 1-4 4h-2.5" />
    </svg>
  )
}

export function IconoMarcasTop(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M16 4.5 19.4 12l8.1.7-6.2 5.4 1.9 7.9L16 21.8l-7.2 4.2 1.9-7.9-6.2-5.4L12.6 12 16 4.5Z" />
    </svg>
  )
}

export function IconoEmail(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="7" width="24" height="18" rx="1.5" />
      <path d="m5 8.5 11 8.5 11-8.5" />
    </svg>
  )
}

export function IconoTelefono(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4h4l2 6-3 2a14 14 0 0 0 7 7l2-3 6 2v4a2 2 0 0 1-2 2C13.6 28 4 18.4 4 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

export function IconoInstagram(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="5" width="22" height="22" rx="6" />
      <circle cx="16" cy="16" r="5.5" />
      <circle cx="22.5" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function IconoPersona(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="16" cy="10.5" r="5" />
      <path d="M6 27c0-5.5 4.5-9 10-9s10 3.5 10 9" />
    </svg>
  )
}

export function IconoEmpresa(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 27V8l7-3v22M20 27V13l6 2v12" />
      <path d="M6 27h22" />
      <path d="M10 12h1M10 17h1M10 22h1" />
    </svg>
  )
}

export function IconoAsunto(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h20v16H6z" />
      <path d="m6 8 10 8 10-8" />
    </svg>
  )
}

export function IconoMensaje(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6h20v14H14l-5 5v-5H6Z" />
    </svg>
  )
}

export function IconoAdjuntar(props: IconoProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 8.5 11 17.5a4 4 0 0 0 5.7 5.7L26 14a6.5 6.5 0 1 0-9.2-9.2L7.5 14a3 3 0 0 0 4.2 4.2l8.6-8.6" />
    </svg>
  )
}
