import bcrypt from 'bcryptjs';

class PasswordUtils {
    
    async hashPassword(senhaPura) {
        return await bcrypt.hash(senhaPura, 10);
    }

    async comparePassword(senhaPura, senhaHash) {
        return await bcrypt.compare(senhaPura, senhaHash);
    }
}

export default new PasswordUtils();