const { request } = require("express")

const { response } = require('express');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital')


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


const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById(id).
        populate('usuario', 'nombre img').
        populate('hospital', 'nombre img')

        console.log('HOLA', medico);

        res.json({
            ok: true,
            msg: 'Obtener Medico',
            medico
        })

    } catch (error) {

        res.json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }


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

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id; // Id del medico

    const uid = req.uid; // ID del usuario 
    //const nombreMedico=req.body.nombre;
    //const hospital=req.body.hospital; // Id del hospital

    try {

        const medicoDB = await Medico.findById(id);
        //const hospitalDB = await Hospital.findById(req.params.Hospital);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Medico con ese ID'
            });
        }


        const cambiosMedico = {
            ...req.body, // Actualiza todo de lo que viene en el body y lo mete en esa variable, idealmente solo es el nombre pero puede que sean mas cosas en el futuro
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true }); //Se actualiza los datos por medio del id y del cambioHospital ... el new:true es para que responda con el objeto actualizado


        res.json({
            ok: true,
            msg: 'Medico actualizado',
            medico: medicoActualizado
        });

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const borrarMedico = async(req, res = response) => {

    const id = req.params.id; // Id del medico

    const uid = req.uid; // ID del usuario 
    //const nombreMedico=req.body.nombre;
    //const hospital=req.body.hospital; // Id del hospital

    try {

        const medicoDB = await Medico.findById(id);
        //const hospitalDB = await Hospital.findById(req.params.Hospital);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe Medico con ese ID'
            });
        }



        await Medico.findByIdAndDelete(id); //Se actualiza los datos por medio del id y del cambioHospital ... el new:true es para que responda con el objeto actualizado


        res.json({
            ok: true,
            msg: 'Medico borrado',
        });

    } catch (error) {
        console.log(error);
        return res.status(404).json({

            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}