const express = require('express');
const multer = require('multer')

const UserController = require('./controllers/UserController');
const AnuncioController = require('./controllers/AnuncioController');
const PerguntasController = require('./controllers/PerguntaController');
const RespostaController = require('./controllers/RespostaController');
const ImagensController = require('./controllers/ImagemController');
const CepController = require('./controllers/CepController');
const authenticateMiddleware = require('./middlewares/auth');
const configMulter = require('./config/multer')

const routes = express.Router();

routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

routes.use(authenticateMiddleware);

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.put('/user/:id', UserController.update);

//rotas pros anuncios
routes.get('/anuncios', AnuncioController.index);
routes.get('/anuncios/:id', AnuncioController.show);
routes.post('/anuncios', multer(configMulter).array('files',5), AnuncioController.store);
routes.put('/anuncios/:id', AnuncioController.update);
routes.put('/anuncios/situacao/:id', AnuncioController.alterSituation);

//rotas de perguntas
routes.get('/perguntas', PerguntasController.index);
routes.post('/perguntas', PerguntasController.store);
routes.delete('/perguntas/:id', PerguntasController.destroy);

//rotas de respostas
routes.get('/respostas', RespostaController.index);
routes.post('/respostas', RespostaController.store);
routes.delete('/respostas/:id', RespostaController.destroy);

//rotas para manipular imagens
routes.get('/imagens/:id_anuncio', ImagensController.index);
routes.post('/image', multer(configMulter).array('files',5), ImagensController.store);

//Rota para buscar cep
routes.get('/get_cep', CepController.getCep);

module.exports = routes;