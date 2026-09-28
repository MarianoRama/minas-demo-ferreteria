import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AUTOR, FUENTE_DATOS, HORARIOS, NEGOCIO } from '../config'
import { csvAObjetos } from '../utils/csv'
import { PRODUCTOS_EJEMPLO, type Producto } from './productos'
import { Contexto, type DatosContexto, type NegocioDatos } from './contexto'

/** Nombre corto del repo, usado como prefijo de la clave de localStorage. */
const CLAVE_STORAGE = 'ferreteria.datos.v1'

type DatosGuardados = {
  v: 1
  productos: Producto[]
  negocio: NegocioDatos
}

function negocioPorDefecto(): NegocioDatos {
  const { avisoHome, ...resto } = NEGOCIO
  return { ...resto, avisoHome, horarios: HORARIOS }
}

function idNuevo(): string {
  return `p${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`
}

function cargarDeStorage(): DatosGuardados | null {
  try {
    const crudo = window.localStorage.getItem(CLAVE_STORAGE)
    if (!crudo) return null
    const parseado = JSON.parse(crudo)
    if (!parseado || parseado.v !== 1 || !Array.isArray(parseado.productos) || !parseado.negocio) {
      return null
    }
    return parseado as DatosGuardados
  } catch {
    return null
  }
}

function guardarEnStorage(datos: DatosGuardados): string | null {
  try {
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datos))
    return null
  } catch {
    return 'No se pudieron guardar los cambios en este navegador (¿quedó sin espacio o el modo privado lo bloquea?). Probá con una foto más liviana o borrando algún producto viejo.'
  }
}

/** Convierte una fila de la planilla de Sheets en un Producto. Ver README. */
function filaSheetsAProducto(fila: Record<string, string>, i: number): Producto | null {
  const nombre = fila.nombre?.trim()
  if (!nombre) return null
  const precio = Number(fila.precio?.replace(',', '.')) || 0
  const precioAnteriorTexto = fila.precioAnterior?.trim()
  const esVerdadero = (v: string | undefined) => ['si', 'sí', 'true', '1', 'x'].includes((v ?? '').trim().toLowerCase())
  return {
    id: fila.codigo?.trim() || `sheet-${i}`,
    codigo: fila.codigo?.trim() || String(i + 1),
    nombre,
    rubro: (fila.rubro?.trim() as Producto['rubro']) || 'herramientas',
    unidad: fila.unidad?.trim() || 'unidad',
    precio,
    stock: fila.stock === undefined || fila.stock === '' ? true : esVerdadero(fila.stock),
    oferta: esVerdadero(fila.oferta),
    precioAnterior: precioAnteriorTexto ? Number(precioAnteriorTexto.replace(',', '.')) : undefined,
    destacado: esVerdadero(fila.destacado),
    activo: fila.activo === undefined || fila.activo === '' ? true : esVerdadero(fila.activo),
    foto: fila.foto?.trim() || undefined,
  }
}

