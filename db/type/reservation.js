module.exports = class Reservation {
    constructor(dateReservation, street, city, zip, uid, ip, mobile, mail) {
        this.dateReservation = dateReservation;
        this.address = {
            street: street,
            city: city,
            zip: zip,
          };
        this.status = "";
        this.derivatives = [];
        this.amount = 0;
        this.paymentType = "";
        this.uid = uid;
        this.ip = ip;
        this.mobile = mobile;
        this.mail = mail;
    };
}