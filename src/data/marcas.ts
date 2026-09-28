// Marcas FICTICIAS (no representan productos reales) usadas solo para ambientar la demo.
// El estilo varía a propósito para que la fila se lea como logos reales y no como una lista.
export type EstiloMarca = 'condensada' | 'italica' | 'insignia' | 'ancha'

export type Marca = { nombre: string; rubro: string; estilo: EstiloMarca }

export const MARCAS: Marca[] = [
  { nombre: 'Ferromax', rubro: 'Herramientas', estilo: 'condensada' },
  { nombre: 'Voltia', rubro: 'Electricidad', estilo: 'insignia' },
  { nombre: 'Duratec', rubro: 'Pinturas', estilo: 'italica' },
  { nombre: 'Robusta', rubro: 'Bulonería', estilo: 'ancha' },
  { nombre: 'Hidropunta', rubro: 'Sanitaria', estilo: 'condensada' },
  { nombre: 'Agroverde', rubro: 'Jardín', estilo: 'italica' },
  { nombre: 'Construline', rubro: 'Construcción', estilo: 'insignia' },
  { nombre: 'Trazo Pro', rubro: 'Pinturas', estilo: 'ancha' },
]
