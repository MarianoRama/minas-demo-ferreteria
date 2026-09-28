import { useDatos } from '../data/contexto'
import { Revelar } from './Revelar'

function IlustracionMostrador() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md" role="img" aria-labelledby="ilustracion-mostrador-titulo">
      <title id="ilustracion-mostrador-titulo">
        Ilustración de la pared de herramientas y el mostrador del local
      </title>
      {/* Panel perforado de fondo */}
      <rect x="20" y="20" width="360" height="180" rx="6" fill="#e6d7b8" stroke="#2b2924" strokeWidth="3" />
      {Array.from({ length: 8 }).map((_, col) =>
        Array.from({ length: 4 }).map((_, row) => (
          <circle
            key={`${col}-${row}`}
            cx={48 + col * 42}
            cy={44 + row * 42}
            r="3"
            fill="#2b2924"
            opacity="0.35"
          />
        )),
      )}

      {/* Ganchos */}
      <g fill="#2b2924">
        <circle cx="70" cy="46" r="3" />
        <circle cx="150" cy="46" r="3" />
        <circle cx="230" cy="46" r="3" />
        <circle cx="310" cy="46" r="3" />
      </g>

      {/* Herramientas colgadas */}
      <g stroke="#2b2924" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Martillo */}
        <path d="M70 50v76" />
        <path d="M52 56h34l4 10-4 10H52a10 10 0 0 1 0-20Z" fill="#c9481e" stroke="#2b2924" />

        {/* Llave adjustable (ícono de herramientas de la marca) */}
        <g transform="translate(128,44) scale(1.15)">
          <path
            d="M20 6.5a6 6 0 0 0-8 8L5 21.5 10.5 27l7-7a6 6 0 0 0 8-8l-3.8 3.8-3-3L22.8 9Z"
            fill="#f4bd0e"
          />
        </g>

        {/* Destornillador */}
        <path d="M230 50v76" />
        <rect x="222" y="40" width="16" height="18" rx="3" fill="#c9481e" stroke="#2b2924" />

        {/* Cinta métrica */}
        <circle cx="310" cy="86" r="24" fill="#f4bd0e" stroke="#2b2924" />
        <path d="M310 62v-8" />
        <circle cx="310" cy="86" r="6" fill="#2b2924" stroke="none" />
      </g>

      {/* Mostrador */}
      <rect x="0" y="220" width="400" height="70" fill="#2b2924" />
      <rect x="0" y="212" width="400" height="10" fill="#c9481e" />
      <rect x="30" y="234" width="80" height="36" rx="2" fill="none" stroke="#f2e9d8" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="160" y="234" width="80" height="36" rx="2" fill="none" stroke="#f2e9d8" strokeOpacity="0.25" strokeWidth="2" />
      <rect x="290" y="234" width="80" height="36" rx="2" fill="none" stroke="#f2e9d8" strokeOpacity="0.25" strokeWidth="2" />
    </svg>
  )
}

export function AsesoramientoTecnico() {
  const { negocio } = useDatos()
  const mensaje = encodeURIComponent(
    `Hola! Quiero consultar con alguien de ${negocio.nombre} sobre qué producto necesito.`,
  )

  return (
    <section className="bg-graphite py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <Revelar>
          <IlustracionMostrador />
        </Revelar>
        <Revelar retraso={80}>
          <div>
            <h2 className="font-display text-3xl uppercase text-kraft sm:text-4xl">
              Asesoramiento técnico
            </h2>
            <p className="mt-1 font-marcador text-xl text-safety">
              No te vendemos algo que no te sirve.
            </p>
            <p className="mt-4 max-w-md text-kraft/75">
              En {negocio.nombre} te ayudamos a elegir lo que mejor se adapta a tu proyecto:
              desde el tornillo correcto hasta el equipo para una obra completa. Contanos qué
              necesitás resolver y te orientamos, sin compromiso.
            </p>
            <a
              href={`https://wa.me/${negocio.whatsappNumero}?text=${mensaje}`}
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-flecha mt-6 inline-flex min-h-[48px] items-center gap-2 border-2 border-safety bg-safety px-6 font-condensed text-base font-bold uppercase tracking-wide text-graphite transition hover:bg-safety-deep hover:border-safety-deep"
            >
              Consultá acá
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </a>
          </div>
        </Revelar>
      </div>
    </section>
  )
}
