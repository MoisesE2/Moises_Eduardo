import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/index.css'
import './gcodevs.css'
import GcodevsApp from './GcodevsApp'

// O site comercial é sempre claro; garante que o tema escuro do portfólio
// (persistido em localStorage) não vaze para cá via classe no <html>.
document.documentElement.classList.remove('dark')
document.documentElement.classList.add('light')

// Easter egg também para clientes curiosos
console.log(
  '%cGco Devs — sites profissionais do briefing ao ar 🚀',
  'font-size:14px;font-weight:bold;color:#8b5cf6'
)
console.log('%cConheça o desenvolvedor: https://moises.gcodevs.com', 'color:#3b82f6')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GcodevsApp />
  </React.StrictMode>,
)
