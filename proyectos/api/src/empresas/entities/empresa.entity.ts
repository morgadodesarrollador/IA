import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'empresas' })
export class Empresa {
  @PrimaryColumn({ type: 'text' })
  simbolo: string

  @Column({ type: 'text', nullable: false })
  nombre: string

  @Column({ type: 'text', nullable: true })
  sector?: string

  @Column({ type: 'integer', nullable: true })
  empleados?: number

  @Column({ type: 'numeric', precision: 20, scale: 6, nullable: true })
  precio?: number

  @Column({ type: 'numeric', precision: 30, scale: 2, nullable: true, name: 'market_cap' })
  marketCap?: number

  @Column({ type: 'jsonb', nullable: true })
  source?: any
}
