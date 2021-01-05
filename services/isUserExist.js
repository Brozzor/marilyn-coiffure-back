const UserShema = require("../db/shema/user");

async function byId(id) {
  const isExist = await UserShema.findOne({ _id: id });
  if (isExist) {
    return true;
  }
  return false;
}

async function byMail(mail) {
  const isExist = await UserShema.findOne({ mail: mail });
  if (isExist) {
    return true;
  }
  return false;
}

async function byPseudo(pseudo) {
  const isExist = await UserShema.findOne({ pseudo: pseudo });
  if (isExist) {
    return true;
  }
  return false;
}

module.exports = {
  byId,
  byMail,
  byPseudo,
};
