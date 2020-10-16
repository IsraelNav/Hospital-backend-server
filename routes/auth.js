const express = require('express');
const router = express.Router();

const { login, googleSignin, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../helpers/jwt');
const { loginUsuario, validarGoogle } = require('../validator/index');

router.post('/login', loginUsuario, login);

router.post('/login/google', validarGoogle, googleSignin);

router.get('/login/renew', validarJWT,renewToken);

module.exports = router;