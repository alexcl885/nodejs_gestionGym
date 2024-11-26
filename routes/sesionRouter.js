const express = require('express');
const router = express.Router();
const sesionController = require('../controllers/sesionController.js');

/**
 * SESIONES
 */

//lista de todo las sesiones
router.get('/', sesionController.sesiones);
//ruta añadir una sesion dentro del formulario
router.get('/add', sesionController.sesionesAddFormulario);
//ruta añadir una sesion
router.post('/add', sesionController.sesionesAdd);
//ruta para borrar una sesion por su id_plan en el formulario
router.get('/del/:id', sesionController.sesionesDelFormulario);
//ruta para borrar una sesion
router.post('/del/:id', sesionController.sesionesDel);
//ruta para editar una sesion dentro del formulario
router.get('/edit/:id', sesionController.sesionesEditFormulario);
//ruta para editar una sesion
router.post('/edit/:id', sesionController.sesionesEdit);

module.exports = router;