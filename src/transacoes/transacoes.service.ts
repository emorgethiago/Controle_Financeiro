import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transacao, TransacaoDocument } from './schemas/transacao.schema';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name) private transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(criarTransacaoDto: CriarTransacaoDto): Promise<Transacao> {
    const novaTransacao = new this.transacaoModel(criarTransacaoDto);
    return novaTransacao.save();
  }

  async findAllConsolidado() {
    const historico = await this.transacaoModel.find().sort({ createdAt: -1 }).exec();

    let saldoTotal = 0;
    let totalDespesas = 0;
    let totalGastolmpulso = 0;

    historico.forEach((t) => {
      if (t.tipo === 'receita') {
        saldoTotal += t.valor;
      } else if (t.tipo === 'despesa') {
        saldoTotal -= t.valor;
        totalDespesas += t.valor;

        if (t.consumoConsciente === false) {
          totalGastolmpulso += t.valor;
        }
      }
    });

    return {
      historico,
      metricas: {
        saldoTotal,
        totalDespesas,
        totalGastolmpulso,
      },
    };
  }
}
