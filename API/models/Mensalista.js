const mongoose = require('mongoose');

const MensalistaSchema = new mongoose.Schema({
    cpfcnpj: String,
    nome: String,
    cep: String,
    endereco: String,
    bairro: String,
    cidade: String,
    uf: String,
    telefone: String,
    celular: String,
    email: String,
    valorplano: String,
    observacao: String,
    placa: String,
    veiculo: String
});


module.exports = mongoose.model('Mensalista',MensalistaSchema);