import { Viaje } from '../models/Viaje.js'
import { testimoniales } from '../models/Testimoniales.js'


const paginaInicio = async (req, res) => {

    //consultar 3 viajes del modelo de viajes

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(testimoniales.findAll({ limit: 3 }));

    try {
        /*
        esta forma no estan correcta ya que cada linea tiene que esperar a la otra 
        lo mejor es que las dos  hagan la consulta al mismo tiempo

        const viajes = await Viaje.findAll({ limit: 3 });
        const testimonial = await testimoniales.findAll({ limit: 3});

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes,
            testimonial
        });
        */
        //asi es la mejor forma de hacer lo si tienes multiples await que no dependen de si mismos
        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonial: resultado[1]
        });

    } catch (error) {
        console.log(error)
    }




};

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {

    const viajes = await Viaje.findAll();

    //console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes
    });
};

const paginaDetalleViajes = async (req, res) => {

    const { slug } = req.params

    try {
        //const resultado = await Viaje.findOne({ where : {slug: viaje}});
        const resultado = await Viaje.findOne({ where: { slug } });

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            resultado
        })

    } catch (error) {

    }



}

const paginaTestimonios = async (req, res) => {

    try {
        const testimonial = await testimoniales.findAll();

        res.render('testimonios', {
            pagina: 'testimonios',
            testimonial
        });


    } catch (error) {

    }


};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViajes
}