import type { RubroId } from './rubros'

export type Producto = {
  id: string
  codigo: string
  nombre: string
  rubro: RubroId
  unidad: string
  precio: number
  /** Si hay unidades en el local ahora mismo. */
  stock: boolean
  /** Si está en la mesa de ofertas de la semana. */
  oferta: boolean
  /** Precio de lista antes de la rebaja (solo si oferta = true). */
  precioAnterior?: number
  /** Si se destaca arriba de todo en el catálogo. */
  destacado: boolean
  /** Si aparece en el sitio público. Un producto pausado sigue en el panel pero no se muestra. */
  activo: boolean
  /** Foto tomada por el dueño desde el panel (dataURL) o cargada a mano. */
  foto?: string
}

export function formatearPrecio(valor: number): string {
  return valor.toLocaleString('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 })
}

// Catálogo de ejemplo para la demo, en pesos uruguayos. Repartido en los
// siete rubros del local para que el paginado y los filtros tengan sentido.
export const PRODUCTOS_EJEMPLO: Producto[] = [
  // Bulonería
  { id: 'p01', codigo: '1042', nombre: 'Tornillo autorroscante 8x1"', rubro: 'bulonera', unidad: 'unidad', precio: 8, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p02', codigo: '1078', nombre: 'Bulón M8 con tuerca', rubro: 'bulonera', unidad: 'unidad', precio: 22, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p03', codigo: '1091', nombre: 'Arandela plana 8mm (bolsa x50)', rubro: 'bulonera', unidad: 'bolsa', precio: 190, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p04', codigo: '1103', nombre: 'Tarugo con tornillo 6mm (x20)', rubro: 'bulonera', unidad: 'blister', precio: 145, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p05', codigo: '1120', nombre: 'Bulón carrocero 5/16 x 2"', rubro: 'bulonera', unidad: 'unidad', precio: 35, stock: false, oferta: false, destacado: false, activo: true },
  { id: 'p06', codigo: '1134', nombre: 'Remache pop 4.8mm (x100)', rubro: 'bulonera', unidad: 'caja', precio: 620, stock: true, oferta: false, destacado: false, activo: true },

  // Electricidad
  { id: 'p07', codigo: '2205', nombre: 'Cable unipolar 2.5mm (rollo x100m)', rubro: 'electricidad', unidad: 'rollo', precio: 3450, stock: true, oferta: false, destacado: true, activo: true },
  { id: 'p08', codigo: '2231', nombre: 'Llave térmica 20A', rubro: 'electricidad', unidad: 'unidad', precio: 690, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p09', codigo: '2244', nombre: 'Tomacorriente doble con tapa', rubro: 'electricidad', unidad: 'unidad', precio: 410, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p10', codigo: '2260', nombre: 'Lámpara LED 9W luz cálida', rubro: 'electricidad', unidad: 'unidad', precio: 250, stock: true, oferta: true, precioAnterior: 340, destacado: false, activo: true },
  { id: 'p11', codigo: '2278', nombre: 'Cinta aisladora 3M (x3 rollos)', rubro: 'electricidad', unidad: 'pack', precio: 380, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p12', codigo: '2290', nombre: 'Zapatilla eléctrica 4 bocas', rubro: 'electricidad', unidad: 'unidad', precio: 590, stock: false, oferta: false, destacado: false, activo: true },

  // Sanitaria
  { id: 'p13', codigo: '3110', nombre: 'Caño PVC 110mm x 3m', rubro: 'sanitaria', unidad: 'unidad', precio: 1280, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p14', codigo: '3144', nombre: 'Canilla de cocina cromada', rubro: 'sanitaria', unidad: 'unidad', precio: 1890, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p15', codigo: '3162', nombre: 'Flexible de agua 40cm', rubro: 'sanitaria', unidad: 'unidad', precio: 320, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p16', codigo: '3178', nombre: 'Pegamento para PVC 250ml', rubro: 'sanitaria', unidad: 'pomo', precio: 480, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p17', codigo: '3195', nombre: 'Mochila de inodoro completa', rubro: 'sanitaria', unidad: 'unidad', precio: 3200, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p18', codigo: '3201', nombre: 'Cinta de teflón (x3 rollos)', rubro: 'sanitaria', unidad: 'pack', precio: 160, stock: true, oferta: false, destacado: false, activo: true },

  // Pinturas
  { id: 'p19', codigo: '4020', nombre: 'Látex interior blanco 20L', rubro: 'pinturas', unidad: 'balde', precio: 5200, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p20', codigo: '4041', nombre: 'Látex exterior blanco 20L', rubro: 'pinturas', unidad: 'balde', precio: 5490, stock: true, oferta: true, precioAnterior: 6800, destacado: true, activo: true },
  { id: 'p21', codigo: '4055', nombre: 'Esmalte sintético 1L (a elección)', rubro: 'pinturas', unidad: 'lata', precio: 980, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p22', codigo: '4067', nombre: 'Impermeabilizante para techo 10L', rubro: 'pinturas', unidad: 'balde', precio: 4100, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p23', codigo: '4082', nombre: 'Fijador al agua 4L', rubro: 'pinturas', unidad: 'balde', precio: 1450, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p24', codigo: '4098', nombre: 'Set de pinceles x5', rubro: 'pinturas', unidad: 'set', precio: 590, stock: false, oferta: false, destacado: false, activo: true },

  // Herramientas
  { id: 'p25', codigo: '5015', nombre: 'Taladro percutor 1/2"', rubro: 'herramientas', unidad: 'unidad', precio: 4390, stock: true, oferta: false, destacado: true, activo: true },
  { id: 'p26', codigo: '5029', nombre: 'Amoladora angular 4 1/2"', rubro: 'herramientas', unidad: 'unidad', precio: 2650, stock: true, oferta: true, precioAnterior: 3290, destacado: false, activo: true },
  { id: 'p27', codigo: '5088', nombre: 'Juego de destornilladores x6', rubro: 'herramientas', unidad: 'set', precio: 890, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p28', codigo: '5102', nombre: 'Martillo carpintero 20oz', rubro: 'herramientas', unidad: 'unidad', precio: 780, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p29', codigo: '5119', nombre: 'Cinta métrica 5m', rubro: 'herramientas', unidad: 'unidad', precio: 340, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p30', codigo: '5133', nombre: 'Nivel de burbuja 60cm', rubro: 'herramientas', unidad: 'unidad', precio: 650, stock: true, oferta: false, destacado: false, activo: true },

  // Jardín
  { id: 'p31', codigo: '6032', nombre: 'Manguera 1/2" x 15m con accesorios', rubro: 'jardin', unidad: 'unidad', precio: 1450, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p32', codigo: '6061', nombre: 'Tijera de podar profesional', rubro: 'jardin', unidad: 'unidad', precio: 1190, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p33', codigo: '6074', nombre: 'Set de mangueras + rociador', rubro: 'jardin', unidad: 'set', precio: 1490, stock: true, oferta: true, precioAnterior: 1990, destacado: false, activo: true },
  { id: 'p34', codigo: '6090', nombre: 'Tierra abonada 20L', rubro: 'jardin', unidad: 'bolsa', precio: 290, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p35', codigo: '6103', nombre: 'Maceta de plástico Nº20', rubro: 'jardin', unidad: 'unidad', precio: 220, stock: true, oferta: false, destacado: false, activo: true },

  // Construcción
  { id: 'p36', codigo: '7008', nombre: 'Bolsa de portland 25kg', rubro: 'construccion', unidad: 'bolsa', precio: 610, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p37', codigo: '7044', nombre: 'Bolsa de cal hidratada 25kg', rubro: 'construccion', unidad: 'bolsa', precio: 340, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p38', codigo: '7061', nombre: 'Bolsón de arena fina 0.5m³', rubro: 'construccion', unidad: 'bolsón', precio: 1190, stock: true, oferta: true, precioAnterior: 1450, destacado: false, activo: true },
  { id: 'p39', codigo: '7079', nombre: 'Ladrillo hueco 8x18x33 (unidad)', rubro: 'construccion', unidad: 'unidad', precio: 42, stock: true, oferta: false, destacado: false, activo: true },
  { id: 'p40', codigo: '7091', nombre: 'Malla para revoque 1x25m', rubro: 'construccion', unidad: 'rollo', precio: 1180, stock: false, oferta: false, destacado: false, activo: true },
]
