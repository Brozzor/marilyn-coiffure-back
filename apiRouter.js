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

  /*
  // info user
  apiRouter.route("/info/:id").get(verifyToken, user.infoUser);

  // edit profile
  apiRouter.route("/edit").put(verifyToken, user.editUser);
  */

  //////////////////////////////////////////////////////////////////////////
  //                                 Admin                                //
  //////////////////////////////////////////////////////////////////////////

  //salon balance
  apiRouter.route("/admin/balance").get(verifyToken, admin.balance);
  // add To Balance
  apiRouter.route("/admin/balance/add").post(verifyToken, admin.addToBalance);

  // lost password - client
  apiRouter.route("/lost").post(user.lostPassword);

  // lost password - website
  apiRouter.route("/lost/reset").post(user.resetPassword);


  //////////////////////////////////////////////////////////////////////////
  //                                 Réservation                           //
  //////////////////////////////////////////////////////////////////////////

  // register user
  apiRouter.route("/reservation/booking").post(reservation.booking);

  return apiRouter;
})();
