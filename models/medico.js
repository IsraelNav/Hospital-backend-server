const mongoose = require('mongoose');

const MedicoSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        img:{
            type: String
        },
        usuario:{
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        hospital:{
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    },
    { timestamps: true },
    { collection: 'medicos' }
);

MedicoSchema.method('toJSON',function(){
   const { _v, ...object } = this.toObject();
    return object;
});


module.exports = mongoose.model('Medico',MedicoSchema);