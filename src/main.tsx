import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DatosProvider } from './data/store.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DatosProvider>
      <App />
    </DatosProvider>
  </StrictMode>,
)
