import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import PasswordUtils from '../utils/PasswordUtils.js';

export class AuthService {
    
    async executeLogin(email, senha) {
        const user = await User.findOne({ email });
        
        if (!user) {
            throw new Error("Usuário ou senha inválidos");
        }

        const senhaBate = await PasswordUtils.comparePassword(senha, user.senha);
        
        if (!senhaBate) {
            throw new Error("Usuário ou senha inválidos");
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });

        const userResponse = user.toObject(); 
        
        delete userResponse.senha;
        delete userResponse.__v; 

        return { user: userResponse, token };
    }

    async executeRegister(nome, email, senha) {
        const existe = await User.findOne({ email });
        if (existe) {
            throw new Error("Email já cadastrado");
        }

        const senhaHash = await PasswordUtils.hashPassword(senha);

        const novoUsuario = await User.create({
            nome,
            email,
            senha: senhaHash
        });

        const userResponse = novoUsuario.toObject();
        delete userResponse.senha;
        delete userResponse.__v;

        return userResponse;
    }
}