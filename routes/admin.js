// To declare
//db and schema
const User = require("../db/type/user");
const UserShema = require("../db/shema/user");
const Reservation = require("../db/type/Reservation");
const ReservationShema = require("../db/shema/reservation");
const database = require("../db/connection");


//////////////////////////////////////////////////////////////////////////
//                                Crud Admin                            //
/////////////////////////////////////////////////////////////////////////

async function bookinglist() {//list des rende-vous à venir

}
async function balance() {//balance de la société

}

async function addBookingPaid() {//ajout des des reservation payé

}


module.exports = {
    bookinglist,
    balance,
    addBookingPaid
};