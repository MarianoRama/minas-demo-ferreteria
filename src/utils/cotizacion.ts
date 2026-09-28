export type DatosCotizacion = {
  nombre: string
  telefono: string
  email: string
  empresa: string
  asunto: string
  mensaje: string
  nombreArchivo: string
}

export function construirMensajeCotizacion(datos: DatosCotizacion, nombreNegocio: string): string {
  const lineas = [
    `Hola! Quiero solicitar una cotización en ${nombreNegocio}.`,
    '',
    `Nombre: ${datos.nombre}`,
    `Teléfono: ${datos.telefono}`,
  ]
  if (datos.email.trim()) lineas.push(`Email: ${datos.email}`)
  if (datos.empresa.trim()) lineas.push(`Empresa: ${datos.empresa}`)
  lineas.push(`Asunto: ${datos.asunto}`, '', `Mensaje: ${datos.mensaje}`)
  if (datos.nombreArchivo.trim()) {
    lineas.push('', `(Adjunto "${datos.nombreArchivo}", se los mando aparte por este mismo chat)`)
  }
  return lineas.join('\n')
}
