const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let produitSchema = new Schema({
    name: { type: String, required: [true, 'Rentrer un nom'], lowercase: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true }
})
module.exports = mongoose.model('product', produitSchema);   