import { useEffect, useRef } from 'react'

type Props = {
  abierto: boolean
  titulo: string
  descripcion: string
  textoConfirmar?: string
  peligroso?: boolean
  onConfirmar: () => void
  onCancelar: () => void
}

/** Diálogo de confirmación propio (sin depender de window.confirm). */
export function ConfirmDialog({
  abierto,
  titulo,
  descripcion,
  textoConfirmar = 'Confirmar',
  peligroso = false,
  onConfirmar,
  onCancelar,
}: Props) {
  const botonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (abierto) botonRef.current?.focus()
  }, [abierto])

  useEffect(() => {
    if (!abierto) return
    function alTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancelar()
    }
    document.addEventListener('keydown', alTecla)
    return () => document.removeEventListener('keydown', alTecla)
  }, [abierto, onCancelar])

  if (!abierto) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-titulo"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-graphite-deep/70 p-4"
    >
      <div className="w-full max-w-sm border-2 border-graphite bg-kraft p-6 shadow-[6px_6px_0_rgba(0,0,0,0.3)]">
        <h2 id="confirm-titulo" className="font-display text-xl uppercase text-graphite">
          {titulo}
        </h2>
        <p className="mt-2 text-sm text-graphite-soft">{descripcion}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancelar}
            className="min-h-[44px] border-2 border-graphite-soft/40 px-4 font-condensed text-sm font-bold uppercase tracking-wide text-graphite-soft"
          >
            Cancelar
          </button>
          <button
            ref={botonRef}
            type="button"
            onClick={onConfirmar}
            className={`min-h-[44px] border-2 px-4 font-condensed text-sm font-bold uppercase tracking-wide text-kraft ${
              peligroso ? 'border-tool-deep bg-tool-deep' : 'border-ok bg-ok'
            }`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  )
}
