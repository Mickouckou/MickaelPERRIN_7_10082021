//  Importations
/*var express = require('express');
//var bodyParser = require('body-parser'); // Pas à jour
var apiRouter = require('./apiRouteur').router;

//  Instanciation du serveur
var server = express();

//  Récupération des paramètres dans le body dans requêtes HTTP
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//  Configuration des routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bienvenue sur mon serveur !</h1>');
});

server.use('/api/', apiRouter);

//  Lancement du serveur
server.listen(8080, function() {
    console.log('Serveur en écoute ;)');
});*/


//-------------------------------------------------------------
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
