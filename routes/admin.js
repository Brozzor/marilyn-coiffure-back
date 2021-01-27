// To declare
//db and schema
const User = require("../db/type/user");
const UserShema = require("../db/shema/user");
const Reservation = require("../db/type/reservation");
const ReservationShema = require("../db/shema/reservation");
const SalonShema = require("../db/shema/salon");
const database = require("../db/connection");

//////////////////////////////////////////////////////////////////////////
//                                Crud Admin                            //
/////////////////////////////////////////////////////////////////////////

async function bookinglist(req, res) {
  //list des rende-vous à venir
  const bookingList = await ReservationShema.find();
}
async function booking(req, res) {
  const booking = await ReservationShema.findById(req.params.bookId);
}
async function balance(req, res) {
  //balance de la société
  const balance = await SalonShema.find();
  return res.status(200).json(balance);
}

async function dashboard(req, res) {
  let ret = {};
  const lastMonth = Math.round(+new Date() / 1000) - 2592000;
  const bookingList = await ReservationShema.find().limit(5);
  const bookingLast30Days = await ReservationShema.find({ dateReservation: { $gt: lastMonth } });
  let amountLast30Days = 0;
  let nbBookingLast30DaysPay = 0;
  bookingLast30Days.forEach((elem) => {
    if (elem.amount) {
      amountLast30Days += elem.amount;
      nbBookingLast30DaysPay++;
    }
  });

  ret.lastBooking = bookingList;
  ret.nbBookingLast30Days = bookingLast30Days.length;
  ret.amountLast30Days = amountLast30Days;
  ret.nbBookingLast30DaysPay = nbBookingLast30DaysPay;
  return res.status(200).json(ret);
}

async function reservation(req, res) {
    
    const lastMonth = Math.round(+new Date() / 1000) - 2592000;
    const nextThreeMonth = Math.round(+new Date() / 1000) + (2592000 * 3);

    const bookingList = await ReservationShema.find({ dateReservation: { $gt: lastMonth, $lt: nextThreeMonth } });
    return res.status(200).json(bookingList);
  }

async function addToBalance(req, res) {
  const balance = await SalonShema.findOneAndUpdate({}, { $inc: { balance: req.body.amount } });

  return res.status(200).json(balance);
}

async function addBookingPaid(req, res) {
  //ajout des des reservation payé
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
  addBookingPaid,
  dashboard,
  reservation
};
