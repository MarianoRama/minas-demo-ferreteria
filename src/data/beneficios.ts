export type Beneficio = {
  id: string
  nombre: string
  descripcion: string
  icono: 'confianza' | 'rapidez' | 'asesoramiento' | 'marcas'
}

export const BENEFICIOS: Beneficio[] = [
  {
    id: 'b1',
    nombre: 'Confianza de barrio',
    descripcion: 'Más de 30 años atendiendo a los mismos clientes, cara a cara.',
    icono: 'confianza',
  },
  {
    id: 'b2',
    nombre: 'Atención rápida',
    descripcion: 'Resolvemos tu compra o consulta sin vueltas, en el mostrador o por WhatsApp.',
    icono: 'rapidez',
  },
  {
    id: 'b3',
    nombre: 'Asesoramiento técnico',
    descripcion: 'Te ayudamos a elegir el producto correcto para tu obra o arreglo.',
    icono: 'asesoramiento',
  },
  {
    id: 'b4',
    nombre: 'Marcas de primera',
    descripcion: 'Trabajamos con proveedores y fabricantes de referencia en cada rubro.',
    icono: 'marcas',
  },
]
