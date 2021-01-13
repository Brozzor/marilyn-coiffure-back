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

async function bookinglist(req, res) {//list des rende-vous à venir
    const bookingList = await ReservationShema.find()
}
async function booking(req, res) {
    const booking = await ReservationShema.findById(req.params.bookId);
}
async function balance(req, res) {//balance de la société

}

async function addBookingPaid(req, res) {//ajout des des reservation payé

}


module.exports = {
    bookinglist,
    balance,
    addBookingPaid
};