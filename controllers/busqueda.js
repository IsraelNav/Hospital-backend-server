const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

exports.busqueda =  async (req,res) => {

    const parametro = req.params.busqueda;
    const regex = new RegExp(parametro, 'i');

    const [usuarios,hospitales,medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
     ]);


    res.json({
      usuarios,
      hospitales,
      medicos
    });
};

exports.busquedaColeccion =  async (req,res) => {

    const tabla = req.params.tabla;
    const parametro = req.params.busqueda;
    const regex = new RegExp(parametro, 'i');
    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
                               .populate('usuario','nombre img')
                               .populate('hospital','nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                 .populate('hospital','nombre img');    
        break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});    
        break;    
        default:
          return  res.status(400).json({
                msg:'Tabla debe ser usuarios/medicos/hospitales'
            });
    }

    res.json({
        resultados: data
    });
};