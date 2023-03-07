const mongoose = require('mongoose');

const MotoSchema = new mongoose.Schema({
    ate15min: String,
    ate30min: String,
    ate1hr: String,
    adc1hr: String
});


module.exports = mongoose.model('Moto',MotoSchema);