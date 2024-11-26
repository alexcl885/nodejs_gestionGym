const express = require('express');
const router = express.Router();
const entrenadorController = require('../controllers/entrenadorController');

/**
 * ENTRENADORES
 */
//lista de todos los entrenadores
router.get('/', entrenadorController.entrenadores);
//ruta añadir un  del formulario
router.get('/add', entrenadorController.entrenadorAddFormulario);
//ruta añadir un entrenador
router.post('/add', entrenadorController.entrenadorAdd);
//ruta para borrar un entrenador por su id_cliente en el formulario
router.get('/del/:id', entrenadorController.entrenadorDelFormulario);
//ruta para borrar un entrenador
router.post('/del/:id', entrenadorController.entrenadorDel);
//ruta para editar un entrenador dentro del formulario
router.get('/edit/:id', entrenadorController.entrenadorEditFormulario);
//ruta para editar un entrenador
router.post('/edit/:id', entrenadorController.entrenadorEdit);
//ruta para ver las sesiones de un entrenador
router.get('/entrenadores_sesiones/:id', entrenadorController.entrenadorSesiones);


module.exports = router;