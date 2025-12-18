import Transaction from '../models/transaction.model.js';

export class TransactionService {

    // Lista APENAS as transações do usuário logado
    async executeList(userId) {
        const list = await Transaction.find({ user: userId });
        return list;
    }

    // Cria transação vinculada ao ID do usuário
    async executeCreate(titulo, valor, tipo, categoria, userId) {
        const novaTransacao = await Transaction.create({
            titulo,
            valor,
            tipo,
            categoria,
            user: userId // Salva o ID do dono
        });

        return novaTransacao;
    }

    // Deleta (garantindo que só deleta se for do usuário dono)
    async executeDelete(id, userId) {
        const deleted = await Transaction.deleteOne({ _id: id, user: userId });
        
        if (deleted.deletedCount === 0) {
            throw new Error("Transação não encontrada ou você não tem permissão");
        }
        
        return { message: "Item deletado com sucesso" };
    }

    // Calcula o resumo baseado no banco de dados
    async executeSummary(userId) {
        // Busca todas as transações desse usuário
        const list = await Transaction.find({ user: userId });

        let entradas = 0;
        let saidas = 0;

        // Faz a matemática (igual fazíamos antes)
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