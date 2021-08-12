//  Importations
var express = require('express');
//var bodyParser = require('body-parser'); // Pas à jour
var apiRouter = require('./apiRouteur').router;

//  Instanciation du serveur
var server = express();

//  Récupération des paramètres dans le body dans requêtes HTTP
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//  Configuration des routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur !</h1>');
});

server.use('/api/', apiRouter);

//  Lancement du serveur
server.listen(8080, function() {
    console.log('Serveur en écoute ;)');
});