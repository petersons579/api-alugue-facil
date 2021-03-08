const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Anuncio = require('../models/Anuncio');
const Pergunta = require('../models/Pergunta');
const Resposta = require('../models/Resposta');
const Imagens = require('../models/Imagens');

const conect = new Sequelize(dbConfig);

Anuncio.init(conect);
User.init(conect);
Pergunta.init(conect);
Resposta.init(conect);
Imagens.init(conect);

Anuncio.associate(conect.models);
Imagens.associate(conect.models);
User.associate(conect.models);

module.exports = conect;