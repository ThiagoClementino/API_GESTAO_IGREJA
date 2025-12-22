import mongoose from "mongoose";

// Função para gerar um ID curto e único (ex: FIN-A1B2C3)
const generateUniqueId = () => {
  const numerosAleatorios = Math.floor(1000 + Math.random() * 9000);
  const anoAtual = new Date().getFullYear();
  return `FIN - ${numerosAleatorios}-${anoAtual}`;
};

const dataRegistro = () => {
  const now = new Date();
  // Isso garante o formato DD/MM/AAAA usando o padrão brasileiro
  return now.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
    default: dataRegistro, // O Mongoose chamará a função acima no momento do save
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
