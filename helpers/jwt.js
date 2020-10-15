const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generarJWT = ( uid ) => {

    return new Promise((resolve, reject) => {

        const payload ={ uid };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) =>{
            if(err){
                reject('No se pudo generar el JWT');
            }else{
                resolve( token );
            }
        });
    });

};

exports.validarJWT = (req, res, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay TOKEN'
        });
    }
    
    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;

        next();
        
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
};
