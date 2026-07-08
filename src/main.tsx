import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import './i18n/config'
import { ThemeProvider } from './contexts/ThemeContext'

// Easter egg para quem abre o DevTools (olá, recrutador técnico!)
console.log(
  '%c👋 Olá, dev curioso!',
  'font-size:18px;font-weight:bold;background:linear-gradient(90deg,#8b5cf6,#3b82f6);color:#fff;padding:6px 14px;border-radius:8px'
)
console.log(
  '%cSe você chegou até aqui, já temos algo em comum: curiosidade.\n\n' +
    '  GitHub:   https://github.com/MoisesE2\n' +
    '  LinkedIn: https://www.linkedin.com/in/moises-e2/\n' +
    '  CV:       role até o topo e clique em "Download CV" ;)\n\n' +
    'Este site é open source: https://github.com/MoisesE2/Moises_Eduardo',
  'color:#8b5cf6;font-size:13px;line-height:1.6'
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
