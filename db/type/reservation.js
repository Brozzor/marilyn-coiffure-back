module.exports = class Reservation {
    constructor(dateReservation, street, city, zip, uid, ip, mobile, mail, comment, timetables, name) {
        this.dateReservation = dateReservation;
        this.address = {
            street: street,
            city: city,
            zip: zip,
          };
        this.status = "unpaid";
        this.derivatives = [];
        this.amount = 0;
        this.paymentType = "";
        this.uid = uid;
        this.ip = ip;
        this.mobile = mobile;
        this.mail = mail;
        this.comment = comment;
        this.timetables = timetables;
        this.name = name;
    };
}