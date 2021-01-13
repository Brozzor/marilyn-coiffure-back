const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let reservationSchema = new Schema({
    dateReservation: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    produitDerive: { type: Array, required: false },
    montant: { type: Number, required: false },
    payementType: { type: String, required: false },
});