//  Importations
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.Utils');
var models = require('../models');
var asyncLib = require('async');

//  Constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

//  Routes
module.exports = {
    register: function(req, res) {
        
        //  Paramètres
        var email    = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var avatar = req.body.avatar;
        
        if (email == null || username == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants !' });
        }

        if(username.length >= 16 || username.length <=3) {
            return res.status(400).json({ 'error': 'le nom d\'utilisateur doit contenir entre 4 et 15 caractères' });
        }

        if(!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Veuillez entrer un email valide' });
        }

        if(!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({ 'error': 'Mdp entre 4 et 12 caractères avec au moins un chiffre'});
        }

        //  Waterfall
        asyncLib.waterfall([
            function(done) {
                models.User.findOne ({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then(function(userFound) {
                    done(null, userFound);
                }) 
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Incapable de vérifier l\'utilisateur' });
                });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'Utilisateur déjà existant ' });
                }
            },
            function (userFound, bcryptedPassword, done) {
                var newUser = models.User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    avatar: avatar,
                    isAdmin: 0
                })
                .then(function(newUser) {
                    done(newUser);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'l\'utilisateur ne peut pas être ajouté' });
                }); 
            }
        ], function (newUser) {
            if(newUserr) {
                return res.status(201).json({ 'userId': newUser.id});
            } else {
                return res.status(404).json({ 'error': 'impossibilité d\'ajouter un utilisateur'});
            }
        });


        //Version avec promesses imbriquées sans waterfall
        /*models.User.findOne ({
            attributes: ['email'],
            where: { email: email }
        })
        .then(function(userFound) {
            if (!userFound) {
                bcrypt.hash(password, 5, function( err, bcryptedPassword ) {
                    const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        avatar: avatar,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        return res.status(201).json({ 'userId': newUser.id })
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'l\'utilisateur ne peut pas être ajouté' });
                    });
                });
            } else {
                return res.status(409).json({ 'error': 'Utilisateur déjà existant ' });
            }
        }) 
        .catch(function(err) {
            return res.status(500).json({ 'error': 'Incapable de vérifier l\'utilisateur' });
        });*/
    },
    login: function(req, res) {
        var email    = req.body.email;
        var password = req.body.password;
        
        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'paramètres manquants !' });
        }

        //  TODO
        models.User.findOne ({
            where: { email: email }
        })
        .then(function(userFound) {
            if(userFound) {
                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                    if(resBycrypt) {
                        return res.status(200).json({ 
                            'userId': userFound.id, 
                            'token': jwtUtils.generateToken(userFound)
                        });
                    } else {
                        return res.status(404).json({ 'error': 'Mot de passe invalide' }); 
                    } 
                })
            } else {
                return res.status(404).json({ 'error': 'L\'utilisateur n\'existe pas dans la base de données' });
            }
        }) 
        .catch(function(err) {
            return res.status(500).json({ 'error': 'Incapable de vérifier l\'utilisateur' });
        });
    },
    getUserProfile: function(req, res) {
        //  Récupération de l'entête d'identification
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'Mauvais token' });

        models.User.findOne({
            attributes: ['id', 'email', 'username', 'avatar'],
            where: { id: userId }
        }) .then (function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'Utilisateur introuvable' });
            }
        }) .catch (function(err) {
            return res.status(500).json({ 'error': 'On ne peut pas aller chercher l\'utilisateur' });
        });
    },
    updateUserProfile: function(req, res) {
        //  Récupération de l'entête d'identification
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //  Paramètres
        var avatar = req.body.avatar;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'avatar'],
                    where: { id: userId }
                }) .then (function (userFound) {
                    done(null, userFound);
                }) .catch (function(err) {
                    return res.status(500).json({'error': 'incapable de vérifier l\'utilisateur'});
                });
            },
            function(userFound, done) {
                if (userFound) {
                    userFound.update({
                        avatar: (avatar ? avatar : userFound.avatar)
                    }) .then (function() {
                        done(userFound);
                    }) .catch (function(err) {
                        res.status(500).json({'error': 'impossible de modifier l\'utilisateur'});
                    });
                } else {
                    res.status(404).json({'error': 'Utilisateur non trouvé'});
                }
            },
        ], function (userFound) {
            if(userFound) {
                return res.status(201).json(userFound);
            } else {
                res.status(500).json({'error': 'incapable de modifier le profil utilisateur'});
            }
        });
    }
}