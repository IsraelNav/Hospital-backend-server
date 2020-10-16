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

exports.actualizarMedico = async (req,res) => {
    const id = req.params.id;
    const uid =req.uid;
    try {
        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                msg: 'Medico no encontrado'
            });
        }

        const cambios = {
            ... req.body,
            usuario: uid
        };
        
        const medicoActualizado = await Medico.findOneAndUpdate(id,cambios,{new: true});

        res.json({
            medicoActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Consulte al administrador'
        });    
    }
};

exports.borrarMedico = async (req,res) => {
    const id = req.params.id;
    
    try {
        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                msg: 'Medico no encontrado'
            });
        }

        
        await Medico.findByIdAndDelete( id );

        res.json({
            msg: 'Medico Eliminado Exitosamente'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Consulte al administrador'
        });    
    }
};