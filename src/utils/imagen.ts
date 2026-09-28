const LADO_MAXIMO = 1200
const CALIDAD_JPEG = 0.75

/**
 * Toma una foto elegida desde el celular o la PC, la redimensiona en el
 * cliente (máx. 1200px de lado) y la devuelve como dataURL JPEG liviano
 * para guardar en localStorage.
 */
export function redimensionarFoto(archivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!archivo.type.startsWith('image/')) {
      reject(new Error('El archivo elegido no es una imagen.'))
      return
    }

    const lector = new FileReader()
    lector.onerror = () => reject(new Error('No se pudo leer el archivo.'))
    lector.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('No se pudo leer la imagen.'))
      img.onload = () => {
        let { width, height } = img
        if (width > height && width > LADO_MAXIMO) {
          height = Math.round((height * LADO_MAXIMO) / width)
          width = LADO_MAXIMO
        } else if (height > LADO_MAXIMO) {
          width = Math.round((width * LADO_MAXIMO) / height)
          height = LADO_MAXIMO
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Este navegador no puede procesar la imagen.'))
          return
        }
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', CALIDAD_JPEG))
      }
      img.src = lector.result as string
    }
    lector.readAsDataURL(archivo)
  })
}
