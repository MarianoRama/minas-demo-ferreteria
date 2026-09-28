import { useState } from 'react'
import { useDatos } from '../data/contexto'
import { AdminLogin } from './AdminLogin'
import { BackupTab } from './BackupTab'
import { NegocioTab } from './NegocioTab'
import { ProductosTab } from './ProductosTab'

function haySesion(): boolean {
  try {
    return window.sessionStorage.getItem('ferreteria.admin.sesion') === '1'
  } catch {
    return false
  }
}

type Tab = 'productos' | 'negocio' | 'backup'

export function AdminApp() {
  const [logueado, setLogueado] = useState(haySesion)
  const [tab, setTab] = useState<Tab>('productos')
  const { negocio, fuente, csvUrlSheets } = useDatos()

  if (!logueado) {
    return <AdminLogin onIngresar={() => setLogueado(true)} />
  }

  function salir() {
    try {
      window.sessionStorage.removeItem('ferreteria.admin.sesion')
    } catch {
      // no rompe la salida si sessionStorage no está disponible
    }
    setLogueado(false)
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'productos', label: 'Productos' },
    { id: 'negocio', label: 'Datos del negocio' },
    { id: 'backup', label: 'Copia de seguridad' },
  ]

  return (
    <div className="min-h-screen bg-kraft-deep font-sans text-ink">
      <p className="bg-tool py-1.5 text-center font-condensed text-xs font-bold uppercase tracking-widest text-kraft">
        Modo demostración: los cambios se guardan solo en este navegador.
      </p>

      <header className="border-b-4 border-graphite bg-kraft">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="font-condensed text-xs font-bold uppercase tracking-widest text-tool">
              Panel del dueño
            </p>
            <h1 className="font-display text-xl uppercase text-graphite">{negocio.nombre}</h1>
          </div>
          <div className="flex gap-2">
            <a
              href="#/"
              className="min-h-[40px] content-center border-2 border-graphite px-3 font-condensed text-xs font-bold uppercase tracking-wide text-graphite"
            >
              Ver sitio
            </a>
            <button
              type="button"
              onClick={salir}
              className="min-h-[40px] border-2 border-graphite-soft/40 px-3 font-condensed text-xs font-bold uppercase tracking-wide text-graphite-soft"
            >
              Salir
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 sm:px-6" aria-label="Secciones del panel">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-current={tab === t.id ? 'page' : undefined}
              className={`min-h-[44px] shrink-0 border-b-4 px-4 font-condensed text-sm font-bold uppercase tracking-wide ${
                tab === t.id ? 'border-tool text-tool-deep' : 'border-transparent text-graphite-soft'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {tab === 'productos' &&
          (fuente === 'sheets' ? (
            <div className="border-2 border-graphite bg-kraft p-6">
              <h2 className="font-display text-xl uppercase text-graphite">Productos</h2>
              <p className="mt-2 text-sm text-graphite-soft">
                Estos datos se editan en tu planilla de Google, no acá. Cualquier cambio en la
                planilla se ve reflejado en el sitio la próxima vez que alguien lo abra.
              </p>
              {csvUrlSheets && (
                <a
                  href={csvUrlSheets}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-semibold text-tool underline underline-offset-2"
                >
                  Abrir la planilla
                </a>
              )}
            </div>
          ) : (
            <ProductosTab />
          ))}
        {tab === 'negocio' && <NegocioTab />}
        {tab === 'backup' && <BackupTab />}
      </main>
    </div>
  )
}
