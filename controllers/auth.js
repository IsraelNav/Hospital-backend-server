const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

exports.login = async (req,res) => {
    const { email, password } = req.body;
    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                msg: 'Email no encontrado'
            });
        }

        const validPass = bcrypt.compareSync( password, usuarioDB.password );

        if(!validPass){
            return res.status(400).json({
                msg:'Password no valido'
            });
        }

        const token = await generarJWT( usuarioDB.id );

        res.json({
            msg: token
        })
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error... comuniquese con el administrador'
        });
    }
};