const express = require('express');
const router = express.Router();

const { busqueda, busquedaColeccion } = require('../controllers/busqueda');
const { validarJWT } = require('../helpers/jwt');
const { validarHospital } = require('../validator/index');


router.get('/buscar/:busqueda',validarJWT, busqueda);
router.get('/buscar/coleccion/:tabla/:busqueda', validarJWT, busquedaColeccion);

module.exports = router;