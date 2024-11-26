//VARIABLE donde tenemos nuestra base de datos
const db = require('../db.js')

// exporta toda la lista de planes --Realizado y va bien
exports.planes_membresia = (req, res) => {
    if(req.session.user)
        db.query(
            'SELECT * FROM `plan_membresia`',
            (err, response) => {
                if (err) res.send('ERROR al hacer la consulta')
                else res.render('planes/planes', { planes: response })
            }
        );
    else 
        res.redirect('/auth/login')
    
};

// exporta para que podamos entrar en la ruta para añadir un nuevo plan --Realizado y va bien
exports.plan_membresiaAddFormulario = (req, res) => {
    if(req.session.user)
        res.render('planes/add');
    else 
        res.redirect('/auth/login')
};

//exporta la logica para añadir un plan nuevo 
exports.plan_membresiaAdd = (req, res) => {
    if(req.session.user) {
        const { nombre_plan, duracion_meses, costo } = req.body;
        db.query(
            'INSERT INTO plan_membresia (nombre_plan, duracion_meses, costo) VALUES (?,?,?)',
            [nombre_plan, duracion_meses, costo],
            (error, respuesta) => {
                if (error) res.send('ERROR INSERTANDO PLAN' + req.body)
                else res.redirect('/planes')
            }
        )
    }
    else res.redirect('/auth/login')
};

// exporta la logica para borrar un plan situado en el formulario --Realizado y va bien
exports.plan_membresiaDelFormulario = (req, res) => {
    if(req.session.user) {
        const { id } = req.params;
        if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
        else
            db.query(
                'SELECT * FROM plan_membresia WHERE id=?',
                id,
                (error, respuesta) => {
                    if (error) res.send('ERROR al INTENTAR BORRAR EL PLAN')
                    else {
                        if (respuesta.length > 0) {
                            res.render('planes/del', { plan: respuesta[0] })
                        } else {
                            res.send('ERROR al INTENTAR BORRAR EL PLAN, NO EXISTE')
                        }
                    }
                });
    }
    else res.redirect('/auth/login')
};

//exporta la logica para borrar un plan --Realizado y va bien
exports.plan_membresiaDel = (req, res) => {
    if(req.session.user) {
        const { id} = req.body;
        const paramId = req.params['id'];

        if (isNaN(id) || isNaN(paramId) || id !== paramId) {
            res.send('ERROR BORRANDO')
        } else {
            db.query(
                'DELETE FROM plan_membresia WHERE id=?',
                id,
                (error, respuesta) => {
                    if (error) res.send('ERROR BORRANDO PLAN' + req.body)
                    else res.redirect('/planes')
                }
            );
        }
    }
    else res.redirect('/auth/login')

};
//exporta la logica para editar un plan dentro del formulario --Realizado y va bien
exports.plan_membresiaEditFormulario = (req, res) => {
    if(req.session.user) {
        const { id } = req.params;
        if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
        else
            db.query(
                'SELECT * FROM plan_membresia WHERE id=?',
                id,
                (error, respuesta) => {
                    if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL PLAN')
                    else {
                        if (respuesta.length > 0) {
                            res.render('planes/edit', { plan: respuesta[0] })
                        } else {
                            res.send('ERROR al INTENTAR ACTUALIZAR EL PLAN, NO EXISTE')
                        }
                    }
                });
    }
    else res.redirect('/auth/login')
};

//exporta la logica para editar completamente un plan por su id_plan --Realizado y va bien

exports.plan_membresiaEdit = (req, res) => {
    if(req.session.user) {

        const { id, nombre_plan, duracion_meses, costo } = req.body;
        const paramId = req.params['id'];

        if (isNaN(id) || isNaN(paramId) || id !== paramId) {
            res.send('ERROR ACTUALIZANDO')
        } else {
            db.query(
                'UPDATE `plan_membresia` SET `nombre_plan` = ?, `duracion_meses` = ? , `costo` = ?' +
                ' WHERE `id` = ?',
                [nombre_plan, duracion_meses, costo, id],
                (error, respuesta) => {
                    if (error) {
                        res.send('ERROR ACTUALIZANDO PLAN' + error)
                        console.log(error)
                    }
                    else res.redirect('/planes')
                }
            );
        }
    }
    else res.redirect('/auth/login')
};

/**
 * En el plan salga un apartado de los clientes de ese plan
 */

exports.planes_clientes = (req, res) => {
    if(req.session.user) {

        if (isNaN(req.params.id))
            res.send('Error al buscar los planes')
        else {
            db.query(
                'SELECT * FROM `plan_membresia` ',
                (error, listaPlanes) => {
                    if (!error) {
                        db.query(
                            'SELECT  cliente.* ' +
                            'FROM cliente  ' +
                            'JOIN cliente_plan ON cliente.id = cliente_plan.id_cliente ' +
                            'JOIN plan_membresia ON cliente_plan.id_plan = plan_membresia.id ' +
                            'WHERE plan_membresia.id = ? ; ',
                            [req.params.id],
                            (err, listaClientes) => {
                                if (err) res.send('ERROR al hacer la consulta')
                                else {
                                    res.render('planes/planes_clientes',
                                        { clientes: listaClientes, planes: listaPlanes, idPlan: req.params.id })
                                }
                            }
                        );
                    } else {
                        res.send('No hay clientes en el plan');
                    }
                }
            );
        }
    }
    else res.redirect('/auth/login')
};

exports.planes_clientes_addFormulario = (req, res) => {
    if(req.session.user) {

        if (isNaN(req.params.id))
            res.send('Error al buscar los planes')
        else {
            db.query(
                'SELECT * FROM cliente',
                (error, respuesta) => {
                    if (error) res.send('ERROR AL CONSULTAR LOS CLIENTES')
                    else {
                        db.query(
                            'SELECT * FROM `plan_membresia` WHERE id=?',
                            [req.params.id],
                            (error, respuestaPlan) => {
                                if (error) res.send('ERROR AL CONSULTAR LOS PLANES')
                                else {
                                    res.render('planes/planes_clientes_add', 
                                        { clientes: respuesta, plan: respuestaPlan[0], idPlan: req.params.id })
                                }
                            }
                        )
                    }
                });
        }
    }
    else res.redirect('/auth/login')
};

exports.planes_clientes_add = (req, res) => {
    if(req.session.user) {

        const { idPlan, cliente } = req.body;

        if (isNaN(idPlan)) {
            res.send('ERROR ACTUALIZANDO')
        } else {
            db.query(
                'INSERT INTO `cliente_plan` (`id_cliente`, `id_plan`, `fecha_inicio`) VALUES ( ?, ?, SYSDATE())',
                [cliente, idPlan],
                (error, respuesta) => {
                    if (error) {
                        res.send('ERROR AÑADIENDO CLIENTE AL PLAN' + error)
                        console.log(error)
                    }
                    else res.redirect(`/planes/planes_clientes/${idPlan}`)
                }
            );
        }
    }
    else res.redirect('/auth/login')
};
