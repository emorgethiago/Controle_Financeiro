import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransacoesService } from './transacoes.service';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  criar(@Body() criarTransacaoDto: CriarTransacaoDto) {
    return this.transacoesService.criar(criarTransacaoDto);
  }

  @Get()
  findAll() {
    return this.transacoesService.findAllConsolidado();
  }
}
