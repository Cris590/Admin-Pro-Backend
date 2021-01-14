const { request } = require("express");
const { response } = require('express');
const hospital = require("../models/hospital");

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

const actualizarHospital = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid; // Viene por el uid del JWT token, es como tal el token del usuario que actualiza el hospital


    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Hospital con ese ID'
            });
        }

        //hospitalDB.nombre = req.body.nombre;

        const cambiosHospital = {
            ...req.body, // Actualiza todo de lo que viene en el body y lo mete en esa variable, idealmente solo es el nombre pero puede que sean mas cosas en el futuro
            usuario: uid
        };

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true }); //Se actualiza los datos por medio del id y del cambioHospital ... el new:true es para que responda con el objeto actualizado


        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}


const borrarHospital = async(req, res = response) => {
    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(id);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Hospital con ese ID'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado',
        });

    } catch (error) {
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}