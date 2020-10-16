const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

exports.googleSignin = async (req,res) => {
    
    const  googleToken = req.body.token;

    try {
        
       const { name,email,picture  } = await googleVerify( googleToken );

       const usuarioDB = await Usuario.findOne({email});
       let usuario;

       if( !usuarioDB ){
        usuario = new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img: picture,
            google: true
        });
       }else{
           usuario = usuarioDB;
           usuario.google = true;
       }

       await Usuario.save();

       const token = await generarJWT( usuario.id );


       
       res.json({
        msg: 'Google Signin',
        token
    });
       
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });    
    }

    
};