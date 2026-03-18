import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { EmpresasService } from './empresas.service'
import { ApiKeyGuard } from './apikey.guard'

@Controller('api/empresas')
export class EmpresasController {
  constructor(private readonly service: EmpresasService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  async createMany(@Body() body: any) {
    const list = Array.isArray(body) ? body : body.empresas ?? []
    return this.service.upsertMany(list)
  }
}
