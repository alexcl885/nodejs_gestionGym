const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

//asignamos el router para todas las secciones de nuestra web
const clienteRouter = require('./routes/clienteRouter');
const entrenadorRouter = require('./routes/entrenadorRouter');
const planesRouter = require('./routes/planMembresiaRouter');
const sesionesRouter = require('./routes/sesionRouter');

const authRouter = require('./routes/loginRouter');



//asignamos el archivo .env que contiene la información para ingresar a la BBDD
require('dotenv').config({ path: './gesaca/.env' });

//Crea el servidor Web
const app = express();
const port = process.env.SERVICE_PORT;
app.use(express.static('public'));

//Configuramos el motor de plantillas 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Middleware para llevar la gestión de sesiones.
 * Si no hay sesión iniciada, arrancamos...
 */
app.use(session({
    secret: 'misupersecretoquenadiesabe',
    resave: true,
    saveUninitialized: false
}));

// cargarmos y configuramos el middleware para gestión de sesiones
app.use((req,res,next)=>{
    res.locals.currentUser = req.session.user;
    if (!req.session.user){        
        if (req.path.startsWith('/auth/login') ||
            req.path.startsWith('/auth/register')){
            // para hacer el GET/POST al login
            next();            
        } else {
            // cuando es una ruta distinta a login
            // me redirecciona al login
            return res.redirect('/auth/login');
        }
    } else {
        // ya estamos logeados        
        next();
    }
});
const authorize = (roles) => {
    return (req, res, next) => {
        const { user } = req.session;
        if (!user || !roles.includes(user.rol)) {
            return res.render('mensaje', {mensajePagina:'No tienes permiso para acceder a esta página.'});
        }
        next();
    };
};


//Delegamos todas las rutas
app.use('/auth', authRouter);
app.use('/clientes', clienteRouter);
app.use('/entrenadores', entrenadorRouter);
app.use('/planes', planesRouter);
app.use('/sesiones', sesionesRouter);



app.get('/', (req, res) => {
    if (req.session.user)
        res.render('index', {user: req.session.user, titulo: 'Inicio'})
    else 
        res.redirect('/login')
});




//Cargamos la página de bienvenida
app.get('/', (req, res) => {
    res.render('index')
    if (req.session.user)
        res.render('index', {user: req.session.user, titulo: 'Inicio'})
    else 
        res.redirect('/login')

});

//Inicialización del app.js
app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });