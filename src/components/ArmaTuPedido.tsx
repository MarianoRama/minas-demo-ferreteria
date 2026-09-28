import { useMemo, useState } from 'react'
import { useDatos } from '../data/contexto'
import { formatearPrecio } from '../data/productos'
import { RUBROS, type RubroId } from '../data/rubros'
import { usePaginacion } from '../hooks/usePaginacion'
import { usePedido } from '../hooks/usePedido'
import { construirLinkWhatsapp, construirMensajePedido } from '../utils/whatsapp'
import { IconoCarro } from './Iconos'
import { Paginador } from './Paginador'
import { Revelar } from './Revelar'

const POR_PAGINA = 9

type Props = {
  rubroSeleccionado: RubroId | null
  onCambiarRubro: (rubro: RubroId | null) => void
  soloOfertas: boolean
  onCambiarSoloOfertas: (valor: boolean) => void
}

export function ArmaTuPedido({
  rubroSeleccionado,
  onCambiarRubro,
  soloOfertas,
  onCambiarSoloOfertas,
}: Props) {
  const { productos, negocio } = useDatos()
  const productosActivos = useMemo(() => productos.filter((p) => p.activo), [productos])
  const { items, total, cantidadTotal, sumar, restar, quitar, vaciar } = usePedido(productosActivos)
  const [enviado, setEnviado] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  const cantidadOfertas = productosActivos.filter((p) => p.oferta).length

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return productosActivos.filter((p) => {
      if (rubroSeleccionado && p.rubro !== rubroSeleccionado) return false
      if (soloOfertas && !p.oferta) return false
      if (texto && !p.nombre.toLowerCase().includes(texto) && !p.codigo.includes(texto)) return false
      return true
    })
  }, [productosActivos, rubroSeleccionado, soloOfertas, busqueda])

  const { contenedorRef, pagina, totalPaginas, itemsPagina, irAPagina, resumen } = usePaginacion(
    productosFiltrados,
    POR_PAGINA,
  )

  const cantidadesPorId = Object.fromEntries(items.map((it) => [it.producto.id, it.cantidad]))

  const linkWhatsapp = useMemo(() => {
    if (items.length === 0) return null
    const mensaje = construirMensajePedido(items, total, negocio)
    return construirLinkWhatsapp(mensaje, negocio.whatsappNumero)
  }, [items, total, negocio])

  return (
    <section id="pedido" ref={contenedorRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div>
        <h2 className="font-display text-4xl uppercase text-graphite sm:text-5xl">
          Armá tu pedido
        </h2>
        <p className="mt-3 max-w-2xl text-graphite-soft">
          Elegí productos y cantidades. Cuando termines, mandanos el detalle por WhatsApp y te
          confirmamos precio final y disponibilidad.
        </p>
      </div>

      {cantidadOfertas > 0 && !soloOfertas && (
        <button
          type="button"
          onClick={() => onCambiarSoloOfertas(true)}
          className="tarjeta-viva mt-6 flex w-full items-center gap-3 border-2 border-tool bg-tool/10 px-4 py-3 text-left"
        >
          <span className="sello-oferta shrink-0 px-2 py-0.5 text-xs">Oferta</span>
          <span className="text-sm font-semibold text-tool-deep">
            {cantidadOfertas} producto{cantidadOfertas === 1 ? '' : 's'} en oferta esta semana.
          </span>
          <span className="enlace-flecha ml-auto hidden shrink-0 items-center gap-1 font-condensed text-xs font-bold uppercase tracking-wide text-tool-deep sm:flex">
            Ver ofertas
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </span>
        </button>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          role="tablist"
          aria-label="Filtrar por rubro"
        >
          <button
            type="button"
            role="tab"
            aria-selected={rubroSeleccionado === null && !soloOfertas}
            onClick={() => {
              onCambiarRubro(null)
              onCambiarSoloOfertas(false)
            }}
            className={`min-h-[40px] shrink-0 border-2 px-4 font-condensed text-sm font-bold uppercase tracking-wide transition-colors ${
              rubroSeleccionado === null && !soloOfertas
                ? 'border-graphite bg-graphite text-kraft'
                : 'border-graphite-soft/40 text-graphite-soft hover:border-graphite'
            }`}
          >
            Todos
          </button>
          {RUBROS.map((rubro) => (
            <button
              key={rubro.id}
              type="button"
              role="tab"
              aria-selected={rubroSeleccionado === rubro.id}
              onClick={() => onCambiarRubro(rubro.id)}
              className={`min-h-[40px] shrink-0 border-2 px-4 font-condensed text-sm font-bold uppercase tracking-wide transition-colors ${
                rubroSeleccionado === rubro.id
                  ? 'border-tool bg-tool text-kraft'
                  : 'border-graphite-soft/40 text-graphite-soft hover:border-tool'
              }`}
            >
              {rubro.nombre}
            </button>
          ))}
          <button
            type="button"
            role="tab"
            aria-selected={soloOfertas}
            onClick={() => onCambiarSoloOfertas(!soloOfertas)}
            className={`min-h-[40px] shrink-0 border-2 px-4 font-condensed text-sm font-bold uppercase tracking-wide transition-colors ${
              soloOfertas
                ? 'border-safety-deep bg-safety text-graphite'
                : 'border-safety-deep/50 text-tool-deep hover:border-safety-deep'
            }`}
          >
            Solo ofertas
          </button>
        </div>

        <label className="relative block shrink-0 sm:w-64">
          <span className="sr-only">Buscar producto o código</span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar producto o código"
            className="min-h-[44px] w-full border-2 border-graphite-soft/40 bg-kraft px-3 text-sm text-graphite outline-none placeholder:text-graphite-soft/60 focus:border-tool"
          />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div>
          {itemsPagina.length === 0 ? (
            <p className="border-y-2 border-graphite/15 py-10 text-center text-sm text-graphite-soft">
              No encontramos productos con ese filtro. Probá con otra búsqueda o mirá "Todos".
            </p>
          ) : (
            <ul className="divide-y-2 divide-graphite/15 border-y-2 border-graphite/15">
              {itemsPagina.map((producto, i) => {
                const cantidad = cantidadesPorId[producto.id] ?? 0
                return (
                  <Revelar key={producto.id} as="li" retraso={Math.min(i, 8) * 50}>
                    <div className="tarjeta-viva relative flex items-center gap-3 bg-kraft py-4 sm:gap-4">
                      {producto.oferta && (
                        <span className="sello-oferta absolute -left-1 -top-1 px-2 py-0.5 text-[10px]">
                          Oferta
                        </span>
                      )}
                      <span className="hidden font-mono text-xs text-graphite-soft/60 sm:block sm:w-12">
                        {producto.codigo}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-condensed text-base font-semibold text-graphite sm:text-lg">
                          {producto.nombre}
                          {!producto.stock && (
                            <span className="ml-2 inline-block border border-graphite-soft/50 px-1.5 py-0.5 align-middle font-condensed text-[10px] font-bold uppercase tracking-wide text-graphite-soft">
                              Sin stock
                            </span>
                          )}
                        </p>
                        <p className="font-mono text-sm text-graphite-soft">
                          {producto.oferta && producto.precioAnterior && (
                            <span className="mr-1.5 line-through opacity-60">
                              {formatearPrecio(producto.precioAnterior)}
                            </span>
                          )}
                          <span className={producto.oferta ? 'font-bold text-tool-deep' : ''}>
                            {formatearPrecio(producto.precio)}
                          </span>{' '}
                          <span className="text-xs">/ {producto.unidad}</span>
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => restar(producto.id)}
                          disabled={cantidad === 0}
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                          className="grid h-11 w-11 place-items-center border-2 border-graphite text-lg font-bold text-graphite disabled:opacity-30"
                        >
                          −
                        </button>
                        <span
                          className="w-6 text-center font-mono text-sm font-semibold"
                          aria-live="polite"
                        >
                          {cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => sumar(producto.id)}
                          disabled={!producto.stock}
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                          className="grid h-11 w-11 place-items-center border-2 border-tool bg-tool text-lg font-bold text-kraft disabled:opacity-30"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </Revelar>
                )
              })}
            </ul>
          )}

          <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPagina} resumen={resumen} />
        </div>

        <aside className="h-max border-2 border-graphite bg-graphite-deep p-5 text-kraft lg:sticky lg:top-24">
          <div className="flex items-center gap-2 border-b-2 border-dashed border-kraft/25 pb-3">
            <IconoCarro className="h-6 w-6 text-safety" />
            <h3 className="font-display text-xl uppercase tracking-wide">Tu pedido</h3>
            {cantidadTotal > 0 && (
              <span className="ml-auto rounded-full bg-safety px-2 py-0.5 font-mono text-xs font-bold text-graphite">
                {cantidadTotal}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            <p className="mt-4 text-sm text-kraft/60">
              Todavía no agregaste productos. Sumalos desde la lista de la izquierda.
            </p>
          ) : (
            <ul className="mt-4 space-y-2 font-mono text-sm">
              {items.map((item) => (
                <li key={item.producto.id} className="flex items-start justify-between gap-2">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">
                      {item.cantidad}x {item.producto.nombre}
                    </span>
                  </span>
                  <span className="shrink-0">
                    {formatearPrecio(item.producto.precio * item.cantidad)}
                  </span>
                  <button
                    type="button"
                    onClick={() => quitar(item.producto.id)}
                    aria-label={`Quitar ${item.producto.nombre} del pedido`}
                    className="shrink-0 text-kraft/50 hover:text-tool"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="linea-perforada my-4 bg-kraft/20" />

          <div className="flex items-center justify-between font-mono text-lg font-bold">
            <span>Total</span>
            <span className="text-safety">{formatearPrecio(total)}</span>
          </div>

          <a
            href={linkWhatsapp ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!linkWhatsapp}
            onClick={(e) => {
              if (!linkWhatsapp) {
                e.preventDefault()
                return
              }
              setEnviado(true)
            }}
            className={`mt-5 flex min-h-[48px] items-center justify-center gap-2 border-2 px-4 font-condensed text-base font-bold uppercase tracking-wide transition ${
              linkWhatsapp
                ? 'border-ok bg-ok text-kraft hover:bg-[#2f5f36]'
                : 'cursor-not-allowed border-kraft/20 text-kraft/40'
            }`}
          >
            Enviar pedido por WhatsApp
          </a>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                vaciar()
                setEnviado(false)
              }}
              className="mt-3 w-full text-center font-condensed text-xs font-semibold uppercase tracking-wide text-kraft/50 underline-offset-2 hover:text-kraft/80 hover:underline"
            >
              Vaciar pedido
            </button>
          )}

          {enviado && (
            <p className="mt-3 text-center text-xs text-kraft/60" role="status">
              Se abrió WhatsApp con el detalle. Tu pedido queda guardado en este navegador.
            </p>
          )}
        </aside>
      </div>
    </section>
  )
}
