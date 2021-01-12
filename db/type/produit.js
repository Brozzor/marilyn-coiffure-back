module.exports = class Produit {
    constructor(nom, marque,description, prix, quantity) {
        this.nom = nom;
        this.marque = marque;
        this.description = description;
        this.prix = prix;
        this.quantity = quantity;
    }
}