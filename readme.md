Bonjour et bienvenue dans mon projet Groupomania.

Ce projet est une application de réseau social pour l'entreprise Groupomania.

Il a été réalisé dans le cadre du septième et dernier projet de la formation Développeur Web du site OpenClassrooms.

Ce projet a été réalisé avec le framework Vue.js. Il repose sur une base de données MySQL et est codé en Javascript, HTML et CSS.


Installation du projet :

1- Une fois que vous avez récupéré les données du projet lancer un premier terminal et exécutez les commandes suivantes:

cd .\MickaelPERRIN_7_10082021\
npm install
node server

Voilà, vous avez lancé le serveur qui gère le backend de l'application.

2- Lançons maintenant le Frontend. Ouvrez un second terminal et exécutez les commandes suivantes:

cd .\MickaelPERRIN_7_10082021\Frontend\vue-app-p7\
npm install
npm run serve

Voilà, le serveur Frontend est démarré également.

3- Pour que le projet fonctionne correctement il faut avoir une base de données MySQL installée:

dans le terminal exécutez les commandes :

sequelize db:create
sequelize db:migrate

La base de données est créée.

4- Enfin dans le dossier MickaelPERRIN_7_10082021\ il faut créer un fichier .env dont vous avez un modèle dans le fichier exemple.env il servira à crypter les token utilisateurs

5- C'est terminé. Profitez de l'application.