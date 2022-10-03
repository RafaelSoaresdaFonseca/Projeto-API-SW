var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* Buscar Cadastrados */
router.get('/cadastro', function (req, res, next) {
    var db = require('./db');
    var Cadastro = db.Mongoose.model('cadastro', db.CadastroSchema, 'cadastro');
    Cadastro.find({}).lean().exec(function(e,docs){
       res.json(docs);
       res.end();
    });
});

// Buscar apenas um cadastro
router.get('/cadastro/:id', function (req, res, next) {
  var db = require('./db');
  var Cadastro = db.Mongoose.model('cadastro', db.CadastroSchema, 'cadastro');
  Cadastro.find({ _id: req.params.id }).lean().exec(function (e, docs) {
      res.json(docs);
      res.end();
  });
});

//Cadastro novo
router.post('/cadastro/', function (req, res, next) {
  var db = require('./db');
  var Cadastro = db.Mongoose.model('cadastro', db.CadastroSchema, 'cadastro');
  var newcadastro = new Cadastro({ name: req.body.name, email: req.body.email, senha: req.body.senha });
  newcadastro.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newcadastro);
      res.end();
  });
});

//Alterar cadastro
router.put('/cadastro/:id', function (req, res, next) {
  var db = require('./db');
  var Cadastro = db.Mongoose.model('cadastro', db.CadastroSchema, 'cadastro');
  Cadastro.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function (err, doc) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(req.body);
      res.end();
  });
});

//Deletar Cadastro
router.delete('/cadastro/:id', function (req, res, next) {
    var db = require('./db');
    var Cadastro = db.Mongoose.model('cadastro', db.CadastroSchema, 'cadastro');
    Cadastro.find({ _id: req.params.id }).remove(function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            res.end();
            return;
        }
        res.json({success: true});
        res.end();
    });
});

module.exports = router;
