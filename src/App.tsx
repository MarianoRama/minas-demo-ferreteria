/**
 * FERRETERÍA EL TORNILLO — sitio DEMO de portafolio
 * ---------------------------------------------------
 * Nombre, dirección, teléfono y horarios son FICTICIOS.
 * Este proyecto se usa como ejemplo para mostrarle a dueños de
 * ferreterías de Minas (Uruguay) qué tipo de sitio se les puede ofrecer.
 * No representa a ningún negocio real.
 */
import type { ReactElement } from 'react'

const WHATSAPP_NUMBER_DISPLAY = '+598 99 000 000' // número de EJEMPLO, no real
const WHATSAPP_NUMBER_LINK = '59899000000'
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Hola! Vi la página de Ferretería El Tornillo y quería consultar por un producto.',
)

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#productos', label: 'Productos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

type Rubro = {
  nombre: string
  descripcion: string
  icon: ReactElement
}

const iconProps = {
  className: 'h-8 w-8 text-orange-600',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  viewBox: '0 0 24 24',
}

const RUBROS: Rubro[] = [
  {
    nombre: 'Herramientas',
    descripcion: 'Manuales y eléctricas, para el hogar y el profesional.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z"
        />
      </svg>
    ),
  },
  {
    nombre: 'Materiales de construcción',
    descripcion: 'Cemento, arena, ladrillos y todo para tu obra.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21V10l9-6 9 6v11M3 21h18M9 21v-6h6v6"
        />
      </svg>
    ),
  },
  {
    nombre: 'Pinturas',
    descripcion: 'Interior, exterior, esmaltes y accesorios para pintar.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 21c1.5 0 2-1 2-2v-3l9-9 3 3-9 9h-3c-1 0-2 .5-2 2Z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l3-3 3 3-3 3" />
      </svg>
    ),
  },
  {
    nombre: 'Electricidad',
    descripcion: 'Cables, llaves, tomas e iluminación para tu instalación.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
        />
      </svg>
    ),
  },
  {
    nombre: 'Plomería',
    descripcion: 'Caños, canillas, conexiones y repuestos sanitarios.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 4h6v6a4 4 0 0 0 4 4h2v6h-6v-6a4 4 0 0 0-4-4H6V4Z"
        />
      </svg>
    ),
  },
  {
    nombre: 'Jardín',
    descripcion: 'Herramientas, mangueras y todo para el patio y la huerta.',
    icon: (
      <svg {...iconProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21V10M12 10C8 10 5 7 5 3c4 0 7 3 7 7Zm0 0c0-4 3-7 7-7 0 4-3 7-7 7Z"
        />
      </svg>
    ),
  },
]

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-lg font-bold text-orange-400">
            ET
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-800">
            Ferretería <span className="text-orange-600">El Tornillo</span>
          </span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-orange-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="hidden rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:inline-block"
        >
          Contactanos
        </a>
      </div>

      {/* Menú simple para mobile: enlaces siempre visibles en una fila con scroll */}
      <div className="flex gap-5 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm font-medium text-slate-600 md:hidden">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap hover:text-orange-600">
            {link.label}
          </a>
        ))}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900"
    >
      {/* Ilustración simple: grilla de fondo + formas, sin imágenes externas */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-20 text-center sm:px-6 md:flex-row md:text-left">
        <div className="flex-1">
          <span className="inline-block rounded-full bg-orange-500/20 px-4 py-1 text-sm font-semibold text-orange-300">
            Más de 20 años en Minas (ejemplo)
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Todo para tu obra, <span className="text-orange-400">a un clic de distancia</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Herramientas, materiales de construcción, pintura y más. Atención personalizada
            para el vecino de Minas que necesita resolver hoy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#productos"
              className="rounded-full bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-orange-700"
            >
              Ver productos
            </a>
            <a
              href="#contacto"
              className="rounded-full border border-slate-500 px-6 py-3 text-base font-semibold text-white transition hover:border-orange-400 hover:text-orange-300"
            >
              Cómo llegar
            </a>
          </div>
        </div>

        {/* Ilustración inline en SVG a modo de imagen de hero */}
        <div className="flex-1">
          <svg viewBox="0 0 400 300" className="mx-auto w-full max-w-sm drop-shadow-2xl">
            <rect x="40" y="180" width="320" height="90" rx="10" fill="#f97316" />
            <rect x="40" y="180" width="320" height="20" rx="10" fill="#fb923c" />
            <rect x="70" y="60" width="90" height="120" rx="6" fill="#1e293b" />
            <rect x="180" y="90" width="150" height="90" rx="6" fill="#334155" />
            <circle cx="115" cy="120" r="22" fill="#f97316" />
            <rect x="107" y="108" width="16" height="60" rx="4" fill="#e2e8f0" />
            <rect x="200" y="110" width="110" height="14" rx="7" fill="#f97316" />
            <rect x="200" y="135" width="80" height="14" rx="7" fill="#f97316" />
            <rect x="200" y="160" width="95" height="14" rx="7" fill="#f97316" />
          </svg>
        </div>
      </div>
    </section>
  )
}

