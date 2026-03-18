import React from 'react'
import type { IbexCompany } from '../model/useIbex35'

type Props = {
  company?: IbexCompany
  title?: string
  subtitle?: string
  children?: React.ReactNode
}

function formatNumber(n?: number) {
  if (n == null) return '—'
  return Intl.NumberFormat('es-ES').format(n)
}

function formatCurrency(n?: number) {
  if (n == null) return '—'
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n)
}

export default function Card({ company, title, subtitle, children }: Props) {
  const showTitle = company ? company.nombre : title
  const showSubtitle = company ? company.sector : subtitle
  const [showPrices, setShowPrices] = React.useState(false)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!showPrices) return
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowPrices(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showPrices])

  return (
    <article className="rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{showTitle}</h3>
        {company?.simbolo && (
          <div className="text-xs font-bold text-white bg-blue-600 px-2 py-1 rounded ml-2">{company.simbolo}</div>
        )}
      </div>
      {showSubtitle && <p className="text-xs text-gray-600 mt-1 uppercase tracking-wide">{showSubtitle}</p>}

      {company && company.precio != null && (
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Valor de la acción</div>
              <div className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(company.precio)}</div>
            </div>
            {/* Icono lupa para mostrar max/min de ayer */}
            {(company.maxPriceYesterday != null || company.minPriceYesterday != null) && (
              <button
                className="ml-2 p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                title="Ver máximo/mínimo de ayer"
                onClick={() => setShowPrices(v => !v)}
                style={{ position: 'relative', zIndex: 10 }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            )}
          </div>
          {showPrices && (
            <div
              ref={popoverRef}
              className="absolute right-0 mt-2 w-60 bg-blue-50 border border-blue-300 rounded-xl shadow-2xl p-5 z-30 animate-fade-in"
              style={{ top: '100%', right: 0, transition: 'opacity 0.2s' }}
            >
              <div className="text-sm text-blue-900 font-semibold mb-2">Valores de la acción (ayer)</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium text-green-700">Máx.:</span>
                <span>{formatCurrency(company.maxPriceYesterday)}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-medium text-red-700">Mín.:</span>
                <span>{formatCurrency(company.minPriceYesterday)}</span>
              </div>
              {/* Pequeño gráfico de tendencia si hay datos */}
              {company.maxPriceYesterday != null && company.minPriceYesterday != null && (
                <div className="mt-2 flex items-center justify-center">
                  <svg width="80" height="32" viewBox="0 0 80 32">
                    <polyline
                      points={`5,${32-((company.minPriceYesterday/company.maxPriceYesterday)*28)} 40,${32-((company.maxPriceYesterday/company.maxPriceYesterday)*28)} 75,${32-((company.minPriceYesterday/company.maxPriceYesterday)*28)}`}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                    <circle cx="40" cy={32-((company.maxPriceYesterday/company.maxPriceYesterday)*28)} r="3" fill="#22c55e" />
                    <circle cx="5" cy={32-((company.minPriceYesterday/company.maxPriceYesterday)*28)} r="3" fill="#ef4444" />
                    <circle cx="75" cy={32-((company.minPriceYesterday/company.maxPriceYesterday)*28)} r="3" fill="#ef4444" />
                  </svg>
                </div>
              )}
              <style>{`.animate-fade-in{opacity:1;animation:fadeIn .2s;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}`}</style>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-700">
        {company ? (
          <dl className="space-y-3">
            <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded transition-colors">
              <dt className="font-medium text-gray-700">Empleados</dt>
              <dd className="text-gray-900 font-semibold">{formatNumber(company.empleados)}</dd>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded transition-colors">
              <dt className="font-medium text-gray-700">Capitalización</dt>
              <dd className="text-gray-900 font-semibold">{formatCurrency(company.marketCap)}</dd>
            </div>
          </dl>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </article>
  )
}
