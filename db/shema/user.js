  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    mail: { type: String, required: [true, 'Please enter an email'], lowercase: true},
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: Object, required: true },
    createDate: { type: Number, required: true },
    tokenSession: { type: String, required: false },
    createIp: { type: String, required: true },
    lastView: { type: Number, required: false },
    rank: { type: Number, required: false },
    resetPassword: { type: Object, required: true }
},{ collection: "user-data" });

module.exports = mongoose.model('user-data', userSchema);    