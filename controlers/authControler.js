const { json } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignIn = async(req, res) => {

    const googleToken = req.body.token || 'XXX';

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        //

        const usuarioBD = await Usuario.findOne({ email }); //Se busca por email porque al ser autentificacion por google es confiable
        let usuario;

        if (!usuarioBD) {

            //Si no existe el usuario.

            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@@", //Por ser autentificacion con google esto no es muy importante.
                img: picture,
                google: true
            });
        } else {
            //Existe usuario

            usuario = usuarioBD;
            usuario.google = true;
            usuario.password = "@@@";

        }

        // Guardar en base de datos

        await usuario.save();

        //Generar el TOKEN - JWT

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            msg: "SignIn con google",
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }


}


const renewToken = async(req, res) => {

    const uid = req.uid;
    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}