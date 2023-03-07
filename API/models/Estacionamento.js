const mongoose = require('mongoose');

const EstacionamentoSchema = new mongoose.Schema({
    nome: String,
    numvagas: Number
});


module.exports = mongoose.model('Estacionamento',EstacionamentoSchema);