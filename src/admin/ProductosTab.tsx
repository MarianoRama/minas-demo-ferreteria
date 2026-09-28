import { useMemo, useState } from 'react'
import { useDatos } from '../data/contexto'
import { formatearPrecio, type Producto } from '../data/productos'
import { RUBROS } from '../data/rubros'
import { ConfirmDialog } from './ConfirmDialog'
import { ProductoForm } from './ProductoForm'

const NOMBRE_RUBRO = Object.fromEntries(RUBROS.map((r) => [r.id, r.nombre]))

export function ProductosTab() {
  const { productos, crearProducto, actualizarProducto, eliminarProducto, duplicarProducto } = useDatos()
  const [busqueda, setBusqueda] = useState('')
  const [editando, setEditando] = useState<Producto | 'nuevo' | null>(null)
  const [aEliminar, setAEliminar] = useState<Producto | null>(null)

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return productos
    return productos.filter(
      (p) => p.nombre.toLowerCase().includes(texto) || p.codigo.includes(texto),
    )
  }, [productos, busqueda])

  if (editando) {
    return (
      <ProductoForm
        inicial={editando === 'nuevo' ? null : editando}
        onCancelar={() => setEditando(null)}
        onGuardar={(datos) => {
          if (editando === 'nuevo') {
            crearProducto(datos)
          } else {
            actualizarProducto(editando.id, datos)
          }
          setEditando(null)
        }}
      />
    )
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block flex-1 sm:max-w-xs">
          <span className="sr-only">Buscar producto</span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código"
            className="min-h-[44px] w-full border-2 border-graphite-soft/30 bg-white px-3 text-sm text-graphite outline-none focus:border-tool"
          />
        </label>
        <button
          type="button"
          onClick={() => setEditando('nuevo')}
          className="min-h-[48px] shrink-0 border-2 border-ok bg-ok px-5 font-condensed text-sm font-bold uppercase tracking-wide text-kraft"
        >
          + Agregar producto
        </button>
      </div>

      <p className="mt-3 text-xs text-graphite-soft">
        {productos.length} producto{productos.length === 1 ? '' : 's'} en total.
      </p>

      <ul className="mt-4 divide-y-2 divide-graphite/15 border-y-2 border-graphite/15">
        {filtrados.map((p) => (
          <li key={p.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
            {p.foto ? (
              <img src={p.foto} alt="" className="h-14 w-14 shrink-0 border-2 border-graphite object-cover" />
            ) : (
              <div className="grid h-14 w-14 shrink-0 place-items-center border-2 border-dashed border-graphite-soft/30 text-[9px] uppercase text-graphite-soft/50">
                Sin foto
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate font-condensed text-base font-semibold text-graphite">{p.nombre}</p>
              <p className="text-xs text-graphite-soft">
                {NOMBRE_RUBRO[p.rubro]} · {p.codigo} · {formatearPrecio(p.precio)} / {p.unidad}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {!p.activo && (
                  <span className="border border-graphite-soft/50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-graphite-soft">
                    Pausado
                  </span>
                )}
                {!p.stock && (
                  <span className="border border-tool-deep/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tool-deep">
                    Sin stock
                  </span>
                )}
                {p.oferta && (
                  <span className="border border-tool bg-tool/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tool-deep">
                    Oferta
                  </span>
                )}
                {p.destacado && (
                  <span className="border border-safety-deep bg-safety/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-safety-deep">
                    Destacado
                  </span>
                )}
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setEditando(p)}
                className="min-h-[40px] border-2 border-graphite px-3 font-condensed text-xs font-bold uppercase tracking-wide text-graphite"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => duplicarProducto(p.id)}
                className="min-h-[40px] border-2 border-graphite-soft/40 px-3 font-condensed text-xs font-bold uppercase tracking-wide text-graphite-soft"
              >
                Duplicar
              </button>
              <button
                type="button"
                onClick={() => setAEliminar(p)}
                className="min-h-[40px] border-2 border-tool-deep px-3 font-condensed text-xs font-bold uppercase tracking-wide text-tool-deep"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
        {filtrados.length === 0 && (
          <li className="py-8 text-center text-sm text-graphite-soft">No hay productos con ese filtro.</li>
        )}
      </ul>

      <ConfirmDialog
        abierto={aEliminar !== null}
        titulo="¿Eliminar producto?"
        descripcion={`"${aEliminar?.nombre}" se va a borrar del catálogo. Esta acción no se puede deshacer.`}
        textoConfirmar="Eliminar"
        peligroso
        onCancelar={() => setAEliminar(null)}
        onConfirmar={() => {
          if (aEliminar) eliminarProducto(aEliminar.id)
          setAEliminar(null)
        }}
      />
    </div>
  )
}
