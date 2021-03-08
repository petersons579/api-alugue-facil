const Anuncio = require('../models/Anuncio')
const Imagem = require('../models/Imagens')
const { v4: UUID } = require('uuid')
const { Op } = require('sequelize')

module.exports = {

    async index(req, res) {
        const { filtro, usuario } = req.query;
        let orValues = [];

        if (usuario) {
            orValues.push({ fkidusuario: usuario });
        } else {
            orValues.push({ situacao: true });
        }

        let anuncio = await Anuncio.findAll({
            where: {
                [Op.or]: [
                    { end_cidade: { [Op.like]: `%${filtro}%` } },
                    { end_bairro: { [Op.like]: `%${filtro}%` } },
                    { tipo_imovel: { [Op.like]: `%${filtro}%` } },
                ],
                [Op.and]: orValues
            },
            include: {
                association: 'images',
                attributes: ['id', 'original_name', 'name']
            },
            order: [
                ['created_at', 'DESC']
            ]
        });

        if (!anuncio)
            return res.status(400).json({ error: 'Não há nada para mostar.' });

        return res.json(anuncio);
    },

    async store(req, res) {
        const { fkidusuario, descricao, tipo_imovel, qtd_quartos, qtd_suite, area, preco, end_logradouro, end_num,
            end_complemento, end_bairro, end_cidade, end_estado, end_cep } = req.body;
        const files = req.files
        let insert = [];

        const situacao = true;

        if (fkidusuario === undefined)
            return res.status(400).json({ msg: 'Informe o usuário' });

        if (await Anuncio.findOne({ where: { descricao, fkidusuario } }))
            return res.status(400).json({ msg: 'Anuncio já existe!' });

        const id = UUID()

        const anuncio = Anuncio.create({
            id, fkidusuario, descricao, tipo_imovel, qtd_quartos, qtd_suite, area, preco, end_logradouro,
            end_num, end_complemento, end_bairro, end_cidade, end_estado, end_cep, situacao
        }).then((data) => {

            files.forEach(element => {
                let id_image = UUID();

                insert.push(
                    {
                        id: id_image,
                        path: element.path,
                        name: element.filename,
                        original_name: element.originalname,
                        id_anuncio: id
                    }
                )
            });

            Imagem.bulkCreate(insert)
                .then(response => { return response })
                .catch(err => res.status(400).json({ msg: err }));

            res.status(200).json({ msg: 'Cadastrado com Sucesso.' });
        }).catch((error) => res.status(400).json({ error: error.message }))
    },

    async show(req, res) {
        const { id } = req.params;

        const anuncio = await Anuncio.findOne({
            where: { id }, include: [
                { association: 'locatario', attributes: ['nome', 'telefone'] },
                { association: 'images' }
            ]
        });

        if (!anuncio)
            return res.status(400).json({ error: 'Anuncio não encontrado' });

        return res.status(200).json(anuncio);
    },

    async update(req, res) {
        const { id } = req.params;

        const { fkidusuario, descricao, tipo_imovel, qtd_quartos, qtd_suite, area, preco, end_logradouro,
            end_num, end_complemento, end_bairro, end_cidade, end_estado, end_cep, situacao } = req.body;

        const anuncio = await Anuncio.findOne({ where: { id } });

        if (!anuncio)
            return res.status(400).json({ error: 'Anuncio não existe' });

        const updateAnuncio = await Anuncio.update({
            fkidusuario, descricao, tipo_imovel, qtd_quartos, qtd_suite, area, preco, end_logradouro,
            end_num, end_complemento, end_bairro, end_cidade, end_estado, end_cep, situacao
        }, { where: { id } })
            .then((data) => res.status(200).json({ msg: 'Atualizado com sucesso' }))
            .catch((error) => res.status(400).json({ error: error.message }));

    },

    async alterSituation(req, res) {
        const { id } = req.params;
        const { situacao } = req.body;

        const anuncio = await Anuncio.findOne({ where: { id } });

        if (!anuncio)
            return res.status(400).json({ msg: 'Anuncio não existe.' });

        await Anuncio.update({ situacao }, { where: { id } })
            .then(data => res.status(200).json({ msg: 'Atualizado com sucesso.' }))
            .catch(error => res.status(400).json({ error: error.message }));
    },
}