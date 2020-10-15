const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        img:{
            type: String
        },
        role:{
            type: String,
            required: true,
            default: 'USER_ROLE'
        },
        google:{
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

UsuarioSchema.method('toJSON',function(){
   const { _v, _id, password, ...object } = this.toObject();
   object.uid = _id;
    return object;
});


module.exports = mongoose.model('Usuario',UsuarioSchema);