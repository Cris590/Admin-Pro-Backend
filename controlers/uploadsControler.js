const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizarImagen");
const Usuario = require('../models/usuario');
const Path = require('path');
const fs = require('fs');




const fileUpload = async(req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un Médico, Usuario u Hospital'
        });
    }


    //Validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se subio ningun archivo'
        });
    }

    //Procesar que exista usuario


    const usuarioDB = await Usuario.findById(id);

    // //Confirmar que el usuario existe
    // if (!usuarioDB) {
    //     return res.status(404).json({
    //         ok: false,
    //         msg: "No existe un usuario por ese ID"
    //     })
    // }

    //Procesar la imagen

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); // Se divide por medio del punto en un arreglo
    const extension = nombreCortado[nombreCortado.length - 1].toLowerCase(); // Se saca la entencion del archivo

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo de imagen valido'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extension}`; // Crea un nombre aleatorio diferente cada vez que se llama

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen

    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen al path'
            })
        }


        res.json({
            ok: true,
            msg: 'Archivo subido',
            archivo: nombreArchivo
        });
    });


    //Actualizar la base de datos
    actualizarImagen(tipo, id, nombreArchivo);


}


const retornaImagen = (req, res) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = Path.join(__dirname, `../uploads/${tipo}/${foto}`); // Crea una constante con el path de la imagen.

    res.sendFile(pathImg); // enviar la imagen a travez de express para que pueda ser obtenida por el usuarios

    //Imagen por defecto

    if (fs.existsSync(path)) { // Si existe una imgen correspondiente al medico con el id entonces la elimina para subir una nueva
        fs.unlinkSync(path);
    } else {
        const pathImg = Path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }


}

module.exports = {
    fileUpload,
    retornaImagen
}