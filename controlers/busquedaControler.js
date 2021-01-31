const { request } = require("express");
const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

//const Hospital = require('../models/hospital')


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda || "vacio";

    const reqExp = RegExp(busqueda, 'i'); // la i es para especificar que es una busqueda insensible, es decir que puede buscar con partes parciales del elemento video 130



    const [usuarios, medicos, hospitales] = await Promise.all([
        await Usuario.find({ nombre: reqExp }),
        await Medico.find({ nombre: reqExp }),
        await Hospital.find({ nombre: reqExp })
    ])


    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}
const getDocumentos = async(req, res = response) => {

    const tabla = req.params.tabla || "vacio";
    const busqueda = req.params.busqueda || "vacio";
    const reqExp = RegExp(busqueda, 'i'); // la i es para especificar que es una busqueda insensible, es decir que puede buscar con partes parciales del elemento video 130

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: reqExp }).populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: reqExp }).populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: reqExp });
            break;


        default:
            return res.status(400).json({
                ok: false,
                msg: "La tabla debe ser medicos, hospitales o usuarios, de lo contrario no funcionara"
            });
    }

    res.json({
        ok: true,
        resultados: data
    });

}




module.exports = {
    getTodo,
    getDocumentos
}