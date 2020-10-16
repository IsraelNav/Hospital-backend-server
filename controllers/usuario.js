const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


exports.getUsuarios = async (req,res) => {
    const desde = Number(req.query.desde) || 0;


    const [usuarios,total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
                                  .skip( desde )
                                  .limit( 5 ),
        Usuario.countDocuments()
     ]);

    res.json({
        usuarios,
        total
    });
    
};

exports.crearUsuarios = async (req,res) => {
    try {
        const { email, password } = req.body;

        const exisEmail = await Usuario.findOne({email});

        if( exisEmail ){
            return res.status(400).json({
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        usuario.save();

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        }); 

        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

exports.actualizarUsuario = async (req,res) => {
    const uid = req.params.id;
    
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                msg:'Usuario no encontrado'
            });
        }


        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            
            if( existeEmail ){
                return res.status(400).json({
                    msg:'Ya existe un usuario con el mismo correo'
                });
            }
        }
        
        campos.email = email;


        const usuarioUpdate = await Usuario.findByIdAndUpdate(uid, campos, { new:true });
        
        res.json({
            usuarioUpdate
        });

    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }
};

exports.eliminarUsuario = async (req,res) => {
    const uid = req.params.id;

    try {
       const usuarioDB = await Usuario.findById( uid );

       if(!usuarioDB){
           return res.status(404).json({
                msg: 'Usuario no existe' 
           });
       }

       await Usuario.findByIdAndDelete( uid );

       res.json({
        msg: 'Usuario eliminado exitosamente'
       });
        

    } catch (error) {
        res.status(400).json({
            msg: error
        });
    }
};