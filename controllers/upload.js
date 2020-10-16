const { v4 :uuidv4 } = require('uuid');
const {  actualizaImagen } = require('../helpers/actualizar-img');
const path = require('path');
const fs = require('fs');

exports.fileUpload = (req,res) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales','medicos','usuarios'];
    
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            msg: 'Tipo Invalido'
        });
    }

    if( !req.files || Object.keys(req.files).length ===0 ){
        return res.status(400).json({
            msg: 'No se selecciono ningun archivo'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1 ];

    const extensionValida = ['png','jpg','jpeg','gif'];
    if ( !extensionValida.includes(extension) ) {
        return res.status(400).json({
            msg: 'Archivo con extension no permitida'
        });
    }

    const nombreArchivo = `${ uuidv4() }.${ extension }`;

    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    file.mv( path, (err) => {
        if(err){
            return res.status(500).json({
                msg:'Error al mover la imagen'
            });
        }

        actualizaImagen(tipo,id,nombreArchivo);

        res.json({
            msg:'Archivo Subido',
            nombreArchivo
        });
    });
};

exports.mostrarImagen = (req,res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathCompleto = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    if( fs.existsSync( pathCompleto ) ){
        res.sendFile( pathCompleto );
    }else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

    
};