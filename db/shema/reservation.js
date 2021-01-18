const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let reservationSchema = new Schema({
    dateReservation: { type: String, required: true },
    address: {
        street: { type: String, required: true }, city: { type: String, required: true },
        zip: { type: String, required: true }
    },
    status: { type: String, required: true },
    derivatives: { type: Array, required: false, default: [] },
    amount: { type: Number, required: false },
    paymentType: { type: String, required: false },
});
module.exports = mongoose.model('reservation-data', reservationSchema);   