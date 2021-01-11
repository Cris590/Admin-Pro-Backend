const { Schema, model } = require('mongoose');
const { getUsuarios } = require('../controlers/usuarioControler');
const router = require('../routes/usuariosRoutes');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false
    }
});

//Para modificar los datos del usuario, especificamente cambiar el _id por uid , solo por comodidad
//Solo para fines visuales, no afecta la data
usuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject(); //No se manda al usuario el password
    object.uid = _id; //Coloca un nuevo elemento en el objeto (uid) con el valor de (_id) 
    return object;
});

module.exports = model('Usuario', usuarioSchema); //Esto es lo que se necesita para exportar o exponer hacia afuera el modelo de usuario, lo unico que cambia son los valores internos