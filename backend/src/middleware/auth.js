const { decodeToken } = require("../utils/jwt");

function userAuthenticated(req, res, next){
    const { authorization } = req.headers;
    if(!authorization) return res.status(500).send({response: 'El token es requerido'});
    const token = authorization.replace('Bearer ', '');
    const userData = decodeToken(token);
    try {
        const { exp } = userData;
        const currentTime = new Date().getTime();
        if(exp < currentTime) return res.status(400).send({response: 'El token se ha vencido'});
        next();
    } catch (error) {
        res.status(400).send({response: 'El token no es válido'});
    }
}

module.exports = {
    userAuthenticated
}