const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        img:{
            type: String
        },
        usuario:{
            required:true,
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    },
    { timestamps: true },
    { collection: 'hospitales' }
);

HospitalSchema.method('toJSON',function(){
   const { _v, ...object } = this.toObject();
    return object;
});


module.exports = mongoose.model('Hospital',HospitalSchema);