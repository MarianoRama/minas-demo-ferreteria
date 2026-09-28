export type Servicio = {
  id: string
  nombre: string
  descripcion: string
  tiempo: string
  icono: 'llave' | 'corte' | 'pintura' | 'envio'
}

export const SERVICIOS: Servicio[] = [
  {
    id: 's1',
    nombre: 'Copia de llaves',
    descripcion: 'Llaves de puerta, candado y algunos modelos de auto, mientras esperás.',
    tiempo: '5 minutos',
    icono: 'llave',
  },
  {
    id: 's2',
    nombre: 'Corte de caños y vidrio a medida',
    descripcion: 'Traé la medida (o el caño/vidrio viejo) y te lo cortamos en el momento.',
    tiempo: '10 minutos',
    icono: 'corte',
  },
  {
    id: 's3',
    nombre: 'Pintura a medida por computadora',
    descripcion: 'Elegís el color de la cartilla y lo preparamos en la base que necesites.',
    tiempo: '15 minutos',
    icono: 'pintura',
  },
  {
    id: 's4',
    nombre: 'Envíos a domicilio en Minas',
    descripcion: 'Repartimos pedidos de materiales y compras grandes dentro de la ciudad.',
    tiempo: 'Mismo día',
    icono: 'envio',
  },
]
