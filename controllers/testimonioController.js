import { testimoniales } from '../models/Testimoniales.js'

const guardarTestimonial = async (req, res) => {

    const { nombre, correo, mensaje} = req.body;
    const errores = []


    //.trim() elimina los espacios vacios al inicio y al final
    if(nombre.trim() === '') {
        errores.push({mensajes : 'nombre vacio'})
    }

    if(correo.trim() === '') {
        errores.push({mensajes : 'correo vacio'})
    }

    if(mensaje.trim() === '') {
        errores.push({mensajes : 'mensaje vacio'})
    }

    if(errores.length > 0) {

        //obtener testimonios
        const testimonial = await testimoniales.findAll();

        //mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimonial
        })
    }else {
        //almacenar en la base de datos
        try {
            await testimoniales.create({
                nombre,
                correo,
                mensaje
            });
             res.redirect('/testimonios') 
        } catch (error) {
            console.log(error)
        };
    };

    
};

export {
    guardarTestimonial
}