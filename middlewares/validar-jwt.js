const { request } = require("express");
const jwt = require('jsonwebtoken');



const validarJWT = (req, res, next) => {
    //Leer el token
    const token = req.header('x-token'); // Se manda el token por medio del hedaer

    //console.log(token);

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWTsecret); // Corresponde a la variable que se guardo en el payload, y este se almacena con el valor de; token extraido del header anteriormente  
        //Si el uid del token no es valido, es decir el token no es valido, por medio de lafuncion verify este va directo al catch ya que no corresponde
        // console.log(uid);
        req.uid = uid; // Esto va en solicitud del GET ... y al mandarlo asi, se manda este argumento como argumento del request 

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }

    next();
}

module.exports = {
    validarJWT
}