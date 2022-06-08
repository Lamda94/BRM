 const jwt = require('jsonwebtoken');
 require('dotenv').config();
 exports.validateToken = (req, res, next) => {
    const token = req.headers['authorization'] || req.session.accessToken;
    if (!token) {
        return res.status(401).send({ auth: false, message: 'El token no existe.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'El token es invalido o expiro' });
        }
        next();
    });
}