export type RubroId =
  | 'bulonera'
  | 'electricidad'
  | 'sanitaria'
  | 'pinturas'
  | 'herramientas'
  | 'jardin'
  | 'construccion'

export type Rubro = {
  id: RubroId
  numero: string
  nombre: string
  descripcion: string
  detalle: string
}

export const RUBROS: Rubro[] = [
  {
    id: 'bulonera',
    numero: '01',
    nombre: 'Bulonería',
    descripcion: 'Tornillos, tuercas, arandelas y bulones sueltos o por caja.',
    detalle: 'Métrica y en pulgadas. Vendemos por unidad, no hace falta llevar la caja entera.',
  },
  {
    id: 'electricidad',
    numero: '02',
    nombre: 'Electricidad',
    descripcion: 'Cables, llaves térmicas, tomas, iluminación LED.',
    detalle: 'Asesoramos sobre calibre de cable y protección para tu instalación.',
  },
  {
    id: 'sanitaria',
    numero: '03',
    nombre: 'Sanitaria',
    descripcion: 'Caños, canillas, flexibles y conexiones para agua y desagüe.',
    detalle: 'PVC, termofusión y accesorios de bronce. Cortamos caño a medida en el local.',
  },
  {
    id: 'pinturas',
    numero: '04',
    nombre: 'Pinturas',
    descripcion: 'Látex, esmalte sintético, impermeabilizantes y accesorios.',
    detalle: 'Preparación de color por computadora sobre la base que elijas.',
  },
  {
    id: 'herramientas',
    numero: '05',
    nombre: 'Herramientas',
    descripcion: 'Manuales y eléctricas, para la casa y para el oficio.',
    detalle: 'Reparamos mangos y afilamos herramientas de corte simples.',
  },
  {
    id: 'jardin',
    numero: '06',
    nombre: 'Jardín',
    descripcion: 'Mangueras, tijeras de podar, tierra, macetas y riego.',
    detalle: 'Todo para el patio, la huerta y las plantas de interior.',
  },
  {
    id: 'construccion',
    numero: '07',
    nombre: 'Construcción',
    descripcion: 'Cemento, cal, arena, ladrillos y bolsas de contrapiso.',
    detalle: 'Entregamos a domicilio en Minas los pedidos de materiales pesados.',
  },
]
