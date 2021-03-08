const Pergunta = require('../models/Pergunta');

module.exports = {

    async index(req, res){

        const perguntas = await Pergunta.findAll();

        return res.status(200).json(perguntas);
    },

    async store(req, res){
        const { idusuario, texto, data } = req.body;

        const pergunta = await Pergunta.create({ idusuario, texto, data })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json({ error: error.message }))

    },

    async destroy(req, res){
        const { id } = req.params;

        await Pergunta.destroy({ where: { id } })
            .then(res.status(200).json({ msg: 'Excluido com sucesso' }))
            .catch((error) => res.status(400).json({ error: error.message }))
    }

};