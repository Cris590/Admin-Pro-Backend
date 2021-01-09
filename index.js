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

//Base de datos
dbConection(); // Con eso se hace la coneccion con la base de datos

console.log(process.env); // Establece las variables de entorno del .env en todo el proyecto de node

//Rutas

app.get('/', (req, res) => { // La solicitud a la ruta raiz "/" ... Tiene 2 argumentos, el req qeu corresponde al que hace la solicitus y el res, que correr=sponde a lo que responde el servidor
    res.json({
        ok: "true",
        msg: "Hola mundo"
    })

});


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT); // Crea el servidor para ser escuchado or el puerto 3000
})

console.log("Hola mundo");