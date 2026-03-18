import { useEffect, useState } from 'react'
import { ibexPrompt } from '../prompts/prompts'
import { typeDefinitionIbex } from '../types/typeDefinitionIbex'
import { schemaExampleIbex } from '../schemas/schemaExampleIbex'
import type { IbexCompany } from '../types/IbexCompany'


type UseIbexResult = {
	data: IbexCompany[] | null;
	loading: boolean;
	error: string | null;
};

// Hook genérico para cualquier índice
import { getPrompt } from '../prompts/getPrompt'

export function useIndice(
	indice: 'ibex' | 'sp500' | 'nasdaq',
	apiKey?: string,
	typeDef: string = typeDefinitionIbex,
	schema: string = schemaExampleIbex
): UseIbexResult {
	const [data, setData] = useState<IbexCompany[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;

		async function fetchIndice() {
			setLoading(true);
			setError(null);
			setData(null);

			const key = apiKey ?? (import.meta.env.VITE_OPENAI_API_KEY as string | undefined);
			if (!key) {
				setError('No OpenAI API key configurada. Set VITE_OPENAI_API_KEY o pasa apiKey.');
				setLoading(false);
				return;
			}

			try {
				const prompt = getPrompt(indice, typeDef, schema);
                console.log('Prompt generado:', indice, prompt);
				const body = {
					model: 'gpt-4o-mini',
					messages: [
						{ role: 'system', content: 'Eres un asistente que responde con JSON cuando se solicita.' },
						{ role: 'user', content: prompt }
					],
					temperature: 0
				};

				const res = await fetch('https://api1.openai.com/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${key}`
					},
					body: JSON.stringify(body)
				});

				if (!res.ok) {
					const text = await res.text();
					throw new Error(`OpenAI error: ${res.status} ${res.statusText} - ${text}`);
				}

				const json = await res.json();
				const content = json?.choices?.[0]?.message?.content;

				if (!content) throw new Error('Respuesta inválida de OpenAI');

				let parsed: any = null;
				try {
					parsed = JSON.parse(content);
				} catch (e) {
					const first = content.indexOf('{');
					const last = content.lastIndexOf('}');
					if (first !== -1 && last !== -1) {
						const substr = content.slice(first, last + 1);
						parsed = JSON.parse(substr);
					} else {
						throw new Error('No pude parsear JSON desde la respuesta de OpenAI');
					}
				}

				let rawList: any[] | undefined;
				if (Array.isArray(parsed)) rawList = parsed;
				else if (parsed?.empresas && Array.isArray(parsed.empresas)) rawList = parsed.empresas;
				else if (parsed?.companies && Array.isArray(parsed.companies)) rawList = parsed.companies;

				const normalizeNumber = (v: any) => {
					if (v == null) return undefined;
					if (typeof v === 'number') return v;
					if (typeof v === 'string') {
						const cleaned = v.replace(/\s/g, '').replace(/\./g, '').replace(/,/g, '.');
						const num = cleaned.replace(/[^0-9.-]/g, '');
						const parsedNum = Number(num);
						return Number.isFinite(parsedNum) ? parsedNum : undefined;
					}
					return undefined;
				};

				const normalizeEmployees = (v: any) => {
					if (v == null) return undefined;
					if (typeof v === 'number') return Math.round(v);
					if (typeof v === 'string') {
						const num = v.replace(/[^0-9]/g, '');
						return num ? Number(num) : undefined;
					}
					return undefined;
				};

				let companies: IbexCompany[] | null = null;
				if (rawList && Array.isArray(rawList)) {
					companies = rawList.map((item: any) => {
						const simbolo = item.simbolo ?? item.symbol ?? item.ticker ?? item.codigo ?? item.code ?? item.id ?? item.ISIN ?? '';
						const nombre = item.nombre ?? item.name ?? item.company ?? item.empresa ?? '';
						const sector = item.sector ?? item.industry ?? item.categoria ?? item.category ?? undefined;
						const empleados = normalizeEmployees(item.empleados ?? item.numempleados ?? item.employees ?? item.staff ?? item.workers);
						const precio = normalizeNumber(item.precio ?? item.price ?? item.cotizacion ?? item.last ?? item.ultimo);
						const marketCap = normalizeNumber(item.marketCap ?? item.market_cap ?? item.capitalizacion ?? item.marketcap);
						const maxPriceYesterday = normalizeNumber(item.maxPriceYesterday ?? item.max_price_yesterday ?? item.maximoAyer ?? item.max ?? item.high ?? item.highYesterday);
						const minPriceYesterday = normalizeNumber(item.minPriceYesterday ?? item.min_price_yesterday ?? item.minimoAyer ?? item.min ?? item.low ?? item.lowYesterday);

						return {
							simbolo: String(simbolo).trim(),
							nombre: String(nombre).trim(),
							sector: sector ? String(sector).trim() : undefined,
							empleados,
							precio,
							marketCap,
							maxPriceYesterday,
							minPriceYesterday
						};
					});
				}

				if (mounted) {
					setData(companies);
					setLoading(false);
				}
			} catch (err: any) {
				if (mounted) {
					setError(err?.message ?? String(err));
					setLoading(false);
				}
			}
		}

		fetchIndice();
		return () => {
			mounted = false;
		};
	}, [indice, apiKey, typeDef, schema]);

	return { data, loading, error };
}
