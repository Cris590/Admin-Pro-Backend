const { Schema, model } = require('mongoose');
const router = require('../routes/usuariosRoutes');
const { collection } = require('./usuario');

const hospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId, // Se pone el id con el que se busca en las tablas de Usuarios
        ref: 'Usuario' // Se pone para que el automaticamente pueda buscar informacion en la tabla de usuarios, gracias a la referencia Usuario
    }
}, { collection: 'hospitales' }); // Para que la base de datos creada en mogos no se llames hospitalS, sino hospitales

//Para modificar los datos del usuario, especificamente cambiar el _id por uid , solo por comodidad
//Solo para fines visuales, no afecta la data
hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject(); //No se manda al usuario el password
    return object;
});

module.exports = model('Hospital', hospitalSchema); //Esto es lo que se necesita para exportar o exponer hacia afuera el modelo de usuario, lo unico que cambia son los valores internos