/**
 * Test manual del parser de CSV (sin librería de test instalada en el repo).
 * Correr con: npx ts-node --esm scripts/test-csv.ts
 */
import { parseCSV, csvAObjetos } from '../src/utils/csv.ts'

let fallas = 0
function assert(cond: boolean, mensaje: string) {
  if (!cond) {
    fallas++
    console.error(`FALLÓ: ${mensaje}`)
  } else {
    console.log(`ok: ${mensaje}`)
  }
}

// Caso simple
assert(
  JSON.stringify(parseCSV('a,b,c\n1,2,3')) === JSON.stringify([['a', 'b', 'c'], ['1', '2', '3']]),
  'filas y columnas simples',
)

// Comillas con coma adentro
const csvComillas = 'codigo,nombre,precio\n1042,"Tornillo, autorroscante 8x1""",8'
const filas = parseCSV(csvComillas)
assert(filas[1][1] === 'Tornillo, autorroscante 8x1"', 'campo entrecomillado con coma y comillas escapadas')
assert(filas[1].length === 3, 'no se rompe la fila por la coma dentro de comillas')

// Salto de línea dentro de un campo entrecomillado
const csvMultilinea = 'nombre,detalle\n"Caño PVC","Uso en\ndesagües"'
const filasMultilinea = parseCSV(csvMultilinea)
assert(filasMultilinea.length === 2, 'un salto de línea dentro de comillas no genera una fila nueva')
assert(filasMultilinea[1][1] === 'Uso en\ndesagües', 'conserva el salto de línea dentro del campo')

// csvAObjetos con encabezado
const objetos = csvAObjetos('codigo,nombre,precio\n1042,Tornillo,8\n1078,"Bulón, con tuerca",22')
assert(objetos.length === 2, 'csvAObjetos genera un objeto por fila de datos')
assert(objetos[1].nombre === 'Bulón, con tuerca', 'csvAObjetos respeta comillas y comas por columna')

// Fila vacía al final (archivo con salto de línea final)
const filasFinal = parseCSV('a,b\n1,2\n')
assert(filasFinal.length === 2, 'ignora la fila vacía final cuando el archivo termina en salto de línea')

if (fallas > 0) {
  console.error(`\n${fallas} test(s) fallaron.`)
  process.exit(1)
}
console.log('\nTodos los tests del parser de CSV pasaron.')
