const express = require("express");

const reservation = require("./routes/reservation");


exports.router = (function () {
  let apiRouter = express.Router();


  //////////////////////////////////////////////////////////////////////////
  //                                 Réservation                          //
  //////////////////////////////////////////////////////////////////////////

  // register user
  apiRouter.route("/reservation/booking").post(reservation.booking);

  return apiRouter;
})();
