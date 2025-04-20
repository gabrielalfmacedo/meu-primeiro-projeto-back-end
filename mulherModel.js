const mongoose = require('mongoose')

const mulherSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    imagem: { type: String, required: true },
    citacao: { type: String, required: true },
    minibio: { type: String, required: true }
})

// Nome do modelo como 'diva'
module.exports = mongoose.model('diva', mulherSchema)
