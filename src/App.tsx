/**
 * FERRETERÍA EL TORNILLO — sitio DEMO de portafolio
 * ---------------------------------------------------
 * Nombre, dirección, teléfono y horarios son FICTICIOS.
 * Este proyecto se usa como ejemplo para mostrarle a dueños de
 * ferreterías de Minas (Uruguay) qué tipo de sitio se les puede ofrecer.
 * No representa a ningún negocio real.
 */
import { useState } from 'react'
import { ArmaTuPedido } from './components/ArmaTuPedido'
import { AsesoramientoTecnico } from './components/AsesoramientoTecnico'
import { CintaMetrica } from './components/CintaMetrica'
import { Contacto } from './components/Contacto'
import { Cotizacion } from './components/Cotizacion'
import { Footer } from './components/Footer'
import { FranjaDestacada } from './components/FranjaDestacada'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HorariosUbicacion } from './components/HorariosUbicacion'
import { MarcasCinta } from './components/MarcasCinta'
import { Ofertas } from './components/Ofertas'
import { PorQueElegirnos } from './components/PorQueElegirnos'
import { Rubros } from './components/Rubros'
import { Servicios } from './components/Servicios'
import { WhatsAppFlotante } from './components/WhatsAppFlotante'
import type { RubroId } from './data/rubros'
import { useNavegacionSuave } from './hooks/useNavegacionSuave'

function App() {
  const [rubroSeleccionado, setRubroSeleccionado] = useState<RubroId | null>(null)
  useNavegacionSuave()

  function seleccionarDesdeRubros(rubroId: string) {
    setRubroSeleccionado(rubroId as RubroId)
    const prefiereReducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    document
      .getElementById('pedido')
      ?.scrollIntoView({ behavior: prefiereReducido ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-kraft font-sans text-ink">
      <p className="bg-graphite py-1.5 text-center font-condensed text-xs font-semibold uppercase tracking-widest text-kraft/70">
        Sitio de demostración — negocio ficticio
      </p>
      <Header />
      <main>
        <Hero />
        <FranjaDestacada />
        <Rubros onSeleccionar={seleccionarDesdeRubros} />
        <CintaMetrica />
        <PorQueElegirnos />
        <AsesoramientoTecnico />
        <Ofertas />
        <ArmaTuPedido rubroSeleccionado={rubroSeleccionado} onCambiarRubro={setRubroSeleccionado} />
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

export default App
