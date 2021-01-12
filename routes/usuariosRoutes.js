//RUTA: 'api/usuarios' 

const { Router } = require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controlers/usuarioControler');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//CRUD
// Se pone router en vez de app pra hacer el llamado a la accion 
router.get('/', validarJWT, getUsuarios); // La funcion getUsuarios no se ejecuta, solo se llama ... la ejecucion se realiza como tal en el controlador 
router.post('/', // Si se manda 3 argumentos, el segundo argumento corresponde a los midelware, que son funciones, y el  tercero si corresponde a los controladores de siempre
    [ // Pongo los midelware de validacion aca pporque son obligatorios para crear nuevo usuario
        check('nombre', 'el nombre es obligatorio').not().isEmpty(), // Checa el campo nombre(el cual sabe por las validaciones ya hechas)... este no debe estar vacio
        check('password', 'la contraseña es obligatorio').not().isEmpty(), // El segundo argumento es como respuesta si el error pasa
        check('email', 'el correo es obligatorio').isEmail(),
        validarCampos // Se tiene que hacer los checks para que se creen los errores para poder evaluarlos
    ],
    crearUsuarios);


router.put('/:id', [
        validarJWT,
        // Pongo los midelware de validacion aca pporque son obligatorios para crear nuevo usuario, se pone el : para indicar que es una variable
        check('nombre', 'el nombre es obligatorio').not().isEmpty(), // Checa el campo nombre(el cual sabe por las validaciones ya hechas)... este no debe estar vacio
        check('email', 'el correo es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),

        validarCampos, // Se tiene que hacer los checks para que se creen los errores para poder evaluarlos
    ],
    actualizarUsuario); // se manda el id para que con este se pueda modificar la info    

router.delete('/:id', [borrarUsuario, validarJWT]);



module.exports = router;