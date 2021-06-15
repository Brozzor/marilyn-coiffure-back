const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "ssl0.ovh.net",
  port: 465,
  secure: true,
  auth: {
    user: "contact@marilyn-coiffure.fr",
    pass: "&2P#_6!NjUdbw7)",
  },
  tls: {
    rejectUnauthorized: false,
  }
});

let mailOptions = {
  from: "Marilyn Buisson <contact@marilyn-coiffure.fr>",
  to: "marybui86@gmail.com",
  subject: "Prise de rendez vous",
  html: "<p>Hello </p>",
  bcc: "contact@marilyn-coiffure.fr"
};

module.exports = {
    transporter,
    mailOptions
};