export function DatosProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>(() => cargarDeStorage()?.productos ?? PRODUCTOS_EJEMPLO)
  const [negocio, setNegocio] = useState<NegocioDatos>(() => cargarDeStorage()?.negocio ?? negocioPorDefecto())
  const [errorAlmacenamiento, setErrorAlmacenamiento] = useState<string | null>(null)
  const [cargandoSheets, setCargandoSheets] = useState(FUENTE_DATOS.tipo === 'sheets')
  const [errorSheets, setErrorSheets] = useState<string | null>(null)

  // Fuente Sheets (opcional): reemplaza el catálogo por el de la planilla
  // publicada como CSV. Si falla, se queda con los datos locales/ejemplo.
  // (Sincroniza con un sistema externo: es un uso correcto de efecto.)
  useEffect(() => {
    if (FUENTE_DATOS.tipo !== 'sheets') return
    let cancelado = false
    fetch(FUENTE_DATOS.csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`La planilla respondió ${res.status}`)
        return res.text()
      })
      .then((texto) => {
        if (cancelado) return
        const filas = csvAObjetos(texto)
        const productosSheet = filas
          .map((fila, i) => filaSheetsAProducto(fila, i))
          .filter((p): p is Producto => p !== null)
        if (productosSheet.length === 0) throw new Error('La planilla no tiene filas válidas')
        setProductos(productosSheet)
      })
      .catch((err) => {
        if (cancelado) return
        setErrorSheets(
          `No se pudo leer la planilla (${err instanceof Error ? err.message : 'error desconocido'}). Mostrando el catálogo de ejemplo mientras tanto.`,
        )
      })
      .finally(() => {
        if (!cancelado) setCargandoSheets(false)
      })
    return () => {
      cancelado = true
    }
  }, [])

  // Persistencia en localStorage (solo cuando la fuente es local): sincroniza
  // React con un sistema externo (el navegador), uso correcto de efecto.
  useEffect(() => {
    if (FUENTE_DATOS.tipo !== 'local') return
    // oxlint-disable-next-line react/set-state-in-effect -- persistir en localStorage es, en sí, la sincronización con el sistema externo.
    setErrorAlmacenamiento(guardarEnStorage({ v: 1, productos, negocio }))
  }, [productos, negocio])

  const crearProducto = useCallback((datos: Omit<Producto, 'id'>) => {
    const nuevo: Producto = { ...datos, id: idNuevo() }
    setProductos((actuales) => [nuevo, ...actuales])
    return nuevo
  }, [])

  const actualizarProducto = useCallback((id: string, cambios: Partial<Producto>) => {
    setProductos((actuales) => actuales.map((p) => (p.id === id ? { ...p, ...cambios } : p)))
  }, [])

  const eliminarProducto = useCallback((id: string) => {
    setProductos((actuales) => actuales.filter((p) => p.id !== id))
  }, [])

  const duplicarProducto = useCallback((id: string) => {
    setProductos((actuales) => {
      const original = actuales.find((p) => p.id === id)
      if (!original) return actuales
      const copia: Producto = { ...original, id: idNuevo(), nombre: `${original.nombre} (copia)` }
      const indice = actuales.findIndex((p) => p.id === id)
      const nuevos = [...actuales]
      nuevos.splice(indice + 1, 0, copia)
      return nuevos
    })
  }, [])

  const actualizarNegocio = useCallback((cambios: Partial<NegocioDatos>) => {
    setNegocio((actual) => ({ ...actual, ...cambios }))
  }, [])

  const restaurarEjemplo = useCallback(() => {
    setProductos(PRODUCTOS_EJEMPLO)
    setNegocio(negocioPorDefecto())
    try {
      window.localStorage.removeItem(CLAVE_STORAGE)
    } catch {
      // si falla el remove, igual quedamos con los datos de ejemplo en memoria
    }
  }, [])

  const exportarJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify({ v: 1, productos, negocio }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ferreteria-datos-${new Date().toISOString().slice(0, 10)}.json`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }, [productos, negocio])

  const importarJSON = useCallback(async (archivo: File) => {
    const texto = await archivo.text()
    const parseado = JSON.parse(texto)
    if (!parseado || !Array.isArray(parseado.productos) || !parseado.negocio) {
      throw new Error('El archivo no tiene el formato esperado (productos + negocio).')
    }
    setProductos(parseado.productos)
    setNegocio({ ...negocioPorDefecto(), ...parseado.negocio })
  }, [])

  const valor = useMemo<DatosContexto>(
    () => ({
      productos,
      negocio,
      autor: AUTOR,
      fuente: FUENTE_DATOS.tipo,
      csvUrlSheets: FUENTE_DATOS.tipo === 'sheets' ? FUENTE_DATOS.csvUrl : null,
      cargandoSheets,
      errorSheets,
      errorAlmacenamiento,
      crearProducto,
      actualizarProducto,
      eliminarProducto,
      duplicarProducto,
      actualizarNegocio,
      restaurarEjemplo,
      exportarJSON,
      importarJSON,
    }),
    [
      productos,
      negocio,
      cargandoSheets,
      errorSheets,
      errorAlmacenamiento,
      crearProducto,
      actualizarProducto,
      eliminarProducto,
      duplicarProducto,
      actualizarNegocio,
      restaurarEjemplo,
      exportarJSON,
      importarJSON,
    ],
  )

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>
}
