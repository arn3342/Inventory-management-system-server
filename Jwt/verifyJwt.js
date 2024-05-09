const User = require('../models/User');
const jwt = require('jsonwebtoken');
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ status: 'unauthorized access' })
    }
    else {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, function (e, decoded) {
            if (e) {
                return res.status(403).send({ status: 'Forbidden' })
            }
            req.decoded = decoded;
            next()
        })
    }
}

const verifyUser = async (req, res) => {
    res.send({ email: req.decoded.email })
}

module.exports = {
    verifyUser,
    verifyJWT
}