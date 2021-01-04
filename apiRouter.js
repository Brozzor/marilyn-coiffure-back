const express = require("express");
const user = require("./routes/user");
const status = require("./routes/status");
const watchList = require("./routes/watchList");
const friends = require("./routes/friends");
const verifyToken = require("./services/verifyToken");
const lastView = require("./services/lastView");

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
  apiRouter.route("/reconnect").post(verifyToken, lastView, user.reconnectUser);

  // my info
  apiRouter.route("/info").get(verifyToken, lastView, user.myInfo);

  // info user
  apiRouter.route("/info/:id").get(verifyToken, user.infoUser);

  // edit profile
  apiRouter.route("/edit").put(verifyToken, user.editUser);

  // lost password - client
  apiRouter.route("/lost").post(user.lostPassword);

  // lost password - website
  apiRouter.route("/lost/reset").post(user.resetPassword);



  return apiRouter;
})();