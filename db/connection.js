  
//////////////////////////////////////////////////////////////////////////
//                            DATABASE CONNECTION                       //
//////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const db = require('dotenv').config()
mongoose.connect(`mongodb+srv://${process.env.USERNAMEATLAS}:${process.env.PASSWORDATLAS}@cluster0.ibuqu.mongodb.net/blog?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

let connection = mongoose.connection;

connection.on("error", console.error.bind(console, 'Erreur lors de la connexion'));
connection.once('open',() =>{ console.log("Connexion à la base OK"); }); 

module.exports = connection