import { Controller, Get } from '@nestjs/common';
import { TotalService } from './total.service';
import { AxiosResponse } from 'axios'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Total } from './total';
import { Check } from './check';

@ApiTags('total')
@Controller('total')
export class TotalController {

  constructor(
    private totalService: TotalService
  ){}

  @Get()
  @ApiOperation({
    description: "Retorna um array com o combustível restante no tanque do veículo em cada dia"
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: Total,
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
  public async index() : Promise<Total[]>{
    return await this.totalService.getTotal()
  }

  @Get('confirm')
  @ApiOperation({
    description: "Retorna um objeto contendo a informação do quão próximo você está da resposta correta e o historico de tentativas"
  })
  @ApiResponse({
    status: 200,
    isArray: false,
    type: Check,
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
  public async confirm(): Promise<Check>{
    return await this.totalService.confirm()
  }

  @Get('reload')
  @ApiOperation({
    description: "Realiza o reload dos dados de prices, supplies e spents."
  })
  @ApiResponse({
    status: 200,
    isArray: false,
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
  public async reload(){
    return await this.totalService.reload()
  }
  
}
