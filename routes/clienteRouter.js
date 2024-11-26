const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * CLIENTES
 */
//lista de todos los clientes
router.get('/', clienteController.clientes);
//ruta añadir un cliente del formulario
router.get('/add', clienteController.clienteAddFormulario);
//ruta añadir un cliente
router.post('/add', clienteController.clienteAdd);
//ruta para borrar un cliente por su id_cliente en el formulario
router.get('/del/:id', clienteController.clienteDelFormulario);
//ruta para borrar un cliente
router.post('/del/:id', clienteController.clienteDel);
//ruta para editar un cliente dentro del formulario
router.get('/edit/:id', clienteController.clienteEditFormulario);
//ruta para editar un cliente
router.post('/edit/:id', clienteController.clienteEdit);



module.exports = router;