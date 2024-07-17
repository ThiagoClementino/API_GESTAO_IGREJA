import mongoose from 'mongoose';

const { Schema } = mongoose;

const dataRegistro = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const comprovanteSchema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
});

const financeiroSchema = new Schema({
  dataderegistro: {
    type: String,
    required: false,
    default: dataRegistro,
  },
  tipodedado: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  statuspagamento: {
    type: String,
    required: true,
  },
  datapagamento: {
    type: String,
    required: true,
  },
  tipolancamento: {
    type: String,
    required: true,
  },
  comprovante: {
    type: comprovanteSchema,
    required: true,
  },
  observacao: {
    type: String,
    required: true,
  },
});

const Financeiro = mongoose.model('Financeiro', financeiroSchema);

export default Financeiro;
