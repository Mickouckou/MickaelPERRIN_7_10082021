//  Importations
var express = require('express');

//  Instanciation du serveur
var server = express();

//  Configuration des routes
server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur !</h1>');
});

//  Lancement du serveur
server.listen(8080, function() {
    console.log('Serveur en écoute ;)');
})