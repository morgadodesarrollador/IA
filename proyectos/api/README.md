# API (NestJS)

Proyecto backend mínimo con NestJS + TypeORM para gestionar la entidad `empresas`.

Pasos rápidos:

1. cd api
2. npm install
3. Copia `.env.example` a `.env` y rellena `DATABASE_URL`
4. Ejecuta la migración:
   psql "$DATABASE_URL" -f migrations/001_create_empresas.sql
5. npm run start:dev
