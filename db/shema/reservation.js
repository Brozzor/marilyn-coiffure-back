const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let reservationSchema = new Schema({
    dateReservation: { type: String, required: true },
    address: {
        street: { type: String, required: true }, city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    status: { type: String, required: true },
    produitDerive: { type: Array, required: false, default: [] },
    montant: { type: Number, required: false },
    payementType: { type: String, required: false },
});
module.exports = mongoose.model('reservation-data', reservationSchema);   
