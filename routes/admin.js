// To declare
//db and schema
const User = require("../db/type/user");
const UserShema = require("../db/shema/user");
const Reservation = require("../db/type/Reservation");
const ReservationShema = require("../db/shema/reservation");
const SalonShema = require("../db/shema/salon");
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
    const balance = await SalonShema.find();
    return res.status(200).header("tokenSession", req.headers["tokensession"]).json(balance);
}

async function addToBalance(req, res) {
    const balance = await SalonShema.findOneAndUpdate({}, { $inc: { balance: req.body.amount } });


    return res.status(200).header("tokenSession", req.headers["tokensession"]).json(balance);
}

async function addBookingPaid(req, res) {//ajout des des reservation payé
    if (!req.body.amount) {
        return res.status(400).json({
            error: "Montant pas fournie",
        });
    }

    const reservationPaid = await ReservationShema.findOneAndUpdate({ _id: req.params.id }, { $set: { amount: req.body.amount, status: "paid" } });
}


module.exports = {
    bookinglist,
    balance,
    addToBalance,
    addBookingPaid
};