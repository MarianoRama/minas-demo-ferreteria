export type Oferta = {
  id: string
  nombre: string
  rubro: string
  precioAntes: number
  precioAhora: number
  unidad: string
  vigencia: string
  foto?: string
}

// "Ofertas de la semana" — precios de ejemplo, en pesos uruguayos.
export const OFERTAS: Oferta[] = [
  {
    id: 'o1',
    nombre: 'Látex exterior blanco 20L',
    rubro: 'Pinturas',
    precioAntes: 6800,
    precioAhora: 5490,
    unidad: 'balde',
    vigencia: 'Válida hasta el sábado',
  },
  {
    id: 'o2',
    nombre: 'Amoladora angular 4 1/2"',
    rubro: 'Herramientas',
    precioAntes: 3290,
    precioAhora: 2650,
    unidad: 'unidad',
    vigencia: 'Válida hasta agotar stock',
  },
  {
    id: 'o3',
    nombre: 'Set de mangueras + rociador',
    rubro: 'Jardín',
    precioAntes: 1990,
    precioAhora: 1490,
    unidad: 'set',
    vigencia: 'Válida hasta el sábado',
  },
  {
    id: 'o4',
    nombre: 'Bolsón de arena fina 0.5m³',
    rubro: 'Construcción',
    precioAntes: 1450,
    precioAhora: 1190,
    unidad: 'bolsón',
    vigencia: 'Con envío incluido en Minas',
  },
]
