import { useEffect, useMemo, useState, type FormEvent } from 'react'

const configuredWhatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''
const whatsappNumber =
  /^598\d{8}$/.test(configuredWhatsappNumber) && configuredWhatsappNumber !== '59899000000'
    ? configuredWhatsappNumber
    : ''

const categories = [
  'Soldadura',
  'Tornillería y fijaciones',
  'Herramientas',
  'Corte y abrasivos',
  'Seguridad laboral',
  'Plomería y mantenimiento',
]

const categoryHighlights = [
  { title: 'Soldadura', description: 'Electrodos, conexiones y accesorios.', icon: 'spark' },
  { title: 'Tornillería y fijaciones', description: 'Bulones, tornillos y anclajes.', icon: 'screw' },
  { title: 'Herramientas', description: 'Opciones para trabajo y mantenimiento.', icon: 'wrench' },
  { title: 'Corte y abrasivos', description: 'Discos y consumibles de corte.', icon: 'disc' },
  { title: 'Seguridad laboral', description: 'Elementos de protección personal.', icon: 'glasses' },
  { title: 'Plomería y mantenimiento', description: 'Accesorios para reparación y montaje.', icon: 'pipe' },
]

const products = [
  { code: 'SOL-101', name: 'Electrodo revestido E6013', category: 'Soldadura', description: 'Para trabajos generales de unión en acero al carbono.', summary: 'Ø 2,5 mm · caja 5 kg', specs: [['Clasificación', 'E6013'], ['Diámetro', '2,5 mm'], ['Presentación', 'Caja de 5 kg']] },
  { code: 'SOL-114', name: 'Electrodo revestido E7018', category: 'Soldadura', description: 'Electrodo de bajo hidrógeno para aplicaciones estructurales.', summary: 'Ø 3,25 mm · caja 5 kg', specs: [['Clasificación', 'E7018'], ['Diámetro', '3,25 mm'], ['Presentación', 'Caja de 5 kg']] },
  { code: 'SOL-128', name: 'Pinza porta electrodo', category: 'Soldadura', description: 'Pinza aislada para conectar el electrodo al equipo.', summary: 'Capacidad referencial 300 A', specs: [['Capacidad', '300 A (referencial)'], ['Conexión', 'Cable de soldadura'], ['Cuerpo', 'Aislado']] },
  { code: 'TOR-205', name: 'Bulón hexagonal zincado', category: 'Tornillería y fijaciones', description: 'Fijación roscada para uniones y montajes.', summary: 'M10 × 50 mm · bolsa x 25', specs: [['Rosca', 'M10'], ['Largo', '50 mm'], ['Presentación', 'Bolsa de 25 unidades']] },
  { code: 'TOR-219', name: 'Tornillo autoperforante', category: 'Tornillería y fijaciones', description: 'Tornillo con cabeza hexagonal para chapa y perfiles.', summary: 'N.º 12 × 1” · bolsa x 100', specs: [['Medida', 'N.º 12 × 1 pulgada'], ['Cabeza', 'Hexagonal con arandela'], ['Presentación', 'Bolsa de 100']] },
  { code: 'TOR-233', name: 'Arandela plana', category: 'Tornillería y fijaciones', description: 'Distribuye la carga en uniones con pernos y tornillos.', summary: 'Para M10 · bolsa x 100', specs: [['Uso', 'Fijación M10'], ['Tipo', 'Plana'], ['Presentación', 'Bolsa de 100']] },
  { code: 'TOR-246', name: 'Anclaje de expansión', category: 'Tornillería y fijaciones', description: 'Anclaje metálico para fijación en hormigón.', summary: 'M12 × 100 mm · unidad', specs: [['Rosca', 'M12'], ['Largo total', '100 mm'], ['Base de fijación', 'Hormigón']] },
  { code: 'HER-302', name: 'Amoladora angular', category: 'Herramientas', description: 'Herramienta eléctrica para tareas de corte y desbaste.', summary: '850 W · disco 115 mm', specs: [['Potencia', '850 W'], ['Diámetro de disco', '115 mm'], ['Alimentación', '220 V']] },
  { code: 'HER-316', name: 'Taladro percutor', category: 'Herramientas', description: 'Taladro con función de percusión y mandril convencional.', summary: '650 W · mandril 13 mm', specs: [['Potencia', '650 W'], ['Mandril', 'Hasta 13 mm'], ['Alimentación', '220 V']] },
  { code: 'HER-329', name: 'Juego de llaves combinadas', category: 'Herramientas', description: 'Medidas métricas para mantenimiento y montaje.', summary: '8–19 mm · juego x 12', specs: [['Medidas', '8 a 19 mm'], ['Cantidad', '12 llaves'], ['Tipo', 'Boca y estrella']] },
  { code: 'HER-341', name: 'Broca para metal HSS', category: 'Herramientas', description: 'Broca de acero rápido para perforación de metales.', summary: 'Ø 8 mm · largo 117 mm', specs: [['Material', 'Acero rápido HSS'], ['Diámetro', '8 mm'], ['Largo total', '117 mm']] },
  { code: 'COR-405', name: 'Disco de corte para metal', category: 'Corte y abrasivos', description: 'Disco delgado para corte de acero con amoladora angular.', summary: '115 × 1 × 22,23 mm', specs: [['Diámetro', '115 mm'], ['Espesor', '1 mm'], ['Agujero', '22,23 mm']] },
  { code: 'COR-418', name: 'Disco flap', category: 'Corte y abrasivos', description: 'Disco de láminas abrasivas para acabado y desbaste.', summary: '115 mm · grano 80', specs: [['Diámetro', '115 mm'], ['Grano', '80'], ['Agujero', '22,23 mm']] },
  { code: 'COR-429', name: 'Mecha copa bimetálica', category: 'Corte y abrasivos', description: 'Accesorio para realizar perforaciones circulares.', summary: 'Ø 32 mm · profundidad 38 mm', specs: [['Diámetro', '32 mm'], ['Profundidad de corte', '38 mm'], ['Material', 'Bimetálica']] },
  { code: 'SEG-502', name: 'Guante de protección de cuero', category: 'Seguridad laboral', description: 'Guante de cuero para tareas generales de trabajo.', summary: 'Talle 10 · par', specs: [['Material', 'Cuero'], ['Talle', '10'], ['Presentación', '1 par']] },
  { code: 'SEG-516', name: 'Lente de seguridad transparente', category: 'Seguridad laboral', description: 'Protección ocular con visor transparente.', summary: 'Visor claro · patillas regulables', specs: [['Visor', 'Transparente'], ['Ajuste', 'Patillas regulables'], ['Uso', 'Protección ocular']] },
  { code: 'PLO-603', name: 'Cinta selladora PTFE', category: 'Plomería y mantenimiento', description: 'Cinta para sellado de uniones roscadas.', summary: '12 mm × 10 m · unidad', specs: [['Ancho', '12 mm'], ['Largo', '10 m'], ['Aplicación', 'Uniones roscadas']] },
  { code: 'PLO-617', name: 'Abrazadera sin fin', category: 'Plomería y mantenimiento', description: 'Abrazadera ajustable para mangueras y conexiones.', summary: 'Rango 12–20 mm · unidad', specs: [['Rango de ajuste', '12–20 mm'], ['Material', 'Metal'], ['Accionamiento', 'Tornillo sin fin']] },
]

