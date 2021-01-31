const { response, json } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


//Se pone el controlador dentro de una constante para poder exportarlo y llamarlo 
const getUsuarios = async(req, res) => { // La solicitud a la ruta raiz "/" ... Tiene 2 argumentos, el req qeu corresponde al que hace la solicitus y el res, que correr=sponde a lo que responde el servidor

    const desde = Number(req.query.desde) || 0; // Query param es un argumento opcional a enviar, se va a utilizar para la paginacion, si no hay numero o argumento entonces regresa un cero
    console.log(desde);

    ////////////////////////////////////
    //LO VAMOS A HACER TODO EN UN SOLA// 
    ////////////////////////////////////


    //const usuario = await Usuario.find({}, 'nombre email role google'). //{}, 'nombre email role google' Para hacer un filtro para que el objeto solo devuelva las variables puestas
    //skip(desde). //Se salta todos los registros anteriores a desde
    //limit(5); // Cuentos argumentos va a ver, es decir permite ver paginas desde: (desde) hasta (desde+1)

    //const total = await Usuario.count(); //Guarda el total de registros 

    /////////////////////////////////// No es muy practica, entonces lo hacemos de la forma que esta abajo

    const [usuario, total] = await Promise.all([ //Ambas promesas se hacen de manera simultanea y cuando ambas se terminan salen del "ciclo"
        //Promesa 1 -> usuario
        Usuario
        .find({}, ' img nombre email role google ') //Asigna estas variables a usuario  
        .skip(desde) //Se salta todos los registros anteriores a desde
        .limit(5),

        //Promesa 2 -> total
        Usuario.countDocuments()
    ])





    res.json({
        ok: "true",
        usuario,
        total
    });
}

const crearUsuarios = async(req, res) => { // La solicitud a la ruta raiz "/" ... Tiene 2 argumentos, el req qeu corresponde al que hace la solicitus y el res, que correr=sponde a lo que responde el servidor

    const { email, password } = req.body; // El asigna por medio de los nombres valor a las variables de la izquierda


    try {

        //VALIDACION SI EXISTE EMAIL
        const existeEmail = await Usuario.findOne({ email }); // Si el usuario(email) existe esta variable se llenara con ese valor, de lo contrario no

        if (existeEmail) {
            return res.status(400).json({ // Se pone el  return para que cancele todo
                ok: "false",
                msg: "El correo ya esta registrado"
            })
        }


        const usuario = new Usuario(req.body); // Con esto se asigna los valores provenientesdel Body, es decir, los datos del usuario, a la variable usuario

        //ENCRIPTAR CONTRASE;A
        const salt = bcrypt.genSaltSync(); // El salt es numero aleatorio que encripta la contrase;a
        usuario.password = bcrypt.hashSync(password, salt); // El usuario.password pertenece a la estructura que se le inicializa a los usuarios, el otro password es el nombre correspondiente a la linea 20, que pertence a los datos ingresados por el usuario
        //

        ///GUARDAR USUARIO

        await usuario.save(); // Se pone como funcion asincrona para que solo hasta que salve los datos del nuevo usuario pase a la siguiente linea

        //console.log(req.body); // De aca vienen los datos enviados por el usuario, porque del req viene la solicitud cargado con los datos 

        //GENERAR TOKEN 
        const token = await generarJWT(usuario.id); // Se trae el id de usuario porque este al guardarlo en la base devuelve el cuerpo con el id 

        res.json({
            ok: "true",
            usuario: usuario,
            msg: 'Creando usuarios',
            token

        });

    } catch (error) {

        res.status(500).json({
            ok: "false",
            msg: "error inesperado ... revisar logs"
        })
    }


}

const actualizarUsuario = async(req, res) => {

    //TODO: validar token y comprobar si el usuaaio es correcto

    const uid = req.params.id; // El id que instroduce el usario al hacer la peticion
    try {

        const usuarioDB = await Usuario.findById(uid);

        //Confirmar que el usuario existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese ID"
            })
        }

        //ACTUALIZACIONES DE LA BASE DE DATOS

        const { password, google, email, ...campos } = req.body; //Con esta desestructuracion se almacena las variables password, google  y email aparte ...y el campos almacea el resto del body

        if (usuarioDB.email !== email) { // Al no cambiar el email toca removerlo,de otra forma chocaria con la validadcion del email unico

            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: "false",
                    msg: "Ya existe un usuario con ese email"
                });
            }
        }

        //Aca le regresa el dato del email a campos para que lo inyecte en el update
        if (!usuarioDB.google) {
            campos.email = email;
        } else if (usuarioDB.email !== email) {
            return res.status(200).json({
                ok: false,
                msg: 'Usuarios de google no pueden cambiar el correo'
            })
        }

        //Lo que no se deberia actualizar...En la desestructuracion de campos se hace esto
        //delete campos.password; // Por si acaso se borra lo que no se necesita ... se puede hacer esto con cualquier cosa 
        //delete campos.google;

        console.log("Campos otra vez ", campos);

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true }); // Actualiza los campos del objeto que corresponde al uid por medio del objeto campos,
        // el cual se entinede ya tiene los datos a actualizarse, el new:true es para que regrese el objeto actualizado



        res.json({
            ok: true,
            uid,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: "False",
            msg: "Error inesperado"
        })
    }

}

const borrarUsuario = async(req, res) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        //Confirmar que el usuario existe
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario por ese ID"
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        console.log(error);
        json.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}


module.exports = { // Se exporta como un obeto para que cuando se lea en otra pagina se pueda desestructurar
    getUsuarios,
    borrarUsuario,
    crearUsuarios,
    actualizarUsuario
}