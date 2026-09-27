import { useEffect, useState } from 'react'
import { NEGOCIO } from '../config'
import { RUBROS } from '../data/rubros'
import { calcularEstadoHorario, type EstadoHorario } from '../utils/horario'
import { IconoCerrar, IconoMenu } from './Iconos'

const ENLACES = [
  { href: '#rubros', label: 'Rubros' },
  { href: '#ofertas', label: 'Ofertas' },
  { href: '#pedido', label: 'Armá tu pedido' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#horarios', label: 'Horarios y ubicación' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const [abierto, setAbierto] = useState(false)
  const [estado, setEstado] = useState<EstadoHorario>(calcularEstadoHorario)

  useEffect(() => {
    const id = window.setInterval(() => setEstado(calcularEstadoHorario()), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b-4 border-graphite bg-kraft/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-graphite bg-safety font-display text-lg text-graphite">
            ET
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-lg tracking-wide text-graphite sm:text-xl">
              {NEGOCIO.nombre.toUpperCase()}
            </span>
            <span className="block truncate font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-graphite-soft">
              {NEGOCIO.ciudad}
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          {estado && (
            <span
              className={`hidden items-center gap-1.5 border-2 px-3 py-1.5 font-condensed text-xs font-bold uppercase tracking-wide sm:flex ${
                estado.abierto
                  ? 'border-ok bg-ok/10 text-ok'
                  : 'border-tool bg-tool/10 text-tool-deep'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${estado.abierto ? 'bg-ok' : 'bg-tool'}`}
              />
              {estado.abierto ? 'Abierto ahora' : 'Cerrado ahora'}
            </span>
          )}

          <nav className="hidden lg:flex lg:gap-6">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.href}
                href={enlace.href}
                className="font-condensed text-sm font-semibold uppercase tracking-wide text-graphite transition hover:text-tool"
              >
                {enlace.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-mobile"
            className="grid h-11 w-11 place-items-center border-2 border-graphite text-graphite lg:hidden"
          >
            {abierto ? <IconoCerrar className="h-6 w-6" /> : <IconoMenu className="h-6 w-6" />}
            <span className="sr-only">Abrir menú</span>
          </button>
        </div>
      </div>

      {abierto && (
        <nav id="menu-mobile" className="border-t-2 border-graphite bg-kraft px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {ENLACES.map((enlace) => (
              <li key={enlace.href}>
                <a
                  href={enlace.href}
                  onClick={() => setAbierto(false)}
                  className="flex min-h-[44px] items-center font-condensed text-base font-semibold uppercase tracking-wide text-graphite"
                >
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-2 border-t border-kraft-line pt-3">
            {RUBROS.map((r) => (
              <li key={r.id}>
                <a
                  href={`#rubros`}
                  onClick={() => setAbierto(false)}
                  className="inline-block border border-graphite-soft px-2.5 py-1 font-condensed text-xs font-semibold uppercase text-graphite-soft"
                >
                  {r.nombre}
                </a>
              </li>
            ))}
          </ul>
          {estado && (
            <p
              className={`mt-3 font-condensed text-sm font-bold uppercase ${estado.abierto ? 'text-ok' : 'text-tool-deep'}`}
            >
              {estado.abierto ? 'Abierto ahora' : 'Cerrado ahora'} · {estado.mensaje}
            </p>
          )}
        </nav>
      )}
    </header>
  )
}
