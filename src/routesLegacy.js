import { Router } from 'express';
import { TransactionController } from './controllers/TransactionController.js';
import { AuthController } from './controllers/AuthController.js'; // Importe o Auth
import { authMiddleware } from './middlewares/authMiddleware.js'; // Importe o Guardião

const router = Router();
const transactionController = new TransactionController();
const authController = new AuthController();

// --- ROTAS PÚBLICAS (Qualquer um acessa) ---
router.post('/login', (req, res) => authController.handleLogin(req, res));
router.post('/register', (req, res) => authController.handleRegister(req, res));

// --- ROTAS PRIVADAS (Precisa de Token) ---
// Note que colocamos o 'authMiddleware' antes da função do controller
router.get('/transacoes', authMiddleware, (req, res) => transactionController.handleList(req, res));
router.post('/transacoes', authMiddleware, (req, res) => transactionController.handleCreate(req, res));
router.delete('/transacoes/:id', authMiddleware, (req, res) => transactionController.handleDelete(req, res));
router.get('/resumo', authMiddleware, (req, res) => transactionController.handleSummary(req, res));

export default router;