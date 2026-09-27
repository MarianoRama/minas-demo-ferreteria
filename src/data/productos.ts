import type { RubroId } from './rubros'

export type Producto = {
  id: string
  codigo: string
  nombre: string
  rubro: RubroId
  unidad: string
  precio: number
  foto?: string
}

// Lista corta para "Armá tu pedido". Precios de ejemplo, en pesos uruguayos.
export const PRODUCTOS: Producto[] = [
  { id: 'p01', codigo: '1042', nombre: 'Tornillo autorroscante 8x1"', rubro: 'bulonera', unidad: 'unidad', precio: 8 },
  { id: 'p02', codigo: '1078', nombre: 'Bulón M8 con tuerca', rubro: 'bulonera', unidad: 'unidad', precio: 22 },
  { id: 'p03', codigo: '2205', nombre: 'Cable unipolar 2.5mm (rollo x100m)', rubro: 'electricidad', unidad: 'rollo', precio: 3450 },
  { id: 'p04', codigo: '2231', nombre: 'Llave térmica 20A', rubro: 'electricidad', unidad: 'unidad', precio: 690 },
  { id: 'p05', codigo: '3110', nombre: 'Caño PVC 110mm x 3m', rubro: 'sanitaria', unidad: 'unidad', precio: 1280 },
  { id: 'p06', codigo: '3144', nombre: 'Canilla de cocina cromada', rubro: 'sanitaria', unidad: 'unidad', precio: 1890 },
  { id: 'p07', codigo: '4020', nombre: 'Látex interior blanco 20L', rubro: 'pinturas', unidad: 'balde', precio: 5200 },
  { id: 'p08', codigo: '4055', nombre: 'Esmalte sintético 1L (a elección)', rubro: 'pinturas', unidad: 'lata', precio: 980 },
  { id: 'p09', codigo: '5015', nombre: 'Taladro percutor 1/2"', rubro: 'herramientas', unidad: 'unidad', precio: 4390 },
  { id: 'p10', codigo: '5088', nombre: 'Juego de destornilladores x6', rubro: 'herramientas', unidad: 'set', precio: 890 },
  { id: 'p11', codigo: '6032', nombre: 'Manguera 1/2" x 15m con accesorios', rubro: 'jardin', unidad: 'unidad', precio: 1450 },
  { id: 'p12', codigo: '6061', nombre: 'Tijera de podar profesional', rubro: 'jardin', unidad: 'unidad', precio: 1190 },
  { id: 'p13', codigo: '7008', nombre: 'Bolsa de portland 25kg', rubro: 'construccion', unidad: 'bolsa', precio: 610 },
  { id: 'p14', codigo: '7044', nombre: 'Bolsa de cal hidratada 25kg', rubro: 'construccion', unidad: 'bolsa', precio: 340 },
]

export function formatearPrecio(valor: number): string {
  return valor.toLocaleString('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 })
}
