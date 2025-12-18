import Transaction from '../models/transaction.model.js';

export class TransactionService {

    async executeList(userId) {
        const list = await Transaction.find({ user: userId });
        return list;
    }

    async executeCreate(titulo, valor, tipo, categoria, userId) {
        const novaTransacao = await Transaction.create({
            titulo,
            valor,
            tipo,
            categoria,
            user: userId
        });

        return novaTransacao;
    }

    async executeSummary(userId) {
        const list = await Transaction.find({ user: userId });

        let entradas = 0;
        let saidas = 0;

        list.forEach(t => {
            if (t.tipo === 'receita') {
                entradas += t.valor;
            } else {
                saidas += t.valor;
            }
        });

        return {
            entradas,
            saidas,
            saldo: entradas - saidas
        };
    }
}