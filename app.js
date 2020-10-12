require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then( ()=> console.log('DB Online Connected'));

app.use(cors());

app.get( '/', (req,res)=>{
    res.status(400).json({
        ok: true,
        msg: 'Hola Mundo'
    });

});

const port = process.env.PORT || 8001;

app.listen(port, ()=>{ 
    console.log('Servidor Corriendo En El Puerto: '+ port);
});