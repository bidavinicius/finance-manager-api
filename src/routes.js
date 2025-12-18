import { Router } from 'express';
import { UniversalController } from './controllers/UniversalController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const router = Router();
const universalController = new UniversalController();

// --- ROTA 1: AUTH (Pública) ---
// Serve para Login e Registro
router.post('/auth', (req, res) => universalController.handleAuth(req, res));

// --- ROTA 2: DADOS (Privada) ---
// Serve para Listar, Ver Resumo e Criar Nova Transação
router.post('/dados', authMiddleware, (req, res) => universalController.handleData(req, res));

export default router;