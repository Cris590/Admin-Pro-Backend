const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => { // El next es para que despues de realizar una tarea o funcion siga con el siguiente objeto
    //VALIDACION DE CAMPOS OBLIGATORIOS
    const errores = validationResult(req); //Muestra los errores captados por el mediaquery check del usuarioRoute para con esto trabajrlos
    if (!errores.isEmpty()) { //Basicamente si errores tiene algo entonces efectiamente hay errores
        return res.status(400).json({
            ok: false,
            errors: errores.mapped() // El mapped es una forma de enviar el error COMO UN OBJETO
        })

    }
    //

    next(); // Si llega aca es poruqe no hubo erroes entocnes sigue con el siguiente argumento a validar
}

module.exports = { validarCampos }