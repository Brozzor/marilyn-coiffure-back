// To declare
//db and schema
const Reservation = require("../db/type/Reservation");
const ReservationShema = require("../db/shema/reservation");
const database = require("../db/connection");


//////////////////////////////////////////////////////////////////////////
//                                Crud Reservation                      //
/////////////////////////////////////////////////////////////////////////

async function avaibility() {//disponibilité

}

async function booking() {//crée une reservation

}

async function modifyBooking() {//modifie une reservation

}

async function removeBooking() {//retire une reservation

}

module.exports = {
    avaibility,
    booking,
    modifyBooking,
    removeBooking
};