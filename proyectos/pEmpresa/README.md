# pEmpresa

Estructura monorepo mínima para el proyecto:

- pEmpresa/
  - app/        -> frontend (React 19 + Vite + TypeScript)
  - api/        -> backend (NestJS + TypeORM + PostgreSQL)

Ambos subproyectos tienen sus propios package.json y tsconfig. Instala dependencias y ejecuta cada uno por separado.

## Instalación y ejecución

### Frontend:
```bash
cd pEmpresa/app
npm install
npm run dev
```

### Backend:
```bash
cd pEmpresa/api
npm install
npm run start:dev
```

## Configuración

### Variables de entorno (Frontend)

El frontend requiere una API key de OpenAI configurada en `pEmpresa/app/.env`:

```
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

Vite expone automáticamente variables que empiezan por `VITE_` a la aplicación.
Puedes obtener tu API key en: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

## Tipos de datos

### IbexCompany
Estructura de datos que devuelve la API para cada empresa del IBEX 35:

```typescript
type IbexCompany = {
  simbolo: string            // Ticker (ej. "TEF", "SAN")
  nombre: string             // Nombre completo de la empresa
  sector?: string            // Sector o industria
  empleados?: number         // Número de empleados (entero)
  precio?: number            // Valor actual de la acción en euros (float)
  marketCap?: number         // Capitalización bursátil en euros (float)
}
```

## Mejoras recientes

✨ **Cards mejoradas:** Estilos de fondo con gradientes, efectos hover suaves y elevación.
💰 **Valor de la acción destacado:** El campo `precio` se muestra prominentemente en un contenedor con gradiente verde.
📊 **Mejor presentación de datos:** Información estructurada con efectos hover por campo individual.

## Notas de seguridad

- **No commits de API keys:** El archivo `.env` está incluido en `.gitignore` para evitar exponer credenciales.
- **Backend recomendado:** Para producción, es recomendable crear un pequeño endpoint servidor (Express/NestJS) que guarde la API key y reenvíe las solicitudes a OpenAI desde el backend, en lugar de exponer la key desde el cliente.
