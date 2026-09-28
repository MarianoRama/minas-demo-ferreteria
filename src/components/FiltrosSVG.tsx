/**
 * Filtros SVG compartidos (sin archivos externos): usados por el sello de
 * goma "OFERTA" para que la tinta se vea gastada, no vectorial perfecta.
 * Se renderiza una sola vez, oculto, y los estilos lo referencian por id.
 */
export function FiltrosSVG() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="textura-sello">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="ruido" />
          <feDisplacementMap in="SourceGraphic" in2="ruido" scale="2.4" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" />
        </filter>
      </defs>
    </svg>
  )
}
