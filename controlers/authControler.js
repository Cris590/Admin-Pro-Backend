const { json } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const usuariosDB = await Usuario.findOne({ email });

        // VERIFICAR EMAIL
        if (!usuariosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email o contraseña no validos',

            })
        }

        // VERFICAR CONTRASE;A

        const validPassword = bcrypt.compareSync(password, usuariosDB.password); // Regresa un true si es que las contrase;as son validas

        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'email o contraseña no validos'
            })
        }

        //Generar el token para hacer la verificacion

        const token = await generarJWT(usuariosDB._id); //Se pone el await porque esto retorne una promesa

        res.json({
            ok: true,
            token
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Hable on el admin"
        })
    }
}

module.exports = {
    login
}