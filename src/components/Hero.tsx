import { NEGOCIO } from '../config'
import { formatearPrecio } from '../data/productos'

const ITEMS_TICKET = [
  { codigo: '1042', nombre: 'TORNILLO AUTORROSC. 8x1"', cant: 12, precio: 8 },
  { codigo: '5015', nombre: 'TALADRO PERCUTOR 1/2"', cant: 1, precio: 4390 },
  { codigo: '4055', nombre: 'ESMALTE SINTÉTICO 1L', cant: 2, precio: 980 },
]
const TOTAL_TICKET = ITEMS_TICKET.reduce((acc, it) => acc + it.cant * it.precio, 0)

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-graphite">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f2e9d8 1px, transparent 1px), linear-gradient(to bottom, #f2e9d8 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-24">
        <div>
          <p className="font-condensed text-sm font-bold uppercase tracking-[0.3em] text-safety">
            Ferretería de barrio · {NEGOCIO.ciudad}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,4.75rem)] leading-[0.95] uppercase text-kraft">
            Todo para tu obra,
            <br />
            <span className="text-safety">sin vueltas.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-kraft/80">
            Bulonería, electricidad, sanitaria, pinturas, herramientas, jardín y construcción.
            Armamos tu pedido y te lo confirmamos por WhatsApp, como el vecino que sabe lo que
            necesitás.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#pedido"
              className="inline-flex min-h-[48px] items-center justify-center border-2 border-safety bg-safety px-6 font-condensed text-base font-bold uppercase tracking-wide text-graphite transition hover:bg-safety-deep hover:border-safety-deep"
            >
              Armá tu pedido
            </a>
            <a
              href="#horarios"
              className="inline-flex min-h-[48px] items-center justify-center border-2 border-kraft/40 px-6 font-condensed text-base font-bold uppercase tracking-wide text-kraft transition hover:border-kraft"
            >
              Cómo llegar
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-kraft/20 pt-6 sm:max-w-md">
            <div>
              <dt className="font-condensed text-xs uppercase tracking-widest text-kraft/50">Rubros</dt>
              <dd className="font-mono text-2xl font-semibold text-safety">07</dd>
            </div>
            <div>
              <dt className="font-condensed text-xs uppercase tracking-widest text-kraft/50">En el barrio</dt>
              <dd className="font-mono text-2xl font-semibold text-safety">30+ años</dd>
            </div>
            <div>
              <dt className="font-condensed text-xs uppercase tracking-widest text-kraft/50">Envíos</dt>
              <dd className="font-mono text-2xl font-semibold text-safety">En Minas</dd>
            </div>
          </dl>
        </div>

        <div className="mx-auto w-full max-w-xs -rotate-2 lg:rotate-2 lg:justify-self-end">
          <div className="bg-kraft p-5 pb-8 text-ink shadow-[10px_10px_0_rgba(0,0,0,0.35)]">
            <div className="border-b-2 border-dashed border-graphite/40 pb-3 text-center">
              <p className="font-display text-sm uppercase tracking-widest">{NEGOCIO.nombre}</p>
              <p className="font-mono text-[11px] text-graphite-soft">Remito de ejemplo Nº 00042</p>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-[11px]">
              {ITEMS_TICKET.map((it) => (
                <li key={it.codigo} className="flex justify-between gap-2">
                  <span className="truncate">
                    {it.cant}x {it.nombre}
                  </span>
                  <span className="shrink-0">{formatearPrecio(it.cant * it.precio)}</span>
                </li>
              ))}
            </ul>
            <div className="linea-perforada my-3" />
            <div className="flex justify-between font-mono text-sm font-bold">
              <span>TOTAL</span>
              <span>{formatearPrecio(TOTAL_TICKET)}</span>
            </div>
            <p className="mt-4 text-center font-condensed text-[10px] uppercase tracking-widest text-graphite-soft">
              Gracias por elegirnos — pedido de ejemplo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
