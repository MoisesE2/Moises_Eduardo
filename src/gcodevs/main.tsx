import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/index.css'
import './gcodevs.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import GcodevsApp from './GcodevsApp'

// Easter egg também para clientes curiosos
console.log(
  '%cGco Devs — sites profissionais do briefing ao ar 🚀',
  'font-size:14px;font-weight:bold;color:#8b5cf6'
)
console.log('%cConheça o desenvolvedor: https://moises.gcodevs.com', 'color:#3b82f6')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <GcodevsApp />
    </ThemeProvider>
  </React.StrictMode>,
)
