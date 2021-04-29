// To declare
//db and schema
const mailCheck = require("email-validator");

//////////////////////////////////////////////////////////////////////////
//                                Crud Reservation                      //
/////////////////////////////////////////////////////////////////////////


async function booking(req, res) {
  //crée une reservation

  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!req.body.reservation || !req.body.street || !req.body.city || !req.body.zip || !req.body.mobile || !mailCheck.validate(req.body.mail) || !req.body.timetables || !req.body.name){
    return res.status(400).json({
      error: "Formulaire incomplet/incorrect",
    });
  }

  mail.mailOptions.html = `
  <div align="center">
    <br />
    <u>Adresse IP :</u>${ip}<br />
    <u>Nom :</u>${req.body.name}<br />
    <u>Rue :</u>${req.body.street}<br />
    <u>Ville :</u>${req.body.city}<br />
    <u>Code postal :</u>${req.body.zip}<br />
    <u>Numéro de telephone :</u><a href="tel:${req.body.mobile}">${req.body.mobile}</a><br />
    <u>Mail de l'expéditeur :</u>${req.body.email}<br />
    <u>heure de la journée privilégier :</u>${req.body.timetables}<br />
    <u>jour demander :</u>${req.body.reservation}<br />
    </div>
  `;

  mail.transporter.sendMail(mail.mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "Formulaire incomplet/incorrect",
      });
    } else {
      return res.sendStatus(200);
    }
  });
}




module.exports = {
  booking,
};
