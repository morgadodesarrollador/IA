export const typeDefinitionIbex = `type IbexCompany = {
  simbolo: string;
  nombre: string;
  sector?: string;
  empleados?: number; // entero
  precio?: number; // cotización por acción en euros (float)
  marketCap?: number; // capitalización en euros (float)
  maxPriceYesterday?: number; // valor máximo de la acción en el día de ayer
  minPriceYesterday?: number; // valor mínimo de la acción en el día de ayer
}`;
