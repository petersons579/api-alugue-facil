const Imagem = require('../models/Imagens')
const { v4: UUID } = require('uuid')
const { options } = require('sequelize/lib/model')

module.exports = {
    async index(req, res) {
        const { id_anuncio } = req.params
        
        const imagens = await Imagem.findAll({ where: { id_anuncio } })

        return res.status(200).json(imagens); 
    },

    async store(req, res){
        const { id_anuncio } = req.body
        const files = req.files
        let insert = [];

        files.forEach(element => {
            let id = "'"+UUID()+"'";
            
            insert.push(
                {
                    id: id,
                    path: element.path,
                    name: element.filename,
                    original_name: element.originalname,
                    id_anuncio: id_anuncio.replace(/"/g, '')
                }
            )
        });
        
        Imagem.bulkCreate(insert)
        .then(data => res.status(200).json({msg: 'cadastrado Com Sucesso!'}))
        .catch(err => res.status(400).json({msg: err}))
    }
}