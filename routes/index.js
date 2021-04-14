

//const express = require('express');
import express from 'express';
const router = express.Router();
import {paginaInicio,
        paginaNosotros, 
        paginaViajes, 
        paginaTestimonios, 
        paginaDetalleViajes
    } from '../controllers/paginaController.js'

import { guardarTestimonial } from '../controllers/testimonioController.js'



router.get('/', paginaInicio); //req: lo que enviamos res: lo que express responde 

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViajes);

router.get('/testimonios', paginaTestimonios);

router.post('/testimonios', guardarTestimonial);

//module.exports = router
export default router;