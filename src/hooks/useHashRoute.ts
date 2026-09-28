import { useEffect, useState } from 'react'

function leerRuta(): string {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return '/'
  return hash.slice(1) || '/'
}

/**
 * Ruteo mínimo por hash (funciona en GitHub Pages sin configurar el
 * servidor). Alcanza con esto para separar el sitio público de #/admin,
 * sin sumar una librería de router.
 */
export function useHashRoute(): [string, (ruta: string) => void] {
  const [ruta, setRuta] = useState(leerRuta)

  useEffect(() => {
    function alCambiar() {
      setRuta(leerRuta())
    }
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  function navegar(nuevaRuta: string) {
    window.location.hash = `#${nuevaRuta}`
  }

  return [ruta, navegar]
}
