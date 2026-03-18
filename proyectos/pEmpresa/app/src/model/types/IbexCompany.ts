export type IbexCompany = {
  simbolo: string;
  nombre: string;
  sector?: string;
  empleados?: number;
  precio?: number;
  marketCap?: number;
  maxPriceYesterday?: number;
  minPriceYesterday?: number;
};
