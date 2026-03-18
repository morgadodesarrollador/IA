import React, { useState } from 'react'

const indices = [
  { key: 'ibex', label: 'IBEX 35' },
  { key: 'sp500', label: 'S&P 500' },
  { key: 'nasdaq', label: 'Nasdaq' }
]

export type IndiceKey = 'ibex' | 'sp500' | 'nasdaq'

interface MenuProps {
  selected: IndiceKey
  onSelect: (key: IndiceKey) => void
}

export default function IndicesMenu({ selected, onSelect }: MenuProps) {
  return (
    <nav className="flex gap-4 mb-6">
      {indices.map(idx => (
        <button
          key={idx.key}
          className={`px-4 py-2 rounded font-semibold border transition-colors ${selected === idx.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50'}`}
          onClick={() => onSelect(idx.key as IndiceKey)}
        >
          {idx.label}
        </button>
      ))}
    </nav>
  )
}
