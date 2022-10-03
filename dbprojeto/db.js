var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dbprojeto');
 
var cadastroSchema = new mongoose.Schema({
    name: String,
    email: String,
    senha: String
}, { collection: 'cadastro' }
);
 
module.exports = { Mongoose: mongoose, CadastroSchema: cadastroSchema }