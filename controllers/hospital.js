const Hospital = require('../models/hospital');

exports.getHospitales = async (req,res) => {

    const hospitales = await  Hospital.find()
                                      .populate('usuario','nombre img');
    res.json({
        hospitales: hospitales
    });
};

exports.crearHospital = async (req,res) => {
    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,    
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({
            hospital: hospitalDB
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        });
    }

    res.json({
        msg: 'crearHospital'
    });
};

exports.actualizarHospital = async (req,res) => {
    const id = req.params.id;
    const uid =req.uid;
    try {
        const hospital = await Hospital.findById( id );

        if( !hospital ){
            return res.status(404).json({
                msg: 'Hospital no encontrado'
            });
        }

        const cambios = {
            ... req.body,
            usuario: uid
        };
        
        const hospitalActualizado = await Hospital.findOneAndUpdate(id,cambios,{new: true});

        res.json({
            hospitalActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Consulte al administrador'
        });    
    }
};

exports.borrarHospital = async (req,res) => {
    const id = req.params.id;
    
    try {
        const hospital = await Hospital.findById( id );

        if( !hospital ){
            return res.status(404).json({
                msg: 'Hospital no encontrado'
            });
        }

        
        await Hospital.findByIdAndDelete( id );

        res.json({
            msg: 'Hospital Eliminado Exitosamente'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Consulte al administrador'
        });    
    }
};