function Productos() {
  return (
    <section id="productos" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Nuestros rubros</h2>
        <p className="mt-3 text-slate-600">
          Encontrá todo lo que necesitás para tu proyecto, tu casa o tu obra.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RUBROS.map((rubro) => (
          <div
            key={rubro.nombre}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 transition group-hover:bg-orange-100">
              {rubro.icon}
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-800">{rubro.nombre}</h3>
            <p className="mt-2 text-sm text-slate-600">{rubro.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Nosotros() {
  return (
    <section id="nosotros" className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Sobre nosotros</h2>
          <p className="mt-4 text-slate-600">
            Ferretería El Tornillo es un negocio <strong>ficticio</strong> creado a modo de
            ejemplo. En la historia de esta demo, nació hace más de 20 años en Minas y creció
            junto a sus vecinos: hoy imaginamos que atiende a familias, maestros de obra y
            pequeños emprendedores del departamento de Lavalleja.
          </p>
          <p className="mt-4 text-slate-600">
            La idea de este sitio es mostrar cómo una ferretería real de la zona podría tener
            presencia online: mostrar sus rubros, facilitar el contacto por WhatsApp y dar
            horarios y ubicación de forma clara, sin depender solo del boca a boca.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-orange-600">20+</p>
              <p className="text-xs text-slate-500">años (ejemplo)</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-orange-600">6</p>
              <p className="text-xs text-slate-500">rubros</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-2xl font-extrabold text-orange-600">100%</p>
              <p className="text-xs text-slate-500">atención local</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800 p-8 text-white shadow-xl">
          <h3 className="text-xl font-bold text-orange-400">¿Por qué elegirnos?</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li className="flex gap-2">
              <span className="text-orange-400">✓</span>
              Asesoramiento personalizado en cada compra.
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400">✓</span>
              Stock permanente en los rubros principales.
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400">✓</span>
              Atención rápida por WhatsApp para consultas y pedidos.
            </li>
            <li className="flex gap-2">
              <span className="text-orange-400">✓</span>
              Ubicados en Minas, cerca de todo.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function HorariosUbicacion() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-800 sm:text-4xl">Horarios y ubicación</h2>
        <p className="mt-3 text-slate-600">Te esperamos en Minas, Uruguay.</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800">Horario de atención (ejemplo)</h3>
          <dl className="mt-4 space-y-2 text-sm text-slate-600">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt>Lunes a viernes</dt>
              <dd className="font-semibold text-slate-800">8:00 – 12:30 y 14:30 – 19:00</dd>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <dt>Sábados</dt>
              <dd className="font-semibold text-slate-800">8:30 – 13:00</dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt>Domingos</dt>
              <dd className="font-semibold text-slate-800">Cerrado</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-slate-400">
            * Horarios de ejemplo, definidos para esta demo.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <iframe
            title="Ubicación genérica en Minas, Uruguay"
            src="https://www.google.com/maps?q=Minas,+Uruguay&output=embed"
            className="h-full min-h-[280px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

function WhatsAppFloatButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`Escribinos por WhatsApp (número de ejemplo: ${WHATSAPP_NUMBER_DISPLAY})`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-105 hover:bg-green-600"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.7.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.2.5.1.7-.1l.7-.8c.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.2.1.9-.1 1.6Z" />
      </svg>
    </a>
  )
}

function Footer() {
  return (
    <footer id="contacto" className="bg-slate-900 py-14 text-slate-300">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-sm font-bold text-orange-400">
              ET
            </span>
            <span className="text-base font-bold text-white">Ferretería El Tornillo</span>
          </span>
          <p className="mt-3 text-sm text-slate-400">
            Nombre y datos de contacto ficticios, creados a modo de demostración de portafolio
            para negocios de Minas, Uruguay.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-100">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>WhatsApp: {WHATSAPP_NUMBER_DISPLAY} (ejemplo)</li>
            <li>Email: contacto@eltornillo-demo.uy (ejemplo)</li>
            <li>Dirección: cerca del centro, Minas, Uruguay (genérica)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-100">Secciones</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-orange-400">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-800 px-4 pt-6 text-xs text-slate-500 sm:px-6">
        © {new Date().getFullYear()} Ferretería El Tornillo — sitio DEMO de portafolio. Todos los
        datos son ficticios.
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      <Header />
      <main>
        <Hero />
        <Productos />
        <Nosotros />
        <HorariosUbicacion />
      </main>
      <Footer />
      <WhatsAppFloatButton />
    </div>
  )
}

export default App
