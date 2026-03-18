import React from 'react'
import Card from './components/Card'
import Navbar, { IndiceKey } from './components/Navbar'
import { useIndice } from './model/hooks/useIbex35'
import type { IbexCompany } from './model/types/IbexCompany'

export default function App() {
  const [indice, setIndice] = React.useState<IndiceKey>('ibex')
  const { data, loading, error } = useIndice(indice)

  const parseNumber = (v: any): number | undefined => {
    if (v == null) return undefined
    if (typeof v === 'number') return v
    if (typeof v === 'string') {
      const cleaned = v.replace(/[^0-9.,\-]/g, '').replace(/,/g, '')
      const n = Number(cleaned)
      return Number.isFinite(n) ? n : undefined
    }
    return undefined
  }

  const items: IbexCompany[] = Array.isArray(data)
    ? data.map((d: any) => ({
        simbolo: d.simbolo ?? d.cif ?? d.ticker ?? d.symbol ?? undefined,
        nombre: d.nombre ?? d.name ?? 'Sin nombre',
        sector: d.sector ?? d.categoria ?? d.industry ?? undefined,
        empleados: parseNumber(d.empleados ?? d.numempleados ?? d.staff ?? d.employees),
        precio: parseNumber(d.precio ?? d.price ?? d['Último precio'] ?? d.lastPrice),
        marketCap: parseNumber(d.marketCap ?? d.capitalizacion ?? d['capitalización'] ?? d.market_cap),
        maxPriceYesterday: parseNumber(d.maxPriceYesterday ?? d.max_price_yesterday ?? d.maximoAyer ?? d.max ?? d.high ?? d.highYesterday),
        minPriceYesterday: parseNumber(d.minPriceYesterday ?? d.min_price_yesterday ?? d.minimoAyer ?? d.min ?? d.low ?? d.lowYesterday)
      }))
    : []

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="max-w-6xl mx-auto mb-6">
        <Navbar selected={indice} onSelect={setIndice} />
        <h1 className="text-2xl font-semibold">Listado de empresas</h1>
      </header>

      <main className="max-w-6xl mx-auto">
        {loading && <p>Cargando empresas del {indice}</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && items.length === 0 && (
          <div>
            <p>No se encontraron empresas. Comprueba tu API key o espera a que la respuesta llegue.</p>
          </div>
        )}

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 grid-fallback">
          {items.map((c) => (
            <Card key={c.simbolo ?? c.nombre} company={c} />
          ))}
        </div>

        {/* Debug: mostrar JSON crudo (solo en dev o si VITE_SHOW_DEBUG=true) */}
        {/* {Array.isArray(data) && (import.meta.env.DEV || import.meta.env.VITE_SHOW_DEBUG === 'true') && (
          <div className="card-debug">
            <strong>DEBUG: respuesta raw del hook:</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )} */}
      </main>
    </div>
  )
}
