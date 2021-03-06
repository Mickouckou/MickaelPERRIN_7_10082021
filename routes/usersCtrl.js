//  Importations
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.Utils');
const models = require('../models');
const asyncLib = require('async');

//  Constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

//  Routes
module.exports = {
    register: function(req, res, next) {
        
        //  Paramètres
        const email    = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const avatar = req.body.avatar;
        
        if (email === null || username === null || password === null) {
            return res.status(400).json({ 'error': 'paramètres manquants !' });
        }
        else if(username.length >= 16 || username.length <=3) {
            return res.status(400).json({ 'error': 'le nom d\'utilisateur doit contenir entre 4 et 15 caractères' });
        }
        else if(!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'Veuillez entrer un email valide' });
        }
        else if(!PASSWORD_REGEX.test(password)) {
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
                const newUser = models.User.create({
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
            if(newUser) {
                return res.status(201).json({ 
                    'userId': newUser.id,
                    'token': jwtUtils.generateToken(newUser)
                });
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
    login: function (req, res, next) {
        models.User.findOne({ 
            where: { email: req.body.email }
        })
        .then(function(userFound) {
            if (!userFound) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, userFound.password)
                .then(function(valid) {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        'userId': userFound.id,
                        'isAdmin': userFound.isAdmin,
                        'token': jwtUtils.generateToken(userFound)
                    });
                })
                .catch(error => res.status(500).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
    },
    getUserProfile: function(req, res, next) {
        //  Récupération de l'entête d'identification
        //const userId = req.params.id;
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

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
    updateUserProfile: function(req, res, next) {
        //  Récupération de l'entête d'identification
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //  Paramètres
        const avatar = req.body.avatar;
        const email = req.body.email;
        const username = req.body.username;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'email', 'username', 'avatar'],
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
                        email: (email ? email : userFound.email),
                        username: (username ? username : userFound.username),
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
    },
    deleteUserProfile (req, res, next) {
        //  Récupération de l'entête d'identification
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        models.User.destroy({
            where: { id: userId }
        })
        .then(function() { 
            return res.status(201).json({ 'message': 'Utilisateur supprimé'});
        }) .catch (function(err) {
            return res.status(500).json({ 'error': 'On ne peut pas supprimer l\'utilisateur' });
        });
    }   
}