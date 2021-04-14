import Sequelize from 'sequelize';
import db from '../config/db.js';


export const testimoniales = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }

});
