//RUTA: '/api/login'

const { Router } = require('express');
const { login } = require('../controlers/authControler');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [ // Pongo los midelware de validacion aca pporque son obligatorios para crear nuevo usuario
        check('password', 'la contraseña es obligatorio').not().isEmpty(), // El segundo argumento es como respuesta si el error pasa
        check('email', 'el correo es obligatorio').isEmail(),
        validarCampos // Se tiene que hacer los checks para que se creen los errores para poder evaluarlos
    ],
    login)

module.exports = router;