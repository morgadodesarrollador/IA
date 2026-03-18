import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Empresa } from './entities/empresa.entity'

@Injectable()
export class EmpresasService {
  private readonly logger = new Logger(EmpresasService.name)
  constructor(
    @InjectRepository(Empresa)
    private readonly repo: Repository<Empresa>
  ) {}

  async upsertMany(list: any[]) {
    const valid = list
      .map((it) => ({
        simbolo: (it.simbolo ?? it.ticker ?? it.symbol ?? '').toString().trim(),
        nombre: it.nombre ?? it.name ?? null,
        sector: it.sector ?? it.industry ?? null,
        empleados: typeof it.empleados === 'number' ? Math.round(it.empleados) : undefined,
        precio: typeof it.precio === 'number' ? it.precio : undefined,
        marketCap: typeof it.marketCap === 'number' ? it.marketCap : undefined,
        source: it
      }))
      .filter((it) => it.simbolo)

    if (!valid.length) return { ok: true, processed: 0 }

    const saved = await this.repo.save(valid as any)
    return { ok: true, processed: saved.length }
  }
}
