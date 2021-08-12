//  Importations
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const models = require('../models');

//  Routes
module.exports = {
    register: function(req, res) {
        
        //  Paramètres
        var email    = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var avatar = req.body.avatar;
        
        //console.log (email + " " + username + " " + password + " " + avatar);
        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants !' });
        }

        // TODO longueur pseudo regex mdp...

        models.User.findOne ({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    avatar: avatar,
                    isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({
                            'userId': newUser.id
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
                });
            } else {
              return res.status(409).json({ 'error': 'Utilisateur déjà existant ' });
            }
          }) 
        .catch(function(err) {
            return res.status(500).json({ 'error': 'pffffff' });
        });
    },
    login: function(req, res) {
        //  TODO
    }

}