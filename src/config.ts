/**
 * Datos del negocio — FICTICIO, sitio de demostración de portafolio.
 * Cambiá acá nombre, dirección, teléfonos y horarios para adaptar la demo.
 */

export const NEGOCIO = {
  nombre: 'Ferretería El Tornillo',
  slogan: 'Lo que hace falta, cuando hace falta',
  direccion: 'Treinta y Tres 645, esq. Rodó',
  ciudad: 'Minas, Lavalleja',
  referencia: 'A tres cuadras de Plaza Libertad',
  telefonoFijo: '4442 3311',
  whatsappDisplay: '+598 99 000 000',
  whatsappNumero: '59899000000', // número de EJEMPLO, no real
  email: 'contacto@eltornillo-demo.uy',
  mapsQuery: 'Minas,+Lavalleja,+Uruguay',
  anioFundacion: 1994,
  instagram: '@eltornillo.minas',
}

// Horario de atención. Días: 0 = domingo ... 6 = sábado (coincide con Date#getDay).
// Cada rango es [horaInicio, minutoInicio, horaFin, minutoFin] en hora de Uruguay.
export type Rango = { desde: [number, number]; hasta: [number, number] }
export const HORARIOS: Record<number, Rango[]> = {
  0: [], // domingo: cerrado
  1: [
    { desde: [8, 0], hasta: [12, 30] },
    { desde: [14, 30], hasta: [19, 0] },
  ],
  2: [
    { desde: [8, 0], hasta: [12, 30] },
    { desde: [14, 30], hasta: [19, 0] },
  ],
  3: [
    { desde: [8, 0], hasta: [12, 30] },
    { desde: [14, 30], hasta: [19, 0] },
  ],
  4: [
    { desde: [8, 0], hasta: [12, 30] },
    { desde: [14, 30], hasta: [19, 0] },
  ],
  5: [
    { desde: [8, 0], hasta: [12, 30] },
    { desde: [14, 30], hasta: [19, 0] },
  ],
  6: [{ desde: [8, 30], hasta: [13, 0] }],
}

export const DIAS_LABEL = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
]

export const AUTOR = {
  nombre: 'Mariano Rama',
  whatsapp: '59899000000',
  texto: 'Diseño y desarrollo web en Minas',
}
