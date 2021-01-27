const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let reservationSchema = new Schema({
    dateReservation: { type: Number, required: false },
    timetables:{ type: String, required: false },
    address: { type: Object, required: false },
    status: { type: String, required: true },
    derivatives: { type: Array, required: false },
    amount: { type: Number, required: false },
    paymentType: { type: String, required: false },
    uid: { type: Number, required: false },
    ip: { type: String, required: false },
    mobile: { type: Number, required: false },
    mail: { type: String, required: false },
    comment: { type: String, required: false },
    name: { type: String, required: true },
    dateInsertion: { type: Number, required: false },
    hours:{ type: Number, required: false },
},{ collection: "reservation" });
module.exports = mongoose.model('reservation', reservationSchema);   