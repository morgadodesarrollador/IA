import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateEmpresaDto {
  @IsString()
  simbolo: string

  @IsString()
  nombre: string

  @IsOptional()
  @IsString()
  sector?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  empleados?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  precio?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  marketCap?: number

  @IsOptional()
  source?: any
}
