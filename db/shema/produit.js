const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let produitSchema = new Schema({
    nom: { type: String, required: [true, 'Rentrer un nom'], lowercase: true },
    marque: { type: String, required: true },
    prix: { type: Number, required: true }
})
module.exports = mongoose.model('produit-data', produitSchema);   