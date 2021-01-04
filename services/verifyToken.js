const UserShema = require("../db/shema/user");

module.exports = async (req, res, next) => {

  const searchBySessionToken = await UserShema.findOne({ tokenSession: req.headers['tokensession']});
  if (searchBySessionToken) {
    req.userByToken = searchBySessionToken;
   next();
  } else {
    await log.addLog(req,'reconnection.error');
    res.sendStatus(418);
    return false;
  }

}