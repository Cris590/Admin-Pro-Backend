const { request } = require("express");
const { response } = require('express');

const Hospital = require('../models/hospital')


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().
    populate('usuario', 'nombre img') // "usuario" corresponde al nombre del campo que se quiere modificar, y nombre equivale al espacio nombre de la tabla Usuarios, el id lo pone solo
    res.json({
        ok: true,
        msg: 'Obtener hospital',
        hospitales,
    })
}

const crearHospital = async(req, res = response) => {

    const uid = req.uid; // Al pasar por la validacion del token nosotros tenemos el id del usuario de acuerdo al token

    const hospital = new Hospital({
        usuario: uid,
        ...req.body // por medio de la desestrcuturacion envia todo lo del body y el uid
    }); // Llena la variable hospital con los datos del body


    try {
        const hospitalBD = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalBD
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Problema inesperado'
        });

    }

    res.json({
        ok: true,
        msg: 'crear hospital'
    })
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar Hospital'
    })
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Borrar hospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}