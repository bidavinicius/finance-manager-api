import { AuthService } from '../services/AuthService.js';
import { TransactionService } from '../services/TransactionService.js';

const authService = new AuthService();
const transactionService = new TransactionService();

export class UniversalController {

    // ROTA 1: Cuida de Login e Cadastro
    async handleAuth(req, res) {
        const { acao, nome, email, senha } = req.body;
        // acao deve ser 'login' ou 'criar'

        try {
            if (acao === 'login') {
                const result = await authService.executeLogin(email, senha);
                return res.json(result); // Retorna token + user
            } 
            
            if (acao === 'criar') {
                const result = await authService.executeRegister(nome, email, senha);
                return res.status(201).json(result);
            }

            return res.status(400).json({ error: "Ação inválida. Use 'login' ou 'criar'" });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // ROTA 2: Cuida de TUDO dos dados (Ler e Escrever)
    async handleData(req, res) {
        const userId = req.userId; // Vem do Middleware
        const { acao, titulo, valor, tipo, categoria } = req.body;
        // acao: 'ler' (traz tudo) ou 'salvar' (salva e traz tudo atualizado)

        try {
            // Se a ação for SALVAR, cria a transação primeiro
            if (acao === 'salvar') {
                if (!titulo || !valor || !tipo || !categoria) {
                    return res.status(400).json({ error: "Faltam dados para salvar" });
                }
            
            let valorFinal = valor;
                if (typeof valor === 'string') {
                    valorFinal = parseFloat(valor.replace(',', '.'));
                }

                await transactionService.executeCreate(titulo, valorFinal, tipo, categoria, userId);
            }

            // INDEPENDENTE se salvou ou só quis ler, SEMPRE retornamos os dados atualizados
            // Assim economizamos chamadas. O Front recebe tudo de uma vez.
            const lista = await transactionService.executeList(userId);
            const resumo = await transactionService.executeSummary(userId);

            return res.json({
                sucesso: true,
                dados: {
                    lista_transacoes: lista,
                    resumo: resumo
                }
            });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}