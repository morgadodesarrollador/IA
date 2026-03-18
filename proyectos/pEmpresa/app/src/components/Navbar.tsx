import React from 'react'

const NAV_OPTIONS = [
  { key: 'ibex', label: 'IBEX 35' },
  { key: 'sp500', label: 'S&P 500' },
  { key: 'nasdaq', label: 'Nasdaq' }
]

export type IndiceKey = 'ibex' | 'sp500' | 'nasdaq'

interface NavbarProps {
  selected: IndiceKey
  onSelect: (key: IndiceKey) => void
}

export default function Navbar({ selected, onSelect }: NavbarProps) {
  return (
    <nav className="flex gap-4 py-4 border-b border-blue-200 bg-white">
      {NAV_OPTIONS.map(opt => (
        <button
          key={opt.key}
          className={`px-4 py-2 rounded font-semibold border transition-colors ${selected === opt.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
          onClick={() => { onSelect(opt.key as IndiceKey), console.log('Índice seleccionado:', opt.key) }}
        >
          {opt.label}
        </button>
      ))}
    </nav>
  )
}
