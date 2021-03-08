const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const authConfig = require('../config/auth');

function generateToken(params) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
};

module.exports = {
    
    async index(req, res) {

        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {

        const { email, password, nome, tipo_user, telefone } = req.body;
        
        if(await User.findOne({ where: {email} }))
            return res.status(400).json({ msg: 'Email já está cadastrado' });

        try {
            const id = uuid()
            const user = await User.create({ id, email, password, nome, tipo_user, telefone });

            user.password = undefined;
            
            return res.status(201).json({
                user,
                token: generateToken({ id: user.id })
            });
        } catch (error) {
            return res.status(400).json({ msg: error.message });
        }

    },

    async login(req, res) {
        
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user)
            return res.status(402).json({ msg: "Email incorreto"});
        
        if (!await bcrypt.compare(password, user.password))
            return res.status(402).json({ msg: "Senha invalida" });

        user.password = undefined;

        return res.status(200).json({
            user, 
            token: generateToken({ id: user.id })
        });

    },

    async show (req, res) {
        const { id } = req.params;
        const token = req.headers.authorization.split(' ')[1];

        const user = await User.findOne({ where: { id } });

        if (!user)
            return res.status(402).json({ msg: "Usuário não encontrado." });

        user.password = undefined;

        return res.status(200).json({
            user,
            token
        });
    },

    async update(req, res){
        const { id } = req.params;
        const { email, nome, telefone, tipo_user } = req.body;
        let { password } = req.body;

        const user = await User.findOne({ where: { id } });

        if(!user)
            return res.status(400).json({ msg: 'Usuario não encontrado' });

        if (password) {
            password = bcrypt.hashSync(password, 10);
        }

        await User.update({ email, password, nome, telefone, tipo_user }, { where: { id } })
            .then((data) => res.status(200).json(data))
            .catch((error) => res.status(400).json({ msg: error.message }));
        
    }

};