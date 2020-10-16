const express = require('express');
const router = express.Router();

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospital');
const { validarJWT } = require('../helpers/jwt');
const { validarHospital } = require('../validator/index');

router.get('/hospitales',validarJWT ,getHospitales);
router.post('/hospitales',validarJWT ,validarHospital , crearHospital);
router.put('/hospitales/:id' ,validarJWT,actualizarHospital);
router.delete('/hospitales/:id',validarJWT,borrarHospital);



module.exports = router;