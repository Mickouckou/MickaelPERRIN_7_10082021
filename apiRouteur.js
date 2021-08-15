//  Importations
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var messagesCtrl = require('./routes/messagesCtrl');

//  Router
exports.router = (function() {
    var apiRouter = express.Router();

    //  Routes faites 9/14
    //  Routes terminées ?/14

    //  Routes utilisateurs
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/').put(usersCtrl.updateUserProfile);
    apiRouter.route('/users/').delete(usersCtrl.deleteUserProfile);

    //  Routes messages
    apiRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);
    //apiRouter.route('/messages/:id').get(messagesCtrl.getOneMessage);
    apiRouter.route('/messages/:id').put(messagesCtrl.modifyMessage);
    apiRouter.route('/messages/:id').delete(messagesCtrl.deleteMessage);

    //  Routes commentaires
    //apiRouter.route('/messages/:id/newComment/').post(commentsCtrl.createComment);
    //apiRouter.route('/messages/:id/comments/').get(commentsCtrl.getComments);
    //apiRouter.route('/messages/:id/comments/:id').put(commentsCtrl.modifyComment);
    //apiRouter.route('/messages/:id/comments/:id').delete(commentsCtrl.deleteComment);

    return apiRouter;
})();