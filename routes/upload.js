const express = require('express');
const router = express.Router();

const { fileUpload, mostrarImagen } = require('../controllers/upload');
const { validarJWT } = require('../helpers/jwt');



router.put('/upload/:tipo/:id',validarJWT, fileUpload);

router.get('/upload/:tipo/:foto', mostrarImagen);


module.exports = router;