// To declare
//db and schema
const User = require("../db/type/user");
const UserShema = require("../db/shema/user");
const database = require("../db/model");
//lib
const db = require("dotenv").config();
const bcrypt = require("bcrypt");
const mailCheck = require("email-validator");
const randKey = require("random-key");
const notifications = require("../services/notifications");
const isUserExist = require("../services/isUserExist");
const log = require("../services/logs");
const mail = require("../services/mail")

// Function
async function registerUser(req, res) {
  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(req.body.password, salt);
  const ip = req.headers["x-forwarded-for"].split(',')[0] || req.connection.remoteAddress;

  if (!(await log.checkLog(req, "register.success"))) {
    return res.sendStatus(417);
  }

  if (await isUserExist.byMail(req.body.mail)) {
    return res.status(400).json({
      status: "Mail is already use",
    });
  }

  if ((await isUserExist.byPseudo(req.body.pseudo)) && !/^[A-Z,a-z,0-9]{4,12}$/.test(req.body.pseudo)) {
    return res.status(400).json({
      status: "Pseudo is already use",
    });
  }

  newUser = new UserShema(new User(req.body.mail, req.body.pseudo, password, ip));
  newUser.save((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(400);
    } else {
      log.addLog(req, "register.success." + data._id);
      return updateUser(data._id, randKey.generate(250), res);
    }
  });
}

async function connectUser(req, res) {
  if (!mailCheck.validate(req.body.mail)) {
    return res.sendStatus(400);
  }

  if (!(await log.checkLog(req, "connection.error"))) {
    return res.sendStatus(417);
  }

  const user = await UserShema.findOne({ mail: req.body.mail });

  if (!user) {
    await log.addLog(req, "connection.error");
    return res.status(400).json({
      status: "error - mail or password is invalid",
    });
  }

  const decodedHash = await bcrypt.compare(req.body.password, user.password);
  if (decodedHash) {
    return updateUser(user._id, randKey.generate(250), res);
  } else {
    await log.addLog(req, "connection.error");
    return res.status(400).json({
      status: "error - mail or password is invalid",
    });
  }
}

async function reconnectUser(req, res) {
  return res.status(200).json({
    status: "success",
  });
}

async function myInfo(req, res) {
  req.userByToken.password = undefined;
  req.userByToken.tokenSession = undefined;
  req.userByToken.createIp = undefined;
  req.userByToken.__v = undefined;
  return res.status(200).json(req.userByToken);
}

async function infoUser(req, res) {
  const userByToken = await UserShema.findOne({ _id: req.params.id }, { _id: 1, friends: 1, watchList: 1, pseudo: 1, createDate: 1, lastView: 1, rank: 1, avatar: 1, bio: 1 });
  if (userByToken) {
    return res.status(200).json(userByToken);
  }
}

async function editUser(req, res) {
  if (((await isUserExist.byPseudo(req.body.pseudo)) && req.body.pseudo != req.userByToken.pseudo) || !/^[A-Z,a-z,0-9]{4,12}$/.test(req.body.pseudo)) {
    return res.status(400).json({
      error: "Please enter a valid pseudo (min length 4) and (max length 12)",
    });
  }

  if (req.body.avatarColor != "purple" && req.body.avatarColor != "red" && req.body.avatarColor != "orange" && req.body.avatarColor != "blue") {
    return res.status(400).json({
      error: "Color is invalid",
    });
  }

  if (req.body.bio && req.body.bio.length > 160) {
    return res.status(400).json({
      error: "Please enter a valid bio (max length 160 characters)",
    });
  }

  await UserShema.findOneAndUpdate(
    { _id: req.userByToken._id },
    {
      $set: {
        pseudo: req.body.pseudo,
        avatar: {
          color: req.body.avatarColor,
          name: req.body.avatarName,
          link: null,
        },
        bio: req.body.bio,
      },
    }
  );
  return res.sendStatus(200);
}

async function deleteNotification(req, res) {
  await notifications.deleteNotif(req.userByToken._id, req.params.id);
  return res.status(200).json({
    status: "success",
  });
}

async function readNotification(req, res) {
  await notifications.readNotif(req.userByToken._id, req.body.id);
  return res.status(200).json({
    status: "success",
  });
}
async function sendNotification(req, res) {
  await notifications.sendNotif(req.userByToken._id, req.body.id);
  return res.status(200).json({
    status: "success",
  });
}

async function updateUser(id, tokenSession, res) {
  const update = await UserShema.findOneAndUpdate({ _id: id }, { $set: { tokenSession: tokenSession } });

  if (update) {
    return res.status(200).header("tokenSession", tokenSession).json({
      status: "success",
    });
  } else {
    return res.sendStatus(400);
  }
}

async function lostPassword(req, res) {
  const userByMail = await UserShema.findOne({ mail: req.body.mail });
  if (!userByMail) {
    return res.status(200).json({ status: "If the account exists, a mail has been sent to this address" });
  }

  const now = Math.round(+new Date() / 1000);
  if ((now - userByMail.resetDate) < 120){
    return res.status(400).json({ error: "Sorry , retry later" });
  }

  const token = randKey.generate(40);
  mail.mailOptions.html = `
        <div align="center">
					<br />
					<p>Reset your password link :</p><br />
          <u><a href="https://clicknchill.net/lost-password/${token}">https://clicknchill.net/lost-password/${token}</a></u><br />
			</div>
        `;
  mail.mailOptions.to = req.body.mail;
  await UserShema.findOneAndUpdate({ _id: userByMail._id }, { $set: { resetToken: token,resetDate: Math.round(+new Date() / 1000) } });

  mail.transporter.sendMail(mail.mailOptions, function (error, info) {
    if (error) {
      //console.log(error);
      return res.status(400).json({ error: "Sorry , retry later" });
    } else {
      return res.status(200).json({ status: "If the account exists, a mail has been sent to this address" });
    }
  });
}

async function resetPassword(req, res) {

  if (!req.body.resetToken){
    return res.sendStatus(400);
  }

  const userByResetToken = await UserShema.findOne({ resetToken: req.body.resetToken });
  const now = Math.round(+new Date() / 1000);

  if (!userByResetToken || (now - userByResetToken.resetDate) > 1200) {
    return res.sendStatus(400);
  }

  if (!req.body.password){
    return res.sendStatus(200);
  }

  if (req.body.password.length < 6){
    return res.status(400).json({ error: "Sorry , your password is too short (min length: 6)" });
  }else{
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(req.body.password, salt);
    await UserShema.findOneAndUpdate({ _id: userByResetToken._id }, { $set: { password: password } });
    return res.sendStatus(200);
  }

}

module.exports = {
  registerUser,
  connectUser,
  reconnectUser,
  infoUser,
  deleteNotification,
  readNotification,
  sendNotification,
  myInfo,
  editUser,
  lostPassword,
  resetPassword
};