type Product = (typeof products)[number]
type QuoteItem = { code: string; quantity: number }
type PageItem = number | 'ellipsis'

function pageItems(pageCount: number, current: number): PageItem[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1)
  const numbers = [...new Set([1, pageCount, current - 1, current, current + 1])].filter((number) => number >= 1 && number <= pageCount).sort((a, b) => a - b)
  const items: PageItem[] = []
  let previous = 0
  for (const number of numbers) {
    if (number - previous === 2) items.push(previous + 1)
    else if (number - previous > 2) items.push('ellipsis')
    items.push(number)
    previous = number
  }
  return items
}

function DepartmentGlyph({ name }: { name: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, strokeWidth: 1.8 }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...common}>
      {name === 'spark' && <><path d="M24 6v36M6 24h36M11 11l26 26M37 11 11 37" /><circle cx="24" cy="24" r="5" /></>}
      {name === 'screw' && <><path d="m16 12 4-4h8l4 4v5l-4 4H20l-4-4v-5Z" /><path d="m24 21-12 17m15-13 4 3m-8 1 4 3m-8 1 4 3m-8 1 4 3" /></>}
      {name === 'wrench' && <><path d="M29 10a11 11 0 0 0-13 14L8 32a5 5 0 1 0 7 7l8-8a11 11 0 0 0 14-13l-7 7-7-7 6-8Z" /><circle cx="12" cy="35" r="1.4" /></>}
      {name === 'disc' && <><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="5" /><path d="M24 7v12m17 5H29m-5 17V29M7 24h12" /></>}
      {name === 'glasses' && <><path d="M6 19h4l3 14h8l3-9 3 9h8l3-14h4" /><path d="M13 19a4 4 0 0 0 0 8h4a4 4 0 0 0 4-4v-4m14 0a4 4 0 0 1 0 8h-4a4 4 0 0 1-4-4v-4m-6 4h6" /></>}
      {name === 'pipe' && <><path d="M10 11h11v12h8v14H18V30H10V11Z" /><path d="M10 16h11m8 12v9m-19-9h8" /><circle cx="35" cy="13" r="5" /></>}
    </svg>
  )
}

