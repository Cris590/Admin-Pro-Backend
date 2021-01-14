/*
RUTA: api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controlers/hospitalControler')
const router = Router();

//CRUD
// Se pone router en vez de app pra hacer el llamado a la accion 
router.get('/', getHospitales); // La funcion getUsuarios no se ejecuta, solo se llama ... la ejecucion se realiza como tal en el controlador 
router.post('/', // Si se manda 3 argumentos, el segundo argumento corresponde a los midelware, que son funciones, y el  tercero si corresponde a los controladores de siempre
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital); // se manda el id para que con este se pueda modificar la info    

router.delete('/:id', validarJWT, borrarHospital);



module.exports = router;