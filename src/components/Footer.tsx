import { AUTOR, NEGOCIO } from '../config'
import { RUBROS } from '../data/rubros'

export function Footer() {
  return (
    <footer className="bg-graphite-deep py-14 text-kraft/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg uppercase tracking-wide text-kraft">
            {NEGOCIO.nombre}
          </p>
          <p className="mt-1 font-condensed text-sm uppercase tracking-widest text-safety">
            {NEGOCIO.slogan}
          </p>
          <p className="mt-4 text-sm text-kraft/60">
            Datos de contacto ficticios, creados a modo de demostración de portafolio para
            comercios de Minas, Uruguay.
          </p>
        </div>

        <div>
          <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-kraft">
            Contacto
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-kraft/70">
            <li>WhatsApp: {NEGOCIO.whatsappDisplay} (ejemplo)</li>
            <li>Teléfono fijo: {NEGOCIO.telefonoFijo} (ejemplo)</li>
            <li>Email: {NEGOCIO.email}</li>
            <li>
              {NEGOCIO.direccion}, {NEGOCIO.ciudad}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-condensed text-sm font-bold uppercase tracking-widest text-kraft">
            Rubros
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-kraft/70">
            {RUBROS.map((rubro) => (
              <li key={rubro.id}>
                <a href="#rubros" className="hover:text-safety">
                  {rubro.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-kraft/15 px-4 pt-6 text-xs text-kraft/50 sm:px-6">
        <p>
          © {new Date().getFullYear()} {NEGOCIO.nombre} — sitio de demostración de portafolio.
          Todos los datos son ficticios.
        </p>
        <p className="mt-2">
          Sitio demo por {AUTOR.nombre} — ¿querés una página así para tu negocio?{' '}
          <a
            href={`https://wa.me/${AUTOR.whatsapp}?text=${encodeURIComponent(
              `Hola ${AUTOR.nombre}! Vi la demo de ${NEGOCIO.nombre} y quería consultarte por una web para mi negocio.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-safety underline underline-offset-2 hover:text-kraft"
          >
            Escribime
          </a>{' '}
          — {AUTOR.texto}.
        </p>
      </div>
    </footer>
  )
}
