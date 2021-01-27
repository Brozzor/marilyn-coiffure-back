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
  const nextThreeMonth = Math.round(+new Date() / 1000) + 2592000 * 3;

  const bookingList = await ReservationShema.find({ dateReservation: { $gt: lastMonth, $lt: nextThreeMonth } });
  return res.status(200).json(bookingList);
}

async function displayOneReservation(req, res) {
  const reservation = await ReservationShema.findById(req.body.id);
  return res.status(200).json(reservation);
}

async function addReservation(req, res) {
 
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!req.body.reservation || !req.body.mobile || !mailCheck.validate(req.body.mail) || !req.body.name){
      return res.status(400).json({
        error: "Formulaire incomplet/incorrect",
      });
    }
  
    newBook = new ReservationShema(new Reservation(req.body.reservation, req.body.street, req.body.city, req.body.zip, 0, ip, req.body.mobile, req.body.mail, req.body.comment,req.body.timetables, req.body.name));
    newBook.save((err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Formulaire incomplet/incorrect",
        });
      } else {
        return res.sendStatus(200);
      }
    });
      
}

async function editReservation(req, res) {

    await ReservationShema.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            dateReservation: req.body.dateReservation,
            address: {
              street: req.body.street,
              city: req.body.city,
              zip: req.body.zip,
            },
            status: req.body.status,
            amount: req.body.amount,
            paymentType: req.body.paymentType,
            mail: req.body.mobile,
            hours: req.body.mobile,
          },
        }
      );
      return res.sendStatus(200);
}

async function addToBalance(req, res) {
  const balance = await SalonShema.findOneAndUpdate({}, { $inc: { balance: req.body.amount } });
  return res.status(200).json(balance);
}

module.exports = {
  bookinglist,
  balance,
  addToBalance,
  dashboard,
  reservation,
  displayOneReservation,
  addReservation,
  editReservation,
};
