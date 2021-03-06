require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/auth');
const hospitaltaRoutes = require('./routes/hospital');
const medicoRoutes = require('./routes/medico');
const busquedaRoutes = require('./routes/buscar');
const uploadRoutes = require('./routes/upload');


const app = express();

app.use(morgan('dev'));
app.use( cors() );
app.use( express.json() );
app.use( expressValidator() );
app.use( fileUpload() );

mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then( ()=> console.log('DB Online Connected'));

app.use( express.static('public') );

app.use('/api',usuarioRoutes);
app.use('/api',authRoutes);
app.use('/api',hospitaltaRoutes);
app.use('/api',medicoRoutes);
app.use('/api',busquedaRoutes);
app.use('/api',uploadRoutes);

const port = process.env.PORT || 8001;

app.listen(port, ()=>{ 
    console.log('Servidor Corriendo En El Puerto: '+ port);
});