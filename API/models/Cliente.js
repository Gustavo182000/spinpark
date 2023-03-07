const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    placa: String,
    veiculo: String,
    entrada: String,
    saida: String,
    pagamentotipo: String,
    valor: String,
    mensalista: String
});


module.exports = mongoose.model('Cliente',ClienteSchema);