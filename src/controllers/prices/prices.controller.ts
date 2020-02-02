import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { PricesService } from './prices.service';
import { Price } from './price';
import { ApiTags, ApiResponse, ApiOperation} from '@nestjs/swagger';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(
    private pricesService: PricesService
  ){}

  @Get()
  @ApiOperation({
    description: "Retorna um array com as datas de alteração do preço do combustível"
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Price,
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
  public index():  Promise<AxiosResponse<Price[]>>{
    return this.pricesService.findAll().toPromise();
  }
}
