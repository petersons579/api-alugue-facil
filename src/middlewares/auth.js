const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).json({ error: 'Token não informado' });
    
    const parts = authHeader.split(' ');

    if(!parts === 2)
        return res.status(401).json({ error: 'Token error' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Tokem mal formado' });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({ error: 'token invalido' });

        req.userId = decoded.id;
        return next();
    })

}