import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpentsService } from './spents.service';
import { Spent } from './spent';

@ApiTags('spents')
@Controller('spents')
export class SpentsController {
  constructor(
    private spentsService: SpentsService
  ){}

  @Get()
  @ApiOperation({
    description: "Retorna um array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia)."
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Spent,
    description: 'Operação realizada com sucesso'
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorreu algum erro nos parâmetros enviados'
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum item disponível com os parâmetros informados'
  })
  public index(): Promise<AxiosResponse<Spent[]>>{
    return this.spentsService.findAll().toPromise();
  }
}
