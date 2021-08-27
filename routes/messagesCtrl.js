//  Importations
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.Utils');
const fs = require("fs");

//  Constantes
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;


//  Routes
module.exports = {
    createMessage: function(req, res) {
        //  Récupération de l'entête d'identification
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        
        //  Paramètres
        let title = req.body.title;
        let content = req.body.content;
        let image = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : ""

        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'paramètres manquants !' });
        }

        if(title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
            return res.status(400).json({ 'error': 'les paramètres doivent contenir plus de caractères' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    where: { id: userId }
                })
                .then (function (userFound) {
                    done(null, userFound);
                })
                .catch (function(err) {
                    return res.status(500).json({ 'error': 'incapacité à vérifier l\'utilisateur' });
                });
            },
            function(userFound, done) {
                if(userFound) {
                    models.Message.create({
                        title: title,
                        content: content,
                        image: image,
                        likes: 0,
                        UserId: userFound.id
                    })
                    .then (function(newMessage) {
                        done(newMessage);
                    })
                    .catch (function(err) {
                        return res.status(500).json({ 'error': 'impossible de créer le message' });
                    });
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé' });
                }
            }
        ], function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error': 'impossible d\'enregister le message' });
            }
        });
    },
    listMessages: function(req, res) {
        const fields = req.query.fields;
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        const order = req.query.order;

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['updatedAt', 'DESC']],
            attributes: (fields !== '*' && fields!= null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: ['username']
            }]
        })
        .then (function (messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "aucun message trouvé" });
            }
        })
        .catch (function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'champs invalides' });
        });
    },
    getOneMessage: function(req, res) {
        //  Récupération de l'identifiant du message
        const messageId = req.params.id;

        models.Message.findOne({
            include: [{
                model: models.User,
                attributes: ['username']
            }],
            where: { id: messageId}
        })
        .then (function (messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "aucun message trouvé" });
            }
        })
        .catch (function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'champs invalides' });
        });
    },
    modifyMessage: function(req, res) {
        //  Récupération de l'identifiant du message
        const messageId = req.params.id;

        //  Paramètres
        const title = req.body.title;
        const content = req.body.content;
        let image = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : ""

        asyncLib.waterfall([
            function(done) {
                models.Message.findOne({
                    attributes: ['id', 'title', 'content'],
                    where: { id: messageId}
                }) .then (function (messageFound) {
                    done(null, messageFound);
                }) .catch (function(err) {
                    return res.status(500).json({'error': 'incapable de vérifier le message'});
                });
            },
            function(messageFound, done) {
                if (messageFound) {
                    messageFound.update({
                        title: (title ? title : messageFound.title),
                        content: (content ? content : messageFound.content),
                        image: (image ? image : messageFound.image)
                    }) .then (function() {
                        done(messageFound);
                    }) .catch (function(err) {
                        res.status(500).json({'error': 'impossible de modifier le message'});
                    });
                } else {
                    res.status(404).json({'error': 'Message non trouvé'});
                }
            },
        ], function (messageFound) {
            if(messageFound) {
                return res.status(201).json(messageFound);
            } else {
                res.status(500).json({'error': 'incapable de modifier le message en cours'});
            }
        });
    },
    deleteMessage: function(req, res) {
        //  Récupération de l'identifiant du message
        const messageId = req.params.id;

        models.Message.destroy({
            where: { id: messageId }
          })
        .then(function() { 
            return res.status(201).json({ 'message': 'Message supprimé'});
        }) .catch (function(err) {
            return res.status(500).json({ 'error': 'On ne peut pas supprimer le message' });
        });
    }
}