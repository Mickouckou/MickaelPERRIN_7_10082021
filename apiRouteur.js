//  Importations
const express = require('express');
const auth = require('./middleware/auth');
//const multer = require('./middleware/multer-config');
const usersCtrl = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
const commentsCtrl = require('./routes/commentsCtrl');


//  Router
exports.router = (function() {
    var apiRouter = express.Router();

    //  Routes faites 13/13 (14)
    //  Routes terminées ?/14

    //  Routes utilisateurs
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/').get(auth, usersCtrl.getUserProfile);
    apiRouter.route('/users/').put(auth, usersCtrl.updateUserProfile);
    apiRouter.route('/users/').delete(auth, usersCtrl.deleteUserProfile);

    //  Routes messages
    apiRouter.route('/messages/new/').post(auth, messagesCtrl.createMessage);
    apiRouter.route('/messages/').get(messagesCtrl.listMessages);
    apiRouter.route('/messages/:id').get(auth, messagesCtrl.getOneMessage);
    apiRouter.route('/messages/:id').put(auth, messagesCtrl.modifyMessage);
    apiRouter.route('/messages/:id').delete(auth, messagesCtrl.deleteMessage);

    //  Routes commentaires
    apiRouter.route('/messages/:id/newComment/').post(commentsCtrl.createComment);
    apiRouter.route('/comments/').get(commentsCtrl.getComments);
    apiRouter.route('/messages/:id/comments/:commentId').put(commentsCtrl.modifyComment);
    apiRouter.route('/messages/:id/comments/:commentId').delete(commentsCtrl.deleteComment);

    return apiRouter;
})();