import type { NegocioDatos } from '../data/contexto'
import { formatearPrecio, type Producto } from '../data/productos'

export type ItemPedido = { producto: Producto; cantidad: number }

export function construirMensajePedido(items: ItemPedido[], total: number, negocio: NegocioDatos): string {
  const lineas = [
    `Hola! Quiero hacer un pedido en ${negocio.nombre}:`,
    '',
    ...items.map(
      (item) =>
        `• ${item.cantidad} x ${item.producto.nombre} (${item.producto.unidad}): ${formatearPrecio(
          item.producto.precio * item.cantidad,
        )}`,
    ),
    '',
    `Total estimado: ${formatearPrecio(total)}`,
    '',
    '¿Me confirman disponibilidad y forma de pago? Gracias!',
  ]
  return lineas.join('\n')
}

export function construirLinkWhatsapp(mensaje: string, whatsappNumero: string): string {
  return `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(mensaje)}`
}
