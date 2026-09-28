/** Separador visual tipo cinta métrica, entre secciones. */
export function CintaMetrica() {
  const marcas = Array.from({ length: 61 })

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="relative h-8 overflow-hidden bg-safety"
    >
      <div className="flex h-full items-end">
        {marcas.map((_, i) => {
          const esGrande = i % 10 === 0
          const esMediano = i % 5 === 0
          return (
            <div key={i} className="relative flex h-full flex-1 items-end justify-center">
              <span
                className="block w-px bg-graphite"
                style={{ height: esGrande ? '70%' : esMediano ? '48%' : '28%' }}
              />
              {esGrande && (
                <span className="absolute bottom-[72%] font-mono text-[9px] font-semibold text-graphite/70">
                  {i}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
