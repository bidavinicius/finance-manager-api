import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    valor: { type: Number, required: true },
    tipo: { type: String, required: true, enum: ['receita', 'despesa'] },
    categoria: { type: String, required: true, enum :['Fixos', 'Carro', 'Mercado', 'Lazer', 'Comida', 'Presentes', 'Outros']},
    data: { type: Date, default: Date.now },
    
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;