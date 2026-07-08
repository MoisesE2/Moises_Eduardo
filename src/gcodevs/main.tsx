import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styles/index.css'
import i18n from '../i18n/config'
import { ThemeProvider } from '../contexts/ThemeContext'
import GcodevsApp from './GcodevsApp'

// ponytail: site comercial é PT-only; força pt para os componentes compartilhados
// que usam i18n (ProjectsTypesSection, previews). Se um dia precisar de EN, basta
// remover esta linha e adicionar um seletor de idioma no header.
i18n.changeLanguage('pt')

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
