import { useMemo, useState } from 'react'
import { PRODUCTOS, formatearPrecio } from '../data/productos'
import { RUBROS, type RubroId } from '../data/rubros'
import { usePedido } from '../hooks/usePedido'
import { construirLinkWhatsapp, construirMensajePedido } from '../utils/whatsapp'
import { IconoCarro } from './Iconos'
import { Revelar } from './Revelar'

type Props = {
  rubroSeleccionado: RubroId | null
  onCambiarRubro: (rubro: RubroId | null) => void
}

export function ArmaTuPedido({ rubroSeleccionado, onCambiarRubro }: Props) {
  const { items, total, cantidadTotal, sumar, restar, quitar, vaciar } = usePedido()
  const [enviado, setEnviado] = useState(false)

  const productosFiltrados = useMemo(
    () => (rubroSeleccionado ? PRODUCTOS.filter((p) => p.rubro === rubroSeleccionado) : PRODUCTOS),
    [rubroSeleccionado],
  )

  const cantidadesPorId = Object.fromEntries(items.map((it) => [it.producto.id, it.cantidad]))

  const linkWhatsapp = useMemo(() => {
    if (items.length === 0) return null
    const mensaje = construirMensajePedido(items, total)
    return construirLinkWhatsapp(mensaje)
  }, [items, total])

  return (
    <section id="pedido" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div>
        <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-tool">
          Sin filas, sin apuro
        </p>
        <h2 className="mt-2 font-display text-4xl uppercase text-graphite sm:text-5xl">
          Armá tu pedido
        </h2>
        <p className="mt-3 max-w-2xl text-graphite-soft">
          Elegí productos y cantidades. Cuando termines, mandanos el detalle por WhatsApp y te
          confirmamos precio final y disponibilidad.
        </p>
      </div>

      <div
        className="mt-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        role="tablist"
        aria-label="Filtrar por rubro"
      >
        <button
          type="button"
          role="tab"
          aria-selected={rubroSeleccionado === null}
          onClick={() => onCambiarRubro(null)}
          className={`min-h-[40px] shrink-0 border-2 px-4 font-condensed text-sm font-bold uppercase tracking-wide transition-colors ${
            rubroSeleccionado === null
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
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
        <ul className="divide-y-2 divide-graphite/15 border-y-2 border-graphite/15">
          {productosFiltrados.map((producto, i) => {
            const cantidad = cantidadesPorId[producto.id] ?? 0
            return (
              <Revelar key={producto.id} as="li" retraso={Math.min(i, 8) * 50}>
                <div className="tarjeta-viva flex items-center gap-3 bg-kraft py-4 sm:gap-4">
                  <span className="hidden font-mono text-xs text-graphite-soft/60 sm:block sm:w-12">
                    {producto.codigo}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-condensed text-base font-semibold text-graphite sm:text-lg">
                      {producto.nombre}
                    </p>
                    <p className="font-mono text-sm text-graphite-soft">
                      {formatearPrecio(producto.precio)}{' '}
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
                      aria-label={`Agregar una unidad de ${producto.nombre}`}
                      className="grid h-11 w-11 place-items-center border-2 border-tool bg-tool text-lg font-bold text-kraft"
                    >
                      +
                    </button>
                  </div>
                </div>
              </Revelar>
            )
          })}
        </ul>

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
