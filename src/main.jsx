import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import App from './App.jsx'
import './styles.css'
import './sections.css'
import './fixes.css'
import './v3.css'
import './v4.css'
import './v5.css'
import './v6.css'
import './upgrade.css'
import './luz.css'

/* So em desenvolvimento: deixa o gsap alcancavel pelo console para medir
   e depurar animacao. O build de producao nao leva esta linha. */
if (import.meta.env.DEV) window.gsap = gsap

createRoot(document.getElementById('root')).render(<App />)
