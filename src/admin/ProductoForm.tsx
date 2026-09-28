import { useState } from 'react'
import type { Producto } from '../data/productos'
import { RUBROS } from '../data/rubros'
import { redimensionarFoto } from '../utils/imagen'

type Props = {
  inicial: Producto | null
  onGuardar: (datos: Omit<Producto, 'id'>) => void
  onCancelar: () => void
}

type Errores = Partial<Record<'nombre' | 'codigo' | 'precio' | 'unidad', string>>

const inputClase =
  'mt-1 w-full min-h-[44px] border-2 border-graphite-soft/30 bg-white px-3 py-2 text-sm text-graphite outline-none transition focus:border-tool'
const labelClase = 'block font-condensed text-sm font-semibold uppercase tracking-wide text-graphite'

export function ProductoForm({ inicial, onGuardar, onCancelar }: Props) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? '')
  const [codigo, setCodigo] = useState(inicial?.codigo ?? '')
  const [rubro, setRubro] = useState(inicial?.rubro ?? RUBROS[0].id)
  const [unidad, setUnidad] = useState(inicial?.unidad ?? 'unidad')
  const [precio, setPrecio] = useState(inicial ? String(inicial.precio) : '')
  const [stock, setStock] = useState(inicial?.stock ?? true)
  const [oferta, setOferta] = useState(inicial?.oferta ?? false)
  const [precioAnterior, setPrecioAnterior] = useState(
    inicial?.precioAnterior ? String(inicial.precioAnterior) : '',
  )
  const [destacado, setDestacado] = useState(inicial?.destacado ?? false)
  const [activo, setActivo] = useState(inicial?.activo ?? true)
  const [foto, setFoto] = useState<string | undefined>(inicial?.foto)
  const [avisoFoto, setAvisoFoto] = useState<string | null>(null)
  const [errores, setErrores] = useState<Errores>({})

  async function alElegirFoto(archivo: File | undefined) {
    if (!archivo) return
    setAvisoFoto(null)
    try {
      const dataUrl = await redimensionarFoto(archivo)
      setFoto(dataUrl)
    } catch (err) {
      setAvisoFoto(err instanceof Error ? err.message : 'No se pudo procesar la foto.')
    }
  }

  function validar(): boolean {
    const nuevosErrores: Errores = {}
    if (!nombre.trim()) nuevosErrores.nombre = 'Escribí el nombre del producto.'
    if (!codigo.trim()) nuevosErrores.codigo = 'Poné un código, aunque sea inventado.'
    if (!unidad.trim()) nuevosErrores.unidad = 'Indicá la unidad (unidad, bolsa, rollo...).'
    const numero = Number(precio)
    if (!precio.trim() || Number.isNaN(numero) || numero <= 0) {
      nuevosErrores.precio = 'Precio en dólares o pesos, sin puntos ni comas: solo números.'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function alEnviar(e: React.FormEvent) {
    e.preventDefault()
    if (!validar()) return
    onGuardar({
      nombre: nombre.trim(),
      codigo: codigo.trim(),
      rubro,
      unidad: unidad.trim(),
      precio: Number(precio),
      stock,
      oferta,
      precioAnterior: oferta && precioAnterior.trim() ? Number(precioAnterior) : undefined,
      destacado,
      activo,
      foto,
    })
  }

  return (
    <form onSubmit={alEnviar} className="border-2 border-graphite bg-kraft p-5 sm:p-7">
      <h2 className="font-display text-xl uppercase text-graphite">
        {inicial ? 'Editar producto' : 'Nuevo producto'}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <label className={labelClase}>
          Nombre del producto
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClase}
            placeholder='Tornillo autorroscante 8x1"'
          />
          {errores.nombre && <p className="mt-1 text-xs font-semibold text-tool-deep">{errores.nombre}</p>}
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className={labelClase}>
            Rubro
            <select value={rubro} onChange={(e) => setRubro(e.target.value as Producto['rubro'])} className={inputClase}>
              {RUBROS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClase}>
            Código
            <input value={codigo} onChange={(e) => setCodigo(e.target.value)} className={inputClase} placeholder="1042" />
            {errores.codigo && <p className="mt-1 text-xs font-semibold text-tool-deep">{errores.codigo}</p>}
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className={labelClase}>
            Unidad
            <input value={unidad} onChange={(e) => setUnidad(e.target.value)} className={inputClase} placeholder="unidad, bolsa, rollo" />
            {errores.unidad && <p className="mt-1 text-xs font-semibold text-tool-deep">{errores.unidad}</p>}
          </label>
          <label className={labelClase}>
            Precio
            <input
              type="number"
              inputMode="decimal"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className={inputClase}
              placeholder="890"
            />
            <span className="mt-1 block text-xs font-normal normal-case tracking-normal text-graphite-soft">
              En pesos, sin puntos.
            </span>
            {errores.precio && <p className="mt-1 text-xs font-semibold text-tool-deep">{errores.precio}</p>}
          </label>
        </div>

        <fieldset className="grid grid-cols-2 gap-3 border-2 border-dashed border-graphite/20 p-4 sm:grid-cols-4">
          <legend className="px-1 font-condensed text-xs font-bold uppercase tracking-wide text-graphite-soft">
            Estado del producto
          </legend>
          <label className="flex min-h-[44px] items-center gap-2 text-sm text-graphite">
            <input type="checkbox" checked={stock} onChange={(e) => setStock(e.target.checked)} className="h-5 w-5" />
            Con stock
          </label>
          <label className="flex min-h-[44px] items-center gap-2 text-sm text-graphite">
            <input type="checkbox" checked={oferta} onChange={(e) => setOferta(e.target.checked)} className="h-5 w-5" />
            En oferta
          </label>
          <label className="flex min-h-[44px] items-center gap-2 text-sm text-graphite">
            <input
              type="checkbox"
              checked={destacado}
              onChange={(e) => setDestacado(e.target.checked)}
              className="h-5 w-5"
            />
            Destacado
          </label>
          <label className="flex min-h-[44px] items-center gap-2 text-sm text-graphite">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} className="h-5 w-5" />
            Activo (visible)
          </label>
        </fieldset>

        {oferta && (
          <label className={labelClase}>
            Precio anterior (opcional, se muestra tachado)
            <input
              type="number"
              inputMode="decimal"
              value={precioAnterior}
              onChange={(e) => setPrecioAnterior(e.target.value)}
              className={inputClase}
              placeholder="1200"
            />
          </label>
        )}

        <div>
          <p className={labelClase}>Foto</p>
          <p className="mt-1 text-xs font-normal normal-case tracking-normal text-graphite-soft">
            Sacala con el celular o subí una de la PC. Se ajusta sola al tamaño justo.
          </p>
          <div className="mt-2 flex items-center gap-4">
            {foto ? (
              <img src={foto} alt="" className="h-20 w-20 border-2 border-graphite object-cover" />
            ) : (
              <div className="grid h-20 w-20 place-items-center border-2 border-dashed border-graphite-soft/40 text-[10px] uppercase text-graphite-soft/60">
                Sin foto
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => alElegirFoto(e.target.files?.[0])}
                className="text-xs text-graphite-soft file:mr-2 file:min-h-[40px] file:border-2 file:border-graphite file:bg-kraft-deep file:px-3 file:py-1.5 file:font-condensed file:text-xs file:font-bold file:uppercase file:text-graphite"
              />
              {foto && (
                <button
                  type="button"
                  onClick={() => setFoto(undefined)}
                  className="self-start text-xs font-semibold uppercase tracking-wide text-tool underline underline-offset-2"
                >
                  Quitar foto
                </button>
              )}
            </div>
          </div>
          {avisoFoto && <p className="mt-2 text-xs font-semibold text-tool-deep">{avisoFoto}</p>}
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancelar}
          className="min-h-[48px] border-2 border-graphite-soft/40 px-5 font-condensed text-sm font-bold uppercase tracking-wide text-graphite-soft"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="min-h-[48px] border-2 border-ok bg-ok px-5 font-condensed text-sm font-bold uppercase tracking-wide text-kraft"
        >
          Guardar producto
        </button>
      </div>
    </form>
  )
}
