const express = require('express');
const router = express.Router();

const { login, googleSignin } = require('../controllers/auth');
const { loginUsuario, validarGoogle } = require('../validator/index');

router.post('/login', loginUsuario, login);

router.post('/login/google', validarGoogle, googleSignin);

module.exports = router;