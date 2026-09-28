import { useState, type FormEvent } from 'react'

const configuredWhatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? ''
const whatsappNumber = /^598\d{8}$/.test(configuredWhatsappNumber) && configuredWhatsappNumber !== '59899000000'
  ? configuredWhatsappNumber
  : ''

const navigation = [
  { href: '#rubros', label: 'Rubros' },
  { href: '#consulta', label: 'Preparar consulta' },
]

const categories = [
  { number: '01', name: 'Ferretería industrial', note: 'Insumos para taller, mantenimiento y obra' },
  { number: '02', name: 'Soldadura', note: 'Equipos, electrodos y accesorios' },
  { number: '03', name: 'Tornillería', note: 'Tornillos, bulones y fijaciones' },
  { number: '04', name: 'Herramientas', note: 'Manuales, eléctricas y profesionales' },
  { number: '05', name: 'Seguridad laboral', note: 'Protección personal para cada tarea' },
  { number: '06', name: 'Corte y abrasivos', note: 'Discos, lijas y consumibles de taller' },
]

function App() {
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState('')
  const [measure, setMeasure] = useState('')
  const [useCase, setUseCase] = useState('')
  const [message, setMessage] = useState('')
  const [copyState, setCopyState] = useState('')

  function updateField(setter: (value: string) => void, value: string) {
    setMessage('')
    setCopyState('')
    setter(value)
  }

  function prepareMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const lines = [
      'Hola, quisiera consultar por:',
      category ? `Rubro: ${category}` : '',
      company.trim() ? `Empresa: ${company.trim()}` : '',
      product.trim() ? `Producto: ${product.trim()}` : '',
      quantity.trim() ? `Cantidad: ${quantity.trim()}` : '',
      measure.trim() ? `Medida o presentación: ${measure.trim()}` : '',
      useCase.trim() ? `Uso o detalle: ${useCase.trim()}` : '',
    ].filter(Boolean)
    setMessage(lines.join('\n'))
    setCopyState('')
  }

  async function copyMessage() {
    if (!message) return
    try {
      await navigator.clipboard.writeText(message)
      setCopyState('Consulta copiada.')
    } catch {
      setCopyState('No se pudo copiar automáticamente. Seleccioná y copiá el texto.')
    }
  }

  const whatsappHref = whatsappNumber && message
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : ''

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="El Tornillo, ir al inicio">
          <span className="brand-mark" aria-hidden="true">ET</span>
          <span className="brand-name">El Tornillo<span>Ferretería</span></span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="header-link" href="#consulta">Hacer una consulta <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> FERRETERÍA · MINAS, LAVALLEJA</p>
            <h1>Insumos para trabajar.<br /><em>Soluciones para avanzar.</em></h1>
            <p className="hero-intro">
              Herramientas, fijaciones e insumos para taller y obra. Consultá por medida y cantidad antes de comprar.
            </p>
            <a className="button button-dark" href="#rubros">Explorar rubros <span aria-hidden="true">↓</span></a>
          </div>
          <aside className="measure-card" aria-label="Datos útiles para preparar una consulta">
            <div className="card-topline"><span>ANTES DE CONSULTAR</span><span>GUÍA 01</span></div>
            <h2>Una medida cambia todo.</h2>
            <p>Si podés, tené a mano:</p>
            <ul className="checklist">
              <li><span>01</span><div><strong>Medida o presentación</strong><small>Metros, diámetro, litros, unidad</small></div></li>
              <li><span>02</span><div><strong>Cantidad aproximada</strong><small>Cuánto necesitás para el trabajo</small></div></li>
              <li><span>03</span><div><strong>Uso previsto</strong><small>Interior, exterior, reparación, obra</small></div></li>
            </ul>
            <a href="#consulta" className="text-link">Preparar mi consulta <span aria-hidden="true">→</span></a>
            <div className="card-stamp" aria-hidden="true">M<br /><small>UY</small></div>
          </aside>
          <div className="hero-index" aria-hidden="true"><span>01</span><span>—</span><span>06</span></div>
        </section>

        <section className="categories section-wrap" id="rubros">
          <div className="section-heading">
            <div><p className="eyebrow">PARA CADA ARREGLO Y PROYECTO</p><h2>Buscá por rubro.</h2></div>
            <p>Elegí una categoría para llevarla al formulario. La consulta no confirma stock ni precio.</p>
          </div>
          <div className="category-grid">
            {categories.map((item) => (
              <button
                className={`category-card${category === item.name ? ' is-selected' : ''}`}
                key={item.number}
                type="button"
                onClick={() => {
                  updateField(setCategory, item.name)
                  document.querySelector('#consulta')?.scrollIntoView({ behavior: 'smooth' })
                  window.setTimeout(() => document.querySelector<HTMLInputElement>('#product')?.focus(), 350)
                }}
                aria-pressed={category === item.name}
              >
                <span className="category-number">{item.number}</span>
                <span className="category-arrow" aria-hidden="true">↗</span>
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="inquiry-section" id="consulta">
          <div className="inquiry-inner">
            <div className="inquiry-intro">
              <p className="eyebrow eyebrow-light">UNA CONSULTA MÁS CLARA</p>
              <h2>Prepará tu<br /><em>cotización.</em></h2>
              <p>Indicá rubro, producto y cantidad. Si consultás por una empresa, podés agregar su nombre. El formulario prepara el texto; no confirma disponibilidad ni precios.</p>
              <p className="demo-note"><span aria-hidden="true">●</span> Sitio de demostración; negocio y datos ficticios.</p>
            </div>
            <div className="form-panel">
              <form onSubmit={prepareMessage}>
                <label className="field-label" htmlFor="company">Empresa <span>(opcional)</span></label>
                <input id="company" value={company} onChange={(event) => updateField(setCompany, event.target.value)} placeholder="Nombre de la empresa o taller" />

                <label className="field-label" htmlFor="category">Rubro</label>
                <select id="category" value={category} onChange={(event) => updateField(setCategory, event.target.value)}>
                  <option value="">Elegí un rubro (opcional)</option>
                  {categories.map((item) => <option key={item.number} value={item.name}>{item.name}</option>)}
                </select>

                <label className="field-label" htmlFor="product">¿Qué producto necesitás?</label>
                <input id="product" value={product} onChange={(event) => updateField(setProduct, event.target.value)} placeholder="Ej.: pintura látex" />

                <div className="field-row">
                  <div><label className="field-label" htmlFor="quantity">Cantidad aproximada</label><input id="quantity" value={quantity} onChange={(event) => updateField(setQuantity, event.target.value)} placeholder="Ej.: 2" /></div>
                  <div><label className="field-label" htmlFor="measure">Medida o presentación</label><input id="measure" value={measure} onChange={(event) => updateField(setMeasure, event.target.value)} placeholder="Ej.: baldes de 20 L" /></div>
                </div>

                <label className="field-label" htmlFor="use">¿Para qué trabajo? <span>(opcional)</span></label>
                <textarea id="use" rows={3} value={useCase} onChange={(event) => updateField(setUseCase, event.target.value)} placeholder="Agregá una medida, superficie o detalle útil" />

                <button className="button button-orange form-submit" type="submit">Armar texto de consulta <span aria-hidden="true">↗</span></button>
              </form>

              {message && (
                <div className="message-result" aria-live="polite">
                  <label className="field-label" htmlFor="prepared-message">Tu consulta preparada</label>
                  <textarea id="prepared-message" rows={6} readOnly value={message} />
                  <div className="result-actions">
                    <button className="button button-outline" type="button" onClick={copyMessage}>Copiar texto</button>
                    {whatsappHref && <a className="button button-whatsapp" href={whatsappHref} target="_blank" rel="noreferrer">Abrir WhatsApp</a>}
                  </div>
                  {copyState && <p className="copy-status" role="status">{copyState}</p>}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="closing section-wrap">
          <p className="eyebrow">UN BUEN DATO AHORRA VUELTAS</p>
          <p>Rubro, medida y cantidad: datos prácticos para preparar una solicitud de cotización.</p>
          <a className="text-link" href="#consulta">Preparar consulta <span aria-hidden="true">→</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#inicio">
          <span className="brand-mark" aria-hidden="true">ET</span>
          <span className="brand-name">El Tornillo<span>Ferretería</span></span>
        </a>
        <p>Minas, Lavalleja <span>·</span> Demo de portafolio con negocio ficticio</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  )
}

export default App
