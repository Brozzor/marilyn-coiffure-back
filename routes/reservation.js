// To declare
//db and schema
const Reservation = require("../db/type/reservation");
const ReservationShema = require("../db/shema/reservation");
const database = require("../db/connection");


//////////////////////////////////////////////////////////////////////////
//                                Crud Reservation                      //
/////////////////////////////////////////////////////////////////////////

async function avaibility(req, res) {//disponibilité

}

async function booking(req, res) {//crée une reservation

}

async function modifyBooking(req, res) {//modifie une reservation

}

async function removeBooking(req, res) {//retire une reservation

}

module.exports = {
    avaibility,
    booking,
    modifyBooking,
    removeBooking
};