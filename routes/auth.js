const express = require('express');
const router = express.Router();

const { login } = require('../controllers/auth');
const { loginUsuario } = require('../validator/index');

router.post('/login', loginUsuario, login);

module.exports = router;