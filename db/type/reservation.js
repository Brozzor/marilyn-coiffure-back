module.exports = class Reservation {
    constructor(dateReservation, address) {
        this.dateReservation = dateReservation;
        this.address = address;
        this.status = "";
        this.produitDerive = [];
        this.montant = 0;
        this.payementType = "";
        // tableau vide pour les produits dérivé
        // montant
        // moyen de paiement
    };
}