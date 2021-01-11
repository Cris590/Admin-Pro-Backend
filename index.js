const { request } = require('express');
const express = require('express'); // Esta es la forma de importar modulos o dependencias en node

require('dotenv').config(); //Para manejar las variables del archivo .env

const { dbConection } = require('./database/config') // Desestructuro el objeto con {dbConection} porque esto trae un objeto y solo necesitamos esto

var cors = require('cors');

//Crear el servidor Express
const app = express();

//mean_user
//yVY7xJJ69aRrQUDb

//admin_user
//GaSkuLrVp0fDbaFh

//mongodb+srv://admin_user:GaSkuLrVp0fDbaFh@cluster0.n5mxg.mongodb.net/hospitalBD

//Configurar CORS
app.use(cors());

//Lectura y parseo del body (Para leer los datos del frontEnd por peticion POST)
app.use(express.json()); // Se coloca ants de las rutas para que permita leer antes de todo

//Base de datos
dbConection(); // Con eso se hace la coneccion con la base de datos

console.log(process.env); // Establece las variables de entorno del .env en todo el proyecto de node

//Rutas

// Cualquier peticion a la URL, en este caso api/usuarios/ va a ser respondido por el archivo de segundo argumento ... routes/usuarios
app.use('/api/usuarios', require('./routes/usuariosRoutes'));

app.use('/api/login', require('./routes/authRoute'))



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT); // Crea el servidor para ser escuchado or el puerto 3000
})

console.log("Hola mundo");