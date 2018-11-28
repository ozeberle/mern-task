const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3001);

//Middlewares
app.use(morgan('dev')); // 'dev' recibe las peticiones y muestra los codigos por consola. Ej: 301, 404, 200, 202
app.use(express.json()); //Cada vez que llegue un dato al servidor, va comprobar si el dato viene en formato JSON

// Routes
app.use('/api/task', require('./routes/task.routes')); //Especifico el archivo de las rutas

// Static files
app.use(express.static(path.join(__dirname, 'public'))); //direccion donde figura la carpeta public para mostrar los HTML
    
app.listen(app.get('port'), () => {
    console.log(`Server port in ${app.get("port")}`);
});


// https://www.youtube.com/watch?v=DqpL5UtJHus continuar