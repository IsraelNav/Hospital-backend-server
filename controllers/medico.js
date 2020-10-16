const Medico = require('../models/medico');

exports.getMedicos = async (req,res) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img');

    res.json({
        medicos: medicos
    });
};

exports.crearMedico = async (req,res) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    
    });

    try {
        const medicoDB = await medico.save();


        res.json({
            medico: medicoDB
        });
        
    } catch (error) {
        res.status(500).json({
            msg:'Comuniquese con el administrador'
        });
    }


};

exports.actualizarMedico = (req,res) => {
    res.json({
        msg: 'actualizarMedico'
    });
};

exports.borrarMedico = (req,res) => {
    res.json({
        msg: 'borrarMedico'
    });
};