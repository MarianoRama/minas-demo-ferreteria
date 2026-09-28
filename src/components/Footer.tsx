import { useDatos } from '../data/contexto'
import { RUBROS } from '../data/rubros'

export function Footer() {
  const { negocio, autor } = useDatos()
  return (
    <footer className="bg-graphite-deep py-14 text-kraft/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg uppercase tracking-wide text-kraft">
            {negocio.nombre}
          </p>
          <p className="mt-1 font-condensed text-sm uppercase tracking-widest text-safety">
            {negocio.slogan}
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
            <li>WhatsApp: {negocio.whatsappDisplay} (ejemplo)</li>
            <li>Teléfono fijo: {negocio.telefonoFijo} (ejemplo)</li>
            <li>Email: {negocio.email}</li>
            <li>
              {negocio.direccion}, {negocio.ciudad}
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

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t border-kraft/15 px-4 pt-6 text-xs text-kraft/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {negocio.nombre}. Sitio de demostración de portafolio,
          todos los datos son ficticios.
        </p>
        <a href="#/admin" className="underline underline-offset-2 hover:text-kraft/80">
          Administrar sitio
        </a>
      </div>
      <div className="mx-auto mt-3 max-w-6xl px-4 text-xs text-kraft/50 sm:px-6">
        <p>
          Sitio demo por {autor.nombre}. ¿Querés una página así para tu negocio?{' '}
          <a
            href={`https://wa.me/${autor.whatsapp}?text=${encodeURIComponent(
              `Hola ${autor.nombre}! Vi la demo de ${negocio.nombre} y quería consultarte por una web para mi negocio.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-safety underline underline-offset-2 hover:text-kraft"
          >
            Escribime
          </a>
          . {autor.texto}.
        </p>
      </div>
    </footer>
  )
}
