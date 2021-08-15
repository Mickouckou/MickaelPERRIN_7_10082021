//  Importations
var models = require('../models');
var asyncLib = require('async');
var jwtUtils = require('../utils/jwt.Utils');

//  Constantes
/*const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;*/


//  Routes
module.exports = {
    createComment: function(req, res) {
        //  Récupération de l'entête d'identification
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        //  Paramètres
        var comment = req.body.comment;
        var imgComment = req.body.imgComment;

        if (comment == null) {
            return res.status(400).json({ 'error': 'veuillez saisir un commentaire !' });
        }

        if(comment.length <= 1) {
            return res.status(400).json({ 'error': 'le commentaire doit être plus long' });
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
                    models.Comment.create({
                        comment: comment,
                        imgComment: imgComment,
                        UserId: userFound.id,
                        MessageId: req.params.id
                    })
                    .then (function(newComment) {
                        done(newComment);
                    })
                    .catch (function(err) {
                        return res.status(500).json({ 'error': 'impossible de créer le commentaire' });
                    });
                } else {
                    res.status(404).json({ 'error': 'Utilisateur non trouvé' });
                }
            }
        ], function (newComment) {
            if (newComment) {
                return res.status(201).json(newComment);
            } else {
                return res.status(500).json({ 'error': 'impossible de d\'enregister le commentaire' });
            }
        });
    },
    getComments: function(req, res) {
        var fields = req.query.fields;
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);
        var order = req.query.order;

        models.Comment.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'ASC']],
            attributes: (fields !== '*' && fields!= null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            /*include: [{
                model: models.User,
                attributes: ['username']
            }],*/
            where: { messageId : req.params.id }
        })
        .then (function (comments) {
            if (comments) {
                res.status(200).json(comments);
            } else {
                res.status(404).json({ "error": "aucun commentaire trouvé" });
            }
        })
        .catch (function(err) {
            console.log(err);
            res.status(500).json({ 'error': 'champs invalides' });
        });
    },
    modifyComment: function(req, res) {
        //  Récupération de l'identifiant du message
        var messageId = req.params.id;
        var commentId = req.params.commentId;

        //  Paramètres
        var comment = req.body.comment;

        asyncLib.waterfall([
            function(done) {
                models.Comment.findOne({
                    attributes: ['id', 'comment'],
                    where: { id: commentId}
                }) .then (function (commentFound) {
                    done(null, commentFound);
                }) .catch (function(err) {
                    return res.status(500).json({'error': 'incapable de vérifier le commentaire'});
                });
            },
            function(commentFound, done) {
                if (commentFound) {
                    commentFound.update({
                        comment: (comment ? comment : commentFound.comment)
                    }) .then (function() {
                        done(commentFound);
                    }) .catch (function(err) {
                        console.log(err);
                        res.status(500).json({'error': 'impossible de modifier le commentaire'});
                    });
                } else {
                    res.status(404).json({'error': 'Commentaire non trouvé'});
                }
            },
        ], function (commentFound) {
            if(commentFound) {
                return res.status(201).json(commentFound);
            } else {
                res.status(500).json({'error': 'incapable de modifier le commentaire en cours'});
            }
        });
    },
    deleteComment: function(req, res) {
        //  Récupération de l'identifiant du commentaire
        var commentId = req.params.commentId;

        models.Comment.destroy({
            where: { id: commentId }
          })
        .then(function() { 
            return res.status(500).json({ 'message': 'Commentaire supprimé'});
        }) .catch (function(err) {
            return res.status(500).json({ 'error': 'On ne peut pas supprimer le commentaire' });
        });
    }
}