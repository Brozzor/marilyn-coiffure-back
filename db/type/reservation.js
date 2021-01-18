module.exports = class Reservation {
    constructor(dateReservation, address) {
        this.dateReservation = dateReservation;
        this.address = address;
        this.status = "";
        this.derivatives = [];
        this.amount = 0;
        this.paymentType = "";
    };
}