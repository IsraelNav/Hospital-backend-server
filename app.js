require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/auth');


const app = express();

app.use(morgan('dev'));
app.use( cors() );
app.use( express.json() );
app.use( expressValidator() );


mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then( ()=> console.log('DB Online Connected'));



app.use('/api',usuarioRoutes);
app.use('/api',authRoutes);

const port = process.env.PORT || 8001;

app.listen(port, ()=>{ 
    console.log('Servidor Corriendo En El Puerto: '+ port);
});