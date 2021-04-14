//sintaxis de commonjs 
//const express = require('express');
//const route = require('./routes/index.js')

//sintaxis de modulos 
import router from './routes/index.js'
import db from './config/db.js'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env'});


const app = express();

//conectar la base de datos
db.authenticate()
  .then(() =>console.log('base de datos conectada'))
  .catch(error => console.log(error))

//definimos el puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

//habilitar pug
app.set('view engine', 'pug');

//obtener añoa actual
app.use( (req, res, next) => {
   const year = new Date();

   res.locals.actualYear = year.getFullYear();
   res.locals.nombreSitio = 'agencia de viajes';
   next();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//habilitar carpeta publica
app.use(express.static('public'));

app.use('/', router);


app.listen(port, host, ()=> {
    console.log(`el servidor esta funcionando en el puerto ${port}`);
    console.log(`el servidor esta funciona en el host ${host}`);
});

