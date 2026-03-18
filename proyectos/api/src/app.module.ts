import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmpresasModule } from './empresas/empresas.module'
import { Empresa } from './empresas/entities/empresa.entity'
import * as dotenv from 'dotenv'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false,
      entities: [Empresa]
    }),
    EmpresasModule
  ]
})
export class AppModule {}
