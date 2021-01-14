/*
RUTA: api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controlers/medicoControler')
const router = Router();

//CRUD
// Se pone router en vez de app pra Medico llamado a la accion 
router.get('/', getMedicos); // La funcion getUsuarios no se ejecuta, solo se llama ... la ejecucion se realiza como tal en el controlador 
router.post('/', // Si se manda 3 argumentos, el segundo argumento corresponde a los midelware, que son funciones, y el  tercero si corresponde a los controladores de siempre
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(), // Para verificar que cumpla con las coniciones, minimo que sea de la longitud requerida
        validarCampos
    ],
    crearMedico);


router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser valido').isMongoId(), // Para verificar que cumpla con las coniciones, minimo que sea de la longitud requerida
        validarCampos
    ],
    actualizarMedico); // se manda el id para que con este se pueda modificar la info    

router.delete('/:id', borrarMedico);



module.exports = router;