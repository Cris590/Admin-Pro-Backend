const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) { // Si existe una imgen correspondiente al medico con el id entonces la elimina para subir una nueva
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {
    console.log('Vamos bien');
    let pathAntiguo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No se encontro medico por ID');
                var path1 = `./uploads/${ tipo }/${ nombreArchivo }`;

                if (fs.existsSync(path1)) {
                    fs.unlinkSync(path1);
                }
                return false;

            }

            pathAntiguo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathAntiguo);

            medico.img = nombreArchivo;
            await medico.save();
            return true;

            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No se encontro hospital por ID');
                var path2 = `./uploads/${ tipo }/${ nombreArchivo }`;

                if (fs.existsSync(path2)) {
                    fs.unlinkSync(path2);
                }
                return false;
            }

            pathAntiguo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathAntiguo);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

            break;

        case 'usuarios':

            const usuario = await Usuario.findById(id);

            if (!usuario) {
                console.log('No se encontro usuario por ID');

                var path3 = `./uploads/${ tipo }/${ nombreArchivo }`;

                if (fs.existsSync(path3)) {
                    fs.unlinkSync(path3);
                }
                return false;
            }

            pathAntiguo = `./uploads/hospitales/${usuario.img}`;
            borrarImagen(pathAntiguo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

            break;

        default:
            break;
    }
}


module.exports = {
    actualizarImagen
}