// To declare
//db and schema
const Reservation = require("../db/type/reservation");
const ReservationShema = require("../db/shema/reservation");
const mailCheck = require("email-validator");
const database = require("../db/connection");

//////////////////////////////////////////////////////////////////////////
//                                Crud Reservation                      //
/////////////////////////////////////////////////////////////////////////

async function avaibility(req, res) {
  //disponibilité
}

async function booking(req, res) {
  //crée une reservation

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  //const ip = req.headers["x-forwarded-for"].split(',')[0] || req.connection.remoteAddress;

  /*
    if (await isUserExist.byMail(req.body.mail)) {
      return res.status(400).json({
        status: "Mail is already use",
      });
    }*/

  if (!req.body.reservation || !req.body.street || !req.body.city || !req.body.zip || !req.body.mobile || !mailCheck.validate(req.body.mail)) {
    return res.status(400).json({
      error: "Formulaire incorrect",
    });
  }

  newBook = new ReservationShema(new Reservation(req.body.reservation, req.body.street, req.body.city, req.body.zip, 0, ip, req.body.mobile, req.body.mail));
  newBook.save((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    } else {
      return res.sendStatus(200);
    }
  });
}

async function modifyBooking(req, res) {
  //modifie une reservation
}

async function removeBooking(req, res) {
  //retire une reservation
}

module.exports = {
  avaibility,
  booking,
  modifyBooking,
  removeBooking,
};
