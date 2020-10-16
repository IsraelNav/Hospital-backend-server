const express = require('express');
const router = express.Router();

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medico');
const { validarJWT } = require('../helpers/jwt');
const { validarMedico } = require('../validator/index');

router.get('/medicos', validarJWT,getMedicos);
router.post('/medicos',validarJWT ,validarMedico,crearMedico);
router.put('/medicos/:id' ,validarJWT,validarMedico,actualizarMedico);
router.delete('/medicos/:id',validarJWT,borrarMedico);



module.exports = router;