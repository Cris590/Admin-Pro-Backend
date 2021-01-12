// RUTA api/todo/:

const { getTodo, getDocumentos } = require('../controlers/busquedaControler');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

//CRUD


router.get('/:busqueda', [
        validarJWT
    ],
    getTodo); // se manda el id para que con este se pueda modificar la info   

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentos)

module.exports = router;