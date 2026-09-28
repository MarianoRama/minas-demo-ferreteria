/**
 * FERRETERÍA EL TORNILLO: sitio DEMO de portafolio
 * ---------------------------------------------------
 * Nombre, dirección, teléfono y horarios son FICTICIOS.
 * Este proyecto se usa como ejemplo para mostrarle a dueños de
 * ferreterías de Minas (Uruguay) qué tipo de sitio se les puede ofrecer.
 * No representa a ningún negocio real.
 */
import { useState } from 'react'
import { AdminApp } from './admin/AdminApp'
import { ArmaTuPedido } from './components/ArmaTuPedido'
import { AsesoramientoTecnico } from './components/AsesoramientoTecnico'
import { CintaMetrica } from './components/CintaMetrica'
import { Contacto } from './components/Contacto'
import { Cotizacion } from './components/Cotizacion'
import { FiltrosSVG } from './components/FiltrosSVG'
import { Footer } from './components/Footer'
import { FranjaDestacada } from './components/FranjaDestacada'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HorariosUbicacion } from './components/HorariosUbicacion'
import { MarcasCinta } from './components/MarcasCinta'
import { PorQueElegirnos } from './components/PorQueElegirnos'
import { Rubros } from './components/Rubros'
import { Servicios } from './components/Servicios'
import { WhatsAppFlotante } from './components/WhatsAppFlotante'
import type { RubroId } from './data/rubros'
import { useHashRoute } from './hooks/useHashRoute'
import { useNavegacionSuave } from './hooks/useNavegacionSuave'

function SitioPublico() {
  const [rubroSeleccionado, setRubroSeleccionado] = useState<RubroId | null>(null)
  const [soloOfertas, setSoloOfertas] = useState(false)
  useNavegacionSuave()

  function seleccionarDesdeRubros(rubroId: string) {
    setRubroSeleccionado(rubroId as RubroId)
    setSoloOfertas(false)
    const prefiereReducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('pedido')
      ?.scrollIntoView({ behavior: prefiereReducido ? 'auto' : 'smooth', block: 'start' })
  }

  function irAOfertas() {
    setRubroSeleccionado(null)
    setSoloOfertas(true)
    const prefiereReducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('pedido')
      ?.scrollIntoView({ behavior: prefiereReducido ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-kraft font-sans text-ink">
      <p className="bg-graphite py-1.5 text-center font-condensed text-xs font-semibold uppercase tracking-widest text-kraft/70">
        Sitio de demostración, negocio ficticio
      </p>
      <Header onIrAOfertas={irAOfertas} />
      <main>
        <Hero onIrAOfertas={irAOfertas} />
        <FranjaDestacada />
        <Rubros onSeleccionar={seleccionarDesdeRubros} />
        <CintaMetrica />
        <PorQueElegirnos />
        <AsesoramientoTecnico />
        <ArmaTuPedido
          rubroSeleccionado={rubroSeleccionado}
          onCambiarRubro={setRubroSeleccionado}
          soloOfertas={soloOfertas}
          onCambiarSoloOfertas={setSoloOfertas}
        />
        <CintaMetrica />
        <Servicios />
        <Cotizacion />
        <HorariosUbicacion />
        <MarcasCinta />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFlotante />
    </div>
  )
}

function App() {
  const [ruta] = useHashRoute()
  return (
    <>
      <FiltrosSVG />
      {ruta.startsWith('/admin') ? <AdminApp /> : <SitioPublico />}
    </>
  )
}

export default App
