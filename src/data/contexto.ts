import { createContext, useContext } from 'react'
import type { AUTOR, Rango } from '../config'
import type { Producto } from './productos'

export type NegocioDatos = {
  nombre: string
  slogan: string
  direccion: string
  ciudad: string
  referencia: string
  telefonoFijo: string
  whatsappDisplay: string
  whatsappNumero: string
  email: string
  mapsQuery: string
  anioFundacion: number
  instagram: string
  avisoHome: string
  horarios: Record<number, Rango[]>
}

export type DatosContexto = {
  productos: Producto[]
  negocio: NegocioDatos
  autor: typeof AUTOR
  fuente: 'local' | 'sheets'
  csvUrlSheets: string | null
  cargandoSheets: boolean
  errorSheets: string | null
  errorAlmacenamiento: string | null
  crearProducto: (datos: Omit<Producto, 'id'>) => Producto
  actualizarProducto: (id: string, cambios: Partial<Producto>) => void
  eliminarProducto: (id: string) => void
  duplicarProducto: (id: string) => void
  actualizarNegocio: (cambios: Partial<NegocioDatos>) => void
  restaurarEjemplo: () => void
  exportarJSON: () => void
  importarJSON: (archivo: File) => Promise<void>
}

export const Contexto = createContext<DatosContexto | null>(null)

export function useDatos(): DatosContexto {
  const ctx = useContext(Contexto)
  if (!ctx) throw new Error('useDatos() tiene que usarse dentro de <DatosProvider>')
  return ctx
}
