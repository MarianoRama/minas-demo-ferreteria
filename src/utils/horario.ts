import { DIAS_LABEL, type Rango } from '../config'

export type EstadoHorario = {
  abierto: boolean
  diaLabel: string
  horaActual: string
  mensaje: string
}

/** Devuelve fecha/hora actuales en la zona horaria de Uruguay (America/Montevideo). */
function obtenerAhoraUruguay(): { dia: number; horas: number; minutos: number; horaTexto: string } {
  const formateador = new Intl.DateTimeFormat('es-UY', {
    timeZone: 'America/Montevideo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const partes = formateador.formatToParts(new Date())
  const mapaDias: Record<string, number> = {
    dom: 0,
    lun: 1,
    mar: 2,
    mié: 3,
    mie: 3,
    jue: 4,
    vie: 5,
    sáb: 6,
    sab: 6,
  }

  let dia = new Date().getDay()
  let horas = 0
  let minutos = 0

  for (const parte of partes) {
    if (parte.type === 'weekday') {
      const clave = parte.value.toLowerCase().replace('.', '')
      if (clave in mapaDias) dia = mapaDias[clave]
    }
    if (parte.type === 'hour') horas = Number(parte.value)
    if (parte.type === 'minute') minutos = Number(parte.value)
  }

  const horaTexto = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
  return { dia, horas, minutos, horaTexto }
}

function minutosDelDia(h: number, m: number): number {
  return h * 60 + m
}

function estaEnRango(minutoActual: number, rango: Rango): boolean {
  const desde = minutosDelDia(rango.desde[0], rango.desde[1])
  const hasta = minutosDelDia(rango.hasta[0], rango.hasta[1])
  return minutoActual >= desde && minutoActual < hasta
}

export function calcularEstadoHorario(horarios: Record<number, Rango[]>): EstadoHorario {
  const { dia, horas, minutos, horaTexto } = obtenerAhoraUruguay()
  const rangosDeHoy = horarios[dia] ?? []
  const minutoActual = minutosDelDia(horas, minutos)
  const abierto = rangosDeHoy.some((rango) => estaEnRango(minutoActual, rango))

  let mensaje: string
  if (abierto) {
    const rangoActual = rangosDeHoy.find((rango) => estaEnRango(minutoActual, rango))!
    const [hh, mm] = rangoActual.hasta
    mensaje = `Cerramos hoy a las ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
  } else {
    const proximoRango = rangosDeHoy.find((rango) => minutosDelDia(rango.desde[0], rango.desde[1]) > minutoActual)
    if (proximoRango) {
      const [hh, mm] = proximoRango.desde
      mensaje = `Abrimos hoy a las ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
    } else {
      mensaje = 'Volvemos a abrir mañana'
    }
  }

  return {
    abierto,
    diaLabel: DIAS_LABEL[dia],
    horaActual: horaTexto,
    mensaje,
  }
}
