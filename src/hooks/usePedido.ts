import { useCallback, useEffect, useState } from 'react'
import type { Producto } from '../data/productos'

const STORAGE_KEY = 'el-tornillo-pedido'

export type Pedido = Record<string, number> // id de producto -> cantidad

function cargarPedidoGuardado(): Pedido {
  try {
    const crudo = window.localStorage.getItem(STORAGE_KEY)
    if (!crudo) return {}
    const parseado = JSON.parse(crudo)
    if (typeof parseado !== 'object' || parseado === null) return {}
    const limpio: Pedido = {}
    for (const [id, cantidad] of Object.entries(parseado)) {
      if (typeof cantidad === 'number' && cantidad > 0) {
        limpio[id] = cantidad
      }
    }
    return limpio
  } catch {
    return {}
  }
}

function guardarPedido(pedido: Pedido) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pedido))
  } catch {
    // localStorage no disponible (modo privado, cuotas, etc.), seguimos sin persistir.
  }
}

export function usePedido(productos: Producto[]) {
  const [pedido, setPedido] = useState<Pedido>(() => cargarPedidoGuardado())

  useEffect(() => {
    guardarPedido(pedido)
  }, [pedido])

  const sumar = useCallback((id: string) => {
    setPedido((actual) => ({ ...actual, [id]: (actual[id] ?? 0) + 1 }))
  }, [])

  const restar = useCallback((id: string) => {
    setPedido((actual) => {
      const cantidad = (actual[id] ?? 0) - 1
      const copia = { ...actual }
      if (cantidad <= 0) {
        delete copia[id]
      } else {
        copia[id] = cantidad
      }
      return copia
    })
  }, [])

  const quitar = useCallback((id: string) => {
    setPedido((actual) => {
      const copia = { ...actual }
      delete copia[id]
      return copia
    })
  }, [])

  const vaciar = useCallback(() => setPedido({}), [])

  const items = Object.entries(pedido)
    .map(([id, cantidad]) => {
      const producto = productos.find((p) => p.id === id)
      return producto ? { producto, cantidad } : null
    })
    .filter((item): item is { producto: Producto; cantidad: number } => item !== null)

  const total = items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0)
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0)

  return { pedido, items, total, cantidadTotal, sumar, restar, quitar, vaciar }
}
