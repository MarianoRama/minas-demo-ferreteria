type Props = {
  pagina: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
  resumen: string
}

export function Paginador({ pagina, totalPaginas, onCambiar, resumen }: Props) {
  if (totalPaginas <= 1) {
    return <p className="mt-6 text-sm text-graphite-soft">{resumen}</p>
  }

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <div className="mt-8 flex flex-col items-center gap-3 border-t-2 border-dashed border-graphite/20 pt-6">
      <p className="text-sm text-graphite-soft">{resumen}</p>
      <nav aria-label="Páginas del catálogo" className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => onCambiar(Math.max(1, pagina - 1))}
          disabled={pagina === 1}
          aria-label="Página anterior"
          className="grid h-11 w-11 place-items-center border-2 border-graphite font-bold text-graphite disabled:opacity-30"
        >
          ‹
        </button>
        {paginas.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onCambiar(n)}
            aria-current={n === pagina ? 'page' : undefined}
            className={`grid h-11 min-w-[44px] place-items-center border-2 px-2 font-mono text-sm font-semibold transition-colors ${
              n === pagina
                ? 'border-tool bg-tool text-kraft'
                : 'border-graphite-soft/40 text-graphite-soft hover:border-graphite'
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onCambiar(Math.min(totalPaginas, pagina + 1))}
          disabled={pagina === totalPaginas}
          aria-label="Página siguiente"
          className="grid h-11 w-11 place-items-center border-2 border-graphite font-bold text-graphite disabled:opacity-30"
        >
          ›
        </button>
      </nav>
    </div>
  )
}
