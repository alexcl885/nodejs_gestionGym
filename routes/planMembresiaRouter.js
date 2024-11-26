const express = require('express');
const router = express.Router();
const plan_membresiaController = require('../controllers/planMembresiaController');

/**
 * PLAN MEMBRESIA
 */
//lista de todo los planes de membresia
router.get('/', plan_membresiaController.planes_membresia);
//ruta añadir un plan de membresia dentro del formulario
router.get('/add', plan_membresiaController.plan_membresiaAddFormulario);
//ruta añadir un plan
router.post('/add', plan_membresiaController.plan_membresiaAdd);
//ruta para borrar un plan por su id_plan en el formulario
router.get('/del/:id', plan_membresiaController.plan_membresiaDelFormulario);
//ruta para borrar un plan
router.post('/del/:id', plan_membresiaController.plan_membresiaDel);
//ruta para editar un plan dentro del formulario
router.get('/edit/:id', plan_membresiaController.plan_membresiaEditFormulario);
//ruta para editar un plan
router.post('/edit/:id', plan_membresiaController.plan_membresiaEdit);

/**
 * CLiente Plan (ideas para cliente plan)
 */


//ruta de nuestro maestro detalle
router.get('/planes_clientes/:id', plan_membresiaController.planes_clientes);
//ruta para añadir cliente al plan
router.get('/planes_clientes_add/:id', plan_membresiaController.planes_clientes_addFormulario);
router.post('/planes_clientes_add/:id', plan_membresiaController.planes_clientes_add);



module.exports = router;