const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@marilyn-coiffure.fr",
    pass: process.env.MAILPASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

let mailOptions = {
  from: "Marilyn Buisson <contact@marilyn-coiffure.fr>",
  to: "contact@marilyn-coiffure.fr",
  subject: "Prise de rendez vous",
  html: "<p>Hello </p>",
  bcc: "contact@marilyn-coiffure.fr"
};

module.exports = {
    transporter,
    mailOptions
};