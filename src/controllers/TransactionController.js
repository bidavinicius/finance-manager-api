import { TransactionService } from '../services/TransactionService.js';

const transactionService = new TransactionService();

export class TransactionController {

    async handleList(req, res) {
        const userId = req.userId; 

        const lista = await transactionService.executeList(userId);
        return res.json(lista);
    }

    async handleCreate(req, res) {
        const userId = req.userId;
        const { titulo, valor, tipo } = req.body;

        if (!titulo || !valor || !tipo) {
            return res.status(400).json({ error: "Faltam dados" });
        }

        try {
            const item = await transactionService.executeCreate(titulo, valor, tipo, userId);
            return res.status(201).json(item);
        } catch (error) {
            return res.status(500).json({ error: "Erro ao salvar transação" });
        }
    }

    async handleSummary(req, res) {
        const userId = req.userId;
        const resumo = await transactionService.executeSummary(userId);
        return res.json(resumo);
    }
}