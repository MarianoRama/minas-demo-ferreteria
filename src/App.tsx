import { useMemo, useState, type FormEvent } from 'react'

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

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [search, setSearch] = useState('')
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
        </nav>
        <a className="header-link" href="#presupuesto">Armar presupuesto <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> FERRETERÍA INDUSTRIAL · MINAS</p>
            <h1>Herramientas, fijaciones<br /><em>e insumos de trabajo.</em></h1>
            <p className="hero-intro">Buscá por nombre o medida. Sumá varios artículos y prepará una solicitud clara para cotizar.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#catalogo">Explorar catálogo <span aria-hidden="true">↓</span></a>
              <span className="catalog-count">18 referencias de muestra</span>
            </div>
          </div>
          <figure className="hero-photo">
            <img src="/images/workshop-tools.jpg" alt="Herramientas y discos abrasivos sobre una mesa de taller" />
            <figcaption className="hero-photo-caption">
              <span className="demo-label">Sitio de demostración</span>
              <a className="photo-credit" href="https://www.pexels.com/photo/a-variety-of-tools-at-a-workshop-5846253/" target="_blank" rel="noreferrer">Foto: Tima Miroshnichenko / Pexels</a>
            </figcaption>
          </figure>
          <div className="hero-index" aria-hidden="true"><span>01</span><span>—</span><span>18</span></div>
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
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar producto, medida o código…" />
              {search && <button type="button" onClick={() => setSearch('')} aria-label="Limpiar búsqueda">×</button>}
            </label>
            <span className="results-count" aria-live="polite">{visibleProducts.length} productos</span>
          </div>

          <div className="filter-list" aria-label="Filtrar por rubro">
            {['Todos', ...categories].map((item) => (
              <button key={item} type="button" className={'filter-chip' + (activeCategory === item ? ' active' : '')} onClick={() => setActiveCategory(item)} aria-pressed={activeCategory === item}>{item}</button>
            ))}
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => {
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
        </section>

        <section className="quote-section" id="presupuesto">
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
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  )
}

export default App
