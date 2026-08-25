import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components'
import { Home, Network, Projects, Labs, Academy, Community, Studios, Vault, Contact, NotFound } from './pages'

export default function App() {
  return <div className="app"><Header /><Routes><Route path="/" element={<Home />} /><Route path="/network" element={<Network />} /><Route path="/projects" element={<Projects />} /><Route path="/labs" element={<Labs />} /><Route path="/academy" element={<Academy />} /><Route path="/community" element={<Community />} /><Route path="/studios" element={<Studios />} /><Route path="/vault" element={<Vault />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes></div>
}
