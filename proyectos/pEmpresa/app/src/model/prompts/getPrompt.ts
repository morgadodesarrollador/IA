// prompts para cada índice
// @ts-ignore
import ibexPromptRaw from '../prompts/ibexPrompt.txt?raw';
// @ts-ignore
import sp500PromptRaw from '../prompts/sp500Prompt.txt?raw';
// @ts-ignore
import nasdaqPromptRaw from '../prompts/nasdaqPrompt.txt?raw';

export function getPrompt(
  index: 'ibex' | 'sp500' | 'nasdaq',
  typeDef: string,
  schema: string
) {
  let raw = ''
  let indiceNombre = ''
  let moneda = ''
  if (index === 'ibex') {
    raw = ibexPromptRaw
    indiceNombre = 'IBEX 35 (España)'
    moneda = 'euros'
  } else if (index === 'sp500') {
    raw = sp500PromptRaw
    indiceNombre = 'S&P 500 (EE.UU.)'
    moneda = 'dólares'
  } else if (index === 'nasdaq') {
    raw = nasdaqPromptRaw
    indiceNombre = 'Nasdaq (EE.UU.)'
    moneda = 'dólares'
  }
  return raw
    .replace('{{typeDefinition}}', typeDef)
    .replace('{{schemaExample}}', schema)
    .replace(/{{indice}}/g, indiceNombre)
    .replace(/{{moneda}}/g, moneda)
}
