// arquivo responsavel por  confirmar se um determinado(a) 'User' tem autorização

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // para pegar o token tem q ser req.headers que e onde fica o token e tambem req. headers.authorization
        // para capturar o token , agente usa o headers eo authorization por que fica dentro nessa sequencia o token
        const token = req.headers.authorization.replace('Bearer ', '');
        console.log(token);
        // agora que temos o token vamos decodificar ele
        // esse 'secret foi definido la nodb.config.js que o password era secreto'
        const decoded = jwt.verify(token, 'secret');

        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'falha na autenticação!'});
    }

}