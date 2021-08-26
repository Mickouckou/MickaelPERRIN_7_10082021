//  Importations
const express = require('express');
const apiRouter = require('./apiRouteur').router;
const path = require('path');

//  Instanciation du serveur
const app = express();

//  Résolution du problème de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//  Récupération des paramètres dans le body des requêtes HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/', apiRouter);


module.exports = app;