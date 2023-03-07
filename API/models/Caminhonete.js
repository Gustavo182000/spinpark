const mongoose = require('mongoose');

const CaminhoneteSchema = new mongoose.Schema({
    ate15min: String,
    ate30min: String,
    ate1hr: String,
    adc1hr: String
});


module.exports = mongoose.model('Caminhonete',CaminhoneteSchema);