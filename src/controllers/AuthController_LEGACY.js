import { AuthService } from '../services/AuthService.js';

const authService = new AuthService();

export class AuthController {
    
    async handleLogin(req, res) {
        const { email, senha } = req.body;
        try {
            const resultado = await authService.executeLogin(email, senha);
            return res.json(resultado);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async handleRegister(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const usuario = await authService.executeRegister(nome, email, senha);
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}