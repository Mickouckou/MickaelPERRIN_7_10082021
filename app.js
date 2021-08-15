//  Importations
const express = require('express');
const apiRouter = require('./apiRouteur').router;

//  Instanciation du serveur
const app = express();

//  Résolution du problème de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//  Récupération des paramètres dans le body dans requêtes HTTP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//  Route post ancienne méthode
app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
});

app.use('/api/', apiRouter);


module.exports = app;