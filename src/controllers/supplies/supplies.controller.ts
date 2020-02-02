import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SuppliesService } from './supplies.service';
import { Supplie } from './supplie';

@ApiTags('supplies')
@Controller('supplies')
export class SuppliesController {
  constructor(
    private suppliesService: SuppliesService
  ){}

  @Get()
  @ApiOperation({
    description: "Retorna um array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia)."
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Supplie,
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
  public index(): Promise<AxiosResponse<Supplie[]>>{
    return this.suppliesService.findAll().toPromise();
  }
}
