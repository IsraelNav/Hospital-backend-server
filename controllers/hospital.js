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

exports.actualizarHospital = (req,res) => {
    res.json({
        msg: 'actualizarHospital'
    });
};

exports.borrarHospital = (req,res) => {
    res.json({
        msg: 'borrarHospital'
    });
};