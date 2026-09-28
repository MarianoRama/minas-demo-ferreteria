/**
 * Parser de CSV chico y sin dependencias, para leer la planilla de Google
 * Sheets publicada como CSV (fuente de datos opcional, ver config.ts).
 * Soporta comillas dobles (con comillas escapadas "") y comas o saltos de
 * línea dentro de un campo entrecomillado. Devuelve una matriz de filas.
 */
export function parseCSV(texto: string): string[][] {
  const filas: string[][] = []
  let fila: string[] = []
  let campo = ''
  let entreComillas = false
  const texto2 = texto.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  for (let i = 0; i < texto2.length; i++) {
    const char = texto2[i]

    if (entreComillas) {
      if (char === '"') {
        if (texto2[i + 1] === '"') {
          campo += '"'
          i++
        } else {
          entreComillas = false
        }
      } else {
        campo += char
      }
      continue
    }

    if (char === '"') {
      entreComillas = true
    } else if (char === ',') {
      fila.push(campo)
      campo = ''
    } else if (char === '\n') {
      fila.push(campo)
      filas.push(fila)
      fila = []
      campo = ''
    } else {
      campo += char
    }
  }

  // Última celda/fila si el archivo no termina con salto de línea.
  if (campo.length > 0 || fila.length > 0) {
    fila.push(campo)
    filas.push(fila)
  }

  return filas.filter((f) => !(f.length === 1 && f[0].trim() === ''))
}

/** Convierte las filas de un CSV con encabezado en objetos {columna: valor}. */
export function csvAObjetos(texto: string): Record<string, string>[] {
  const filas = parseCSV(texto)
  if (filas.length === 0) return []
  const encabezados = filas[0].map((h) => h.trim())
  return filas.slice(1).map((fila) => {
    const obj: Record<string, string> = {}
    encabezados.forEach((h, i) => {
      obj[h] = (fila[i] ?? '').trim()
    })
    return obj
  })
}
