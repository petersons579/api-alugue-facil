const Resposta = require('../models/Resposta');

module.exports = {

    async index(req, res){

        const resposta = await Resposta.findAll();

        return res.status(200).json(resposta);
    },

    async store(req, res){
        const { idusuario, idpergunta, texto, data } = req.body;

        const resposta = await Resposta.create({ idusuario, idpergunta, texto, data })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json({ error: error.message }))

    },

    async destroy(req, res){
        const { id } = req.params;

        await Resposta.destroy({ where: { id } })
            .then(res.status(200).json({ msg: 'Excluido com sucesso' }))
            .catch((error) => res.status(400).json({ error: error.message }))
    }

};