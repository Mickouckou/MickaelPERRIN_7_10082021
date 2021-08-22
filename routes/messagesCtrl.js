//  Importations
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.Utils');

//  Constantes
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;


//  Routes
module.exports = {
    createMessage: function(req, res) {
        //  Récupération de l'entête d'identification
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //  Paramètres
        var title = req.body.title;
        var content = req.body.content;

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
                return res.status(500).json({ 'error': 'impossible de d\'enregister le message' });
            }
        });
    },
    listMessages: function(req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

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
    modifyMessage: function(req, res) {
        //  Récupération de l'identifiant du message
        var messageId = req.params.id;

        //  Paramètres
        var title = req.body.title;
        var content = req.body.content;

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
                        content: (content ? content : messageFound.content)
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
        var messageId = req.params.id;

        models.Message.destroy({
            where: { id: messageId }
          })
        .then(function() { 
            return res.status(500).json({ 'message': 'Message supprimé'});
        }) .catch (function(err) {
            return res.status(500).json({ 'error': 'On ne peut pas supprimer le message' });
        });
    }
}