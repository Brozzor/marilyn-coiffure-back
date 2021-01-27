const express = require("express");
const user = require("./routes/user");
const admin = require("./routes/admin");
const reservation = require("./routes/reservation");
const verifyToken = require("./services/verifyToken");

exports.router = (function () {
  let apiRouter = express.Router();

  //////////////////////////////////////////////////////////////////////////
  //                                 USER                                 //
  //////////////////////////////////////////////////////////////////////////

  // register user
  apiRouter.route("/register").post(user.registerUser);

  // connection user
  apiRouter.route("/connect").post(user.connectUser);

  // reconnect user
  apiRouter.route("/reconnect").post(verifyToken, user.reconnectUser);

  // my info
  apiRouter.route("/info").get(verifyToken, user.myInfo);

  // lost password - client
  apiRouter.route("/lost").post(user.lostPassword);

  // lost password - website
  apiRouter.route("/lost/reset").post(user.resetPassword);

  /*
  // info user
  apiRouter.route("/info/:id").get(verifyToken, user.infoUser);

  // edit profile
  apiRouter.route("/edit").put(verifyToken, user.editUser);
  */

  //////////////////////////////////////////////////////////////////////////
  //                                 Admin                                //
  //////////////////////////////////////////////////////////////////////////

  //dashboard
  apiRouter.route("/admin/dashboard").get(verifyToken, admin.dashboard);

  //affichage des reservation
  apiRouter.route("/admin/reservation").get(verifyToken, admin.reservation);

  //affichage d'une reservation
  apiRouter.route("/admin/reservation/:id").get(verifyToken, admin.displayOneReservation);

  //ajout d'une reservation
  apiRouter.route("/admin/reservation/add").post(verifyToken, admin.addReservation);

  //edit d'une reservation
  apiRouter.route("/admin/reservation/edit").post(verifyToken, admin.editReservation);
  //////////////////////////////////////////////////////////////////////////
  //                                 Réservation                          //
  //////////////////////////////////////////////////////////////////////////

  // register user
  apiRouter.route("/reservation/booking").post(reservation.booking);

  // cancel reservation
  apiRouter.route("/reservation/remove/:id").delete(reservation.removeBooking);

  return apiRouter;
})();
