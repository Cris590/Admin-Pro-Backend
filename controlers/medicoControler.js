const { request } = require("express")

const { response } = require('express');
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().
    populate('usuario', 'nombre img').
    populate('hospital', 'nombre img')



    res.json({
        ok: true,
        msg: 'Obtener Medico',
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body // por medio de la desestrcuturacion envia todo lo del body y el uid
    }); // Llena la variable hospital con los datos del body

    try {

        const medicoBD = await medico.save();
        res.json({
            ok: true,
            medico: medicoBD
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Problema inesperado"
        })
    }

    res.json({
        ok: true,
        msg: 'crear Medico'
    })
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizar Medico'
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Borrar Medico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}