function App() {
  const pageSize = 6
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [quantities, setQuantities] = useState<Record<string, string>>({})
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [company, setCompany] = useState('')
  const [contactName, setContactName] = useState('')
  const [requestNote, setRequestNote] = useState('')
  const [editedSummary, setEditedSummary] = useState<string | null>(null)
  const [copyState, setCopyState] = useState('')

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es-UY')
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'Todos' || product.category === activeCategory
      const searchable = [product.code, product.name, product.category, product.description, product.summary, ...product.specs.flat()].join(' ').toLocaleLowerCase('es-UY')
      return matchesCategory && (!query || searchable.includes(query))
    })
  }, [activeCategory, search])

  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / pageSize))
  const firstVisible = visibleProducts.length ? (page - 1) * pageSize + 1 : 0
  const lastVisible = Math.min(page * pageSize, visibleProducts.length)
  const pagedProducts = visibleProducts.slice((page - 1) * pageSize, page * pageSize)

  useEffect(() => {
    setPage((current) => Math.min(current, pageCount))
  }, [pageCount])

  const quoteCount = quoteItems.reduce((total, item) => total + item.quantity, 0)
  const generatedSummary = useMemo(() => {
    const lines = [
      'SOLICITUD DE COTIZACIÓN · CATÁLOGO DE REFERENCIA',
      'Los artículos y especificaciones son ilustrativos; confirmar detalles con el negocio.',
      '',
      ...(company.trim() ? ['Empresa: ' + company.trim()] : []),
      ...(contactName.trim() ? ['Contacto: ' + contactName.trim()] : []),
      '',
      'Artículos:',
      ...(quoteItems.length ? quoteItems.map((item) => {
        const product = products.find((entry) => entry.code === item.code)
        return product ? '• ' + item.quantity + ' × ' + product.name + ' — ' + product.summary + ' [' + product.code + ']' : ''
      }) : ['(No hay artículos agregados)']),
      ...(requestNote.trim() ? ['', 'Detalle de la solicitud: ' + requestNote.trim()] : []),
      '',
      'Esta solicitud no confirma stock, precio ni disponibilidad.',
    ]
    return lines.join('\n')
  }, [company, contactName, quoteItems, requestNote])

  const summary = editedSummary ?? generatedSummary
  const whatsappHref = whatsappNumber && quoteItems.length
    ? 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(summary)
    : ''

  function addToQuote(product: Product) {
    const quantity = Math.max(1, Number.parseInt(quantities[product.code] ?? '1', 10) || 1)
    const existing = quoteItems.find((item) => item.code === product.code)
    const nextItems = existing
      ? quoteItems.map((item) => item.code === product.code ? { ...item, quantity: item.quantity + quantity } : item)
      : [...quoteItems, { code: product.code, quantity }]
    setQuoteItems(nextItems)
    setEditedSummary(null)
    setCopyState(product.name + ' agregado al presupuesto.')
  }

  function updateQuoteItem(code: string, quantity: number) {
    if (quantity < 1) return
    const nextItems = quoteItems.map((item) => item.code === code ? { ...item, quantity } : item)
    setQuoteItems(nextItems)
    setEditedSummary(null)
    setCopyState('')
  }

  function removeQuoteItem(code: string) {
    setQuoteItems(quoteItems.filter((item) => item.code !== code))
    setEditedSummary(null)
    setCopyState('')
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyState('Solicitud copiada.')
    } catch {
      setCopyState('No se pudo copiar automáticamente. Seleccioná y copiá el texto.')
    }
  }

  function handleQuoteFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEditedSummary(null)
    setCopyState('Resumen actualizado con los datos del formulario.')
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="El Tornillo, ir al inicio">
          <span className="brand-mark" aria-hidden="true">ET</span>
          <span className="brand-name">El Tornillo<span>Ferretería</span></span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#presupuesto">Presupuesto <span className="nav-count">{quoteCount}</span></a>
          <a href="#contacto">Contacto</a>
        </nav>
        <a className="header-link" href="#presupuesto">Solicitar cotización <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> FERRETERÍA INDUSTRIAL · MINAS</p>
            <h1>Herramientas e insumos<br /><em>para cada proyecto.</em></h1>
            <p className="hero-intro">Todo para el taller, la obra y el mantenimiento. Encontrá productos por rubro o medida y reuní lo que necesitás en una solicitud.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#catalogo">Explorar productos <span aria-hidden="true">↓</span></a>
              <a className="hero-quote-link" href="#presupuesto">Preparar una cotización <span aria-hidden="true">↗</span></a>
            </div>
            <ul className="hero-benefits" aria-label="Qué podés hacer en el catálogo">
              <li><span>01</span> Buscar por medida</li>
              <li><span>02</span> Elegir por rubro</li>
              <li><span>03</span> Preparar tu lista</li>
            </ul>
          </div>
          <figure className="hero-photo">
            <img src={`${import.meta.env.BASE_URL}images/workshop-tools.jpg`} alt="Herramientas y discos abrasivos sobre una mesa de taller" />
            <figcaption className="hero-photo-caption">
              <span className="demo-label">Sitio de demostración</span>
              <a className="photo-credit" href="https://www.pexels.com/photo/a-variety-of-tools-at-a-workshop-5846253/" target="_blank" rel="noreferrer">Foto: Tima Miroshnichenko / Pexels</a>
            </figcaption>
          </figure>
        </section>

        <section className="departments-section" aria-labelledby="departments-title">
          <div className="departments-heading">
            <div>
              <p className="eyebrow">PRODUCTOS POR RUBRO</p>
              <h2 id="departments-title">Encontrá lo que buscás.</h2>
            </div>
            <p>Elegí una categoría para ver sus referencias y especificaciones en el catálogo.</p>
          </div>
          <div className="departments-grid">
            {categoryHighlights.map((category, index) => (
              <a
                className="department-card"
                href="#catalogo"
                key={category.title}
                onClick={() => { setActiveCategory(category.title); setSearch(''); setPage(1) }}
              >
                <span className="department-card-top"><span className="department-icon"><DepartmentGlyph name={category.icon} /></span><span className="department-index">0{index + 1}</span></span>
                <strong>{category.title}</strong>
                <small>{category.description}</small>
                <span className="department-action">Ver productos <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>

        <section className="catalog-section section-wrap" id="catalogo">
          <div className="section-heading catalog-heading">
            <div><p className="eyebrow">REFERENCIAS DE PRODUCTO</p><h2>Catálogo técnico.</h2></div>
            <p>Buscá por medida, aplicación o rubro y prepará una solicitud con varios artículos.</p>
          </div>

          <div className="catalog-toolbar">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <span className="visually-hidden">Buscar en el catálogo</span>
              <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1) }} placeholder="Buscar producto, medida o código…" />
              {search && <button type="button" onClick={() => { setSearch(''); setPage(1) }} aria-label="Limpiar búsqueda">×</button>}
            </label>
            <span className="results-count" aria-live="polite">{visibleProducts.length ? `Mostrando ${firstVisible}–${lastVisible} de ${visibleProducts.length} productos` : '0 productos'}</span>
          </div>

          <div className="filter-list" aria-label="Filtrar por rubro">
            {['Todos', ...categories].map((item) => (
              <button key={item} type="button" className={'filter-chip' + (activeCategory === item ? ' active' : '')} onClick={() => { setActiveCategory(item); setPage(1) }} aria-pressed={activeCategory === item}>{item}</button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {pagedProducts.map((product) => {
                const selected = quoteItems.find((item) => item.code === product.code)
                const quantity = quantities[product.code] ?? '1'
                return (
                  <article className={'product-card' + (selected ? ' in-quote' : '')} key={product.code}>
                    <div className="product-meta"><span>{product.category}</span><code>{product.code}</code></div>
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-summary">{product.summary}</p>
                    <details className="technical-details">
                      <summary>Ver ficha técnica <span aria-hidden="true">＋</span></summary>
                      <dl>{product.specs.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
                    </details>
                    <div className="product-actions">
                      <label htmlFor={'qty-' + product.code}>Cantidad <span>({selected ? 'en presupuesto: ' + selected.quantity : product.category === 'Tornillería y fijaciones' ? 'unidades o bolsas' : 'unidades'})</span></label>
                      <div className="add-controls">
                        <input id={'qty-' + product.code} type="number" min="1" step="1" inputMode="numeric" value={quantity} onChange={(event) => setQuantities((previous) => ({ ...previous, [product.code]: event.target.value }))} />
                        <button className="button add-button" type="button" onClick={() => addToQuote(product)}>{selected ? 'Sumar' : 'Agregar'} <span aria-hidden="true">＋</span></button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-catalog"><strong>No encontramos productos.</strong><span>Probá otro nombre, código o medida.</span></div>
          )}
          {pageCount > 1 && <nav className="catalog-pagination" aria-label="Paginación del catálogo">
            <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Página anterior">Anterior</button>
            <div className="catalog-page-numbers" aria-label="Páginas">
              {pageItems(pageCount, page).map((item, index) => item === 'ellipsis'
                ? <span key={`ellipsis-${index}`} aria-hidden="true">…</span>
                : <button key={item} type="button" onClick={() => setPage(item)} aria-label={`Página ${item}`} aria-current={page === item ? 'page' : undefined}>{item}</button>)}
            </div>
            <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} aria-label="Página siguiente">Siguiente</button>
          </nav>}
        </section>

        <section className="quote-section" id="presupuesto">
          <span id="contacto" className="contact-anchor" aria-hidden="true" />
          <div className="quote-inner">
            <div className="quote-heading">
              <p className="eyebrow eyebrow-light">SOLICITUD DE COTIZACIÓN</p>
              <h2>Tu lista,<br /><em>en un mismo lugar.</em></h2>
              <p>Completá los datos que quieras compartir. El resumen queda en esta página para editarlo o copiarlo.</p>
              <div className="quote-summary-count"><strong>{quoteCount}</strong><span>{quoteCount === 1 ? 'unidad seleccionada' : 'unidades seleccionadas'} en {quoteItems.length} {quoteItems.length === 1 ? 'artículo' : 'artículos'}</span></div>
            </div>

            <div className="quote-panel">
              <form className="quote-form" onSubmit={handleQuoteFormSubmit}>
                <div className="quote-fields">
                  <div><label className="field-label" htmlFor="company">Empresa <span>(opcional)</span></label><input id="company" value={company} onChange={(event) => { setCompany(event.target.value); setEditedSummary(null) }} placeholder="Empresa o taller" /></div>
                  <div><label className="field-label" htmlFor="contact-name">Persona de contacto <span>(opcional)</span></label><input id="contact-name" value={contactName} onChange={(event) => { setContactName(event.target.value); setEditedSummary(null) }} placeholder="Nombre" /></div>
                </div>
                <label className="field-label" htmlFor="request-note">Detalle o especificación <span>(opcional)</span></label>
                <textarea id="request-note" rows={2} value={requestNote} onChange={(event) => { setRequestNote(event.target.value); setEditedSummary(null) }} placeholder="Medidas especiales, uso o información para la cotización" />
                <button className="text-button" type="submit">Actualizar resumen <span aria-hidden="true">↗</span></button>
              </form>

              <div className="quote-items">
                <div className="quote-subhead"><h3>Artículos seleccionados</h3><a href="#catalogo">Seguir agregando</a></div>
                {quoteItems.length ? (
                  <ul>
                    {quoteItems.map((item) => {
                      const product = products.find((entry) => entry.code === item.code)
                      if (!product) return null
                      return (
                        <li key={item.code} className="quote-item">
                          <div className="quote-item-name"><code>{item.code}</code><strong>{product.name}</strong><small>{product.summary}</small></div>
                          <label className="quote-quantity" htmlFor={'quote-' + item.code}><span className="visually-hidden">Cantidad de {product.name}</span><input id={'quote-' + item.code} type="number" min="1" step="1" value={item.quantity} onChange={(event) => { const value = Number.parseInt(event.target.value, 10); if (value >= 1) updateQuoteItem(item.code, value) }} /></label>
                          <button className="remove-item" type="button" onClick={() => removeQuoteItem(item.code)} aria-label={'Quitar ' + product.name}>Quitar</button>
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <div className="empty-quote"><span aria-hidden="true">＋</span><p>El presupuesto está vacío.</p><a href="#catalogo">Elegí productos del catálogo</a></div>
                )}
              </div>

              <div className="summary-editor">
                <label className="field-label" htmlFor="editable-summary">Resumen editable</label>
                <textarea id="editable-summary" rows={Math.min(14, Math.max(7, quoteItems.length + 5))} value={editedSummary ?? generatedSummary} onChange={(event) => { setEditedSummary(event.target.value); setCopyState('') }} />
                <div className="summary-actions">
                  <button className="button button-orange" type="button" onClick={copySummary}>Copiar solicitud</button>
                  {whatsappHref && <a className="button button-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">Abrir WhatsApp configurado</a>}
                </div>
                <p className="summary-disclaimer">No se envía automáticamente ni confirma precios, existencias o disponibilidad. {whatsappNumber ? 'El botón de WhatsApp usa el número configurado por el negocio.' : 'El envío por WhatsApp no está configurado en esta demo.'}</p>
                {copyState && <p className="copy-status" role="status">{copyState}</p>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark" aria-hidden="true">ET</span>
          <span className="brand-name">El Tornillo<span>Ferretería</span></span>
        </a>
        <p>Minas, Lavalleja <span>·</span> Catálogo de referencia</p>
        <div className="footer-actions"><a href="#contacto">Contacto y cotizaciones</a><a href="#inicio">Volver arriba ↑</a></div>
      </footer>
    </div>
  )
}

export default App
