import { Controller, Get } from '@nestjs/common'

@Controller('api/mock')
export class MockController {
  @Get('ibex35.json')
  getMock() {
    return {
      empresas: [
        { simbolo: 'TEF', nombre: 'Telefónica, S.A.', sector: 'Telecomunicaciones', empleados: 111000, precio: 3.45, marketCap: 12000000000 },
        { simbolo: 'SAN', nombre: 'Banco Santander, S.A.', sector: 'Banca', empleados: 200000, precio: 3.15, marketCap: 100000000000 }
      ]
    }
  }
}
