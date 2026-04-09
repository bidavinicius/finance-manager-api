import { Router } from 'express';
import { TransactionController } from './controllers/TransactionController.js';
import { AuthController } from './controllers/AuthController.js'; // Importe o Auth
import { authMiddleware } from './middlewares/authMiddleware.js'; // Importe o Guardião

const router = Router();
const transactionController = new TransactionController();
const authController = new AuthController();

router.post('/login', (req, res) => authController.handleLogin(req, res));
router.post('/register', (req, res) => authController.handleRegister(req, res));

router.get('/transacoes', authMiddleware, (req, res) => transactionController.handleList(req, res));
router.post('/transacoes', authMiddleware, (req, res) => transactionController.handleCreate(req, res));
router.get('/resumo', authMiddleware, (req, res) => transactionController.handleSummary(req, res));

export default router;