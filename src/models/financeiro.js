import mongoose from "mongoose";

// Função para gerar um ID curto e único (ex: FIN-A1B2C3)
const generateUniqueId = () => {
  const numerosAleatorios = Math.floor(1000 + Math.random() * 9000);
  const anoAtual = new Date().getFullYear();
  return `FIN - ${numerosAleatorios}-${anoAtual}`;
};

const dataRegistro = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const financeiroSchema = new mongoose.Schema({
  // CORREÇÃO AQUI: Removido o async e definida a função corretamente
  _id: {
    type: String,
    default: generateUniqueId,
  },

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
    type: String,
    required: false,
  },
  observacao: {
    type: String,
    required: true,
  },
});

export default mongoose.model("financeiro", financeiroSchema);
