const mongoose = require('mongoose'); // Para conectar el servidor con la base de datos se utiliza el mongoose

const dbConection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Condicion adicional requerida
            useFindAndModify: false,
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al mostrar la base de datos');
    }
}

//Se hace esta funcion para justamente exportar el dbConection y pueda ser usado.. se exporta como un objeto
module.exports = {
    dbConection
}