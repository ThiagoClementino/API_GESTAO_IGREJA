import mongoose from 'mongoose';

const dataRegistro = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

const financeiroSchema = new mongoose.Schema({

dataderegistro: {
    type: String,
    required: false,
    default: dataRegistro,
},    
tipodedado:{
    type: String,
    required: true
},    
valor: {
    type:Number,
    required: true
},
statuspagamento: {
    type:String,
    required: true
},
datapagamento: {
    type:String,
    required: true
},
tipolancamento: {
    type: String,
    required: true
},
comprovante: {
    type: String,
    required: false
},
observacao: {
    type:String,
    required: true
}


});

 

export default mongoose.model('financeiro', financeiroSchema);