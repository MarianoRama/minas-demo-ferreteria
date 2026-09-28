import { useRef, useState } from 'react'
import { useDatos } from '../data/contexto'
import { ConfirmDialog } from './ConfirmDialog'

export function BackupTab() {
  const { exportarJSON, importarJSON, restaurarEjemplo, errorAlmacenamiento } = useDatos()
  const inputRef = useRef<HTMLInputElement>(null)
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null)
  const [confirmarRestaurar, setConfirmarRestaurar] = useState(false)

  async function alImportar(archivo: File | undefined) {
    if (!archivo) return
    try {
      await importarJSON(archivo)
      setMensaje({ tipo: 'ok', texto: 'Copia cargada. Los datos del sitio ya se actualizaron.' })
    } catch (err) {
      setMensaje({
        tipo: 'error',
        texto: err instanceof Error ? err.message : 'No se pudo leer el archivo.',
      })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-5">
      {errorAlmacenamiento && (
        <p className="border-2 border-tool-deep bg-tool/10 p-4 text-sm font-semibold text-tool-deep" role="alert">
          {errorAlmacenamiento}
        </p>
      )}

      <section className="border-2 border-graphite bg-kraft p-5 sm:p-7">
        <h2 className="font-display text-xl uppercase text-graphite">Copia de seguridad</h2>
        <p className="mt-2 max-w-2xl text-sm text-graphite-soft">
          Los cambios que hacés en este panel se guardan solo en este navegador. Si vas a usar
          otra computadora, o querés tener un respaldo, descargá una copia en JSON. Después la
          podés volver a cargar acá mismo.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={exportarJSON}
            className="min-h-[48px] border-2 border-graphite bg-kraft-deep px-5 font-condensed text-sm font-bold uppercase tracking-wide text-graphite"
          >
            Descargar copia (JSON)
          </button>

          <label className="flex min-h-[48px] cursor-pointer items-center justify-center border-2 border-graphite bg-kraft-deep px-5 font-condensed text-sm font-bold uppercase tracking-wide text-graphite">
            Cargar copia
            <input
              ref={inputRef}
              type="file"
              accept="application/json"
              onChange={(e) => alImportar(e.target.files?.[0])}
              className="sr-only"
            />
          </label>
        </div>

        {mensaje && (
          <p
            role="status"
            className={`mt-4 text-sm font-semibold ${mensaje.tipo === 'ok' ? 'text-ok' : 'text-tool-deep'}`}
          >
            {mensaje.texto}
          </p>
        )}
      </section>

      <section className="border-2 border-tool-deep bg-tool/5 p-5 sm:p-7">
        <h2 className="font-display text-xl uppercase text-tool-deep">Zona de reinicio</h2>
        <p className="mt-2 max-w-2xl text-sm text-graphite-soft">
          Esto borra todos los cambios guardados en este navegador y vuelve a dejar el catálogo y
          los datos del negocio como estaban al principio de la demo.
        </p>
        <button
          type="button"
          onClick={() => setConfirmarRestaurar(true)}
          className="mt-4 min-h-[48px] border-2 border-tool-deep px-5 font-condensed text-sm font-bold uppercase tracking-wide text-tool-deep"
        >
          Volver a los datos de ejemplo
        </button>
      </section>

      <ConfirmDialog
        abierto={confirmarRestaurar}
        titulo="¿Volver a los datos de ejemplo?"
        descripcion="Se van a perder todos los cambios guardados en este navegador: productos, precios, fotos y datos del negocio."
        textoConfirmar="Sí, reiniciar"
        peligroso
        onCancelar={() => setConfirmarRestaurar(false)}
        onConfirmar={() => {
          restaurarEjemplo()
          setConfirmarRestaurar(false)
          setMensaje({ tipo: 'ok', texto: 'Listo, quedaron los datos de ejemplo originales.' })
        }}
      />
    </div>
  )
}
