const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@marilyn-buisson.fr",
    pass: process.env.MAILPASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

let mailOptions = {
  from: "Marilyn Buisson <contact@marilyn-buisson.fr>",
  to: "377roro@gmail.com",
  subject: "rien",
  html: "<p>Hello </p>",
  bcc: "contact@marilyn-buisson.fr"
};

module.exports = {
    transporter,
    mailOptions
};