import { MARCAS, type EstiloMarca } from '../data/marcas'

const CLASE_POR_ESTILO: Record<EstiloMarca, string> = {
  condensada: 'font-condensed font-extrabold tracking-tight',
  italica: 'font-display italic tracking-wide',
  ancha: 'font-condensed font-bold uppercase tracking-[0.18em]',
  insignia: 'font-display uppercase tracking-wide',
}

/** Cinta de logos/wordmarks en movimiento continuo, con máscara de fade y pausa en hover. */
export function MarcasCinta() {
  const doble = [...MARCAS, ...MARCAS]

  return (
    <section className="border-y-2 border-graphite bg-kraft-deep py-10 sm:py-12">
      <p className="mx-auto max-w-6xl px-4 font-condensed text-sm font-bold uppercase tracking-[0.3em] text-graphite-soft sm:px-6">
        Trabajamos con las mejores marcas
      </p>

      <div
        className="cinta-marcas group relative mt-6 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <ul className="cinta-marcas-track flex w-max items-center gap-12 pr-12">
          {doble.map((marca, i) => (
            <li
              key={`${marca.nombre}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-graphite-soft/50 transition-colors duration-300 hover:text-tool"
            >
              {marca.estilo === 'insignia' ? (
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center border-2 border-current text-[10px] font-bold"
                >
                  {marca.nombre[0]}
                </span>
              ) : (
                <span aria-hidden="true" className="h-3 w-3 shrink-0 border-2 border-current" />
              )}
              <span className={`whitespace-nowrap text-2xl ${CLASE_POR_ESTILO[marca.estilo]}`}>
                {marca.nombre}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
