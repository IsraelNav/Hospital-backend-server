const express = require('express');
const router = express.Router();

const { getUsuarios, crearUsuarios, actualizarUsuario, eliminarUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../helpers/jwt');
const { validacionUsuario, updateUsuario } = require('../validator/index');

router.get('/usuarios', validarJWT,getUsuarios);
router.post('/usuarios',validacionUsuario, crearUsuarios);
router.put('/usuarios/:id', validarJWT,updateUsuario ,actualizarUsuario);
router.delete('/usuarios/:id', validarJWT,eliminarUsuario);



module.exports = router;