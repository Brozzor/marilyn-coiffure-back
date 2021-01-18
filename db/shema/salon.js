  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let userSchema = new Schema({

    name: { type: String, required: true },
    totalAmount: { type: Number, required: false }

},{ collection: "salon" });

module.exports = mongoose.model('salon', userSchema);    