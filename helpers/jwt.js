const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => { // Se pone aca para que este sea llamado como una promesa ... video 116

        const payload = { // Se pone lo que sea mientras no sea informacion sensible, y es vital para crear el token
            uid
        }
        jwt.sign(payload, process.env.JWTsecret, { //Crear el token
            expiresIn: '12h' // El tiempo que dura el token activo
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(err);
            } else {

                resolve(token);
            }

        })

    })

}

module.exports = {
    generarJWT
}