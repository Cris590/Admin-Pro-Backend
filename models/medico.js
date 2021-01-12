const { Schema, model } = require('mongoose');
const router = require('../routes/usuariosRoutes');
const { collection } = require('./usuario');

const medicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Se pone 
        required: true,
    },
    hospital: {

        type: Schema.Types.ObjectId,
        ref: 'Hospital', // Se pone 
        required: true,
    },

});

//Para modificar los datos del usuario, especificamente cambiar el _id por uid , solo por comodidad
//Solo para fines visuales, no afecta la data
medicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); //No se manda al usuario el password
    return object;
});

module.exports = model('Medico', medicoSchema); //Esto es lo que se necesita para exportar o exponer hacia afuera el modelo de usuario, lo unico que cambia son los valores internos