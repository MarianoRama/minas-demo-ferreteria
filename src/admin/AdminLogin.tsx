import { type FormEvent, useState } from 'react'

const PIN_DEMO = '1234'

type Props = { onIngresar: () => void }

export function AdminLogin({ onIngresar }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  function alEnviar(e: FormEvent) {
    e.preventDefault()
    if (pin === PIN_DEMO) {
      try {
        window.sessionStorage.setItem('ferreteria.admin.sesion', '1')
      } catch {
        // si sessionStorage falla, igual dejamos pasar por esta sesión de React
      }
      onIngresar()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-graphite px-4 py-12">
      <div className="w-full max-w-sm border-2 border-kraft/30 bg-kraft p-7 shadow-[8px_8px_0_rgba(0,0,0,0.35)]">
        <p className="font-condensed text-xs font-bold uppercase tracking-widest text-tool">
          Panel del dueño
        </p>
        <h1 className="mt-1 font-display text-2xl uppercase text-graphite">Ingresar</h1>
        <p className="mt-2 text-sm text-graphite-soft">
          Escribí el PIN para entrar a administrar el sitio.
        </p>

        <form onSubmit={alEnviar} className="mt-6">
          <label className="block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite">
            PIN
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value)
                setError(false)
              }}
              className="mt-1 w-full min-h-[48px] border-2 border-graphite-soft/30 bg-white px-3 text-lg tracking-[0.3em] text-graphite outline-none focus:border-tool"
              placeholder="••••"
            />
          </label>
          {error && (
            <p className="mt-2 text-sm font-semibold text-tool-deep" role="alert">
              PIN incorrecto. Probá de nuevo.
            </p>
          )}
          <button
            type="submit"
            className="mt-5 flex min-h-[48px] w-full items-center justify-center border-2 border-ok bg-ok font-condensed text-base font-bold uppercase tracking-wide text-kraft"
          >
            Entrar
          </button>
        </form>

        <p className="mt-5 border-t border-dashed border-graphite/20 pt-4 text-xs text-graphite-soft">
          PIN de demostración: <strong className="font-mono">1234</strong>. En un sitio real, el
          acceso se hace con tu cuenta de Google (si usás Sheets) o con un backend con login
          propio (por ejemplo Supabase), no con este PIN.
        </p>
        <a href="#/" className="mt-4 block text-center text-sm font-semibold text-tool underline underline-offset-2">
          ‹ Volver al sitio
        </a>
      </div>
    </div>
  )
}
