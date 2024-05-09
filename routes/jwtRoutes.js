const router = require('express').Router();

const veriftJwt = require('../Jwt/verifyJwt');
router.get('/', veriftJwt.verifyJWT, veriftJwt.verifyUser);

module.exports = router;