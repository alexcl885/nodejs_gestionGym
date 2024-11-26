//VARIABLE donde tenemos nuestra base de datos
const db = require('../db')

// exporta toda la lista de sesiones
exports.sesiones = (req, res) => {
  if (req.session.user) {
    db.query(
      'SELECT sesion.id, entrenador.nombre AS nombre_entrenador, cliente.nombre AS nombre_cliente, sesion.fecha_hora_inicio, sesion.duracion_minutos ' +
      'FROM sesion ' +
      'JOIN cliente ON sesion.id_cliente = cliente.id ' +
      'JOIN entrenador ON sesion.id_entrenador = entrenador.id;',
      (err, response) => {
        if (err) res.send('ERROR al hacer la consulta')
        else res.render('sesiones/sesiones', { sesiones: response })
      }
    );
  }
  else res.redirect('/auth/login')
};

// exporta para que podamos entrar en la ruta para añadir una nueva sesion
exports.sesionesAddFormulario = (req, res) => {
  if (req.session.user) {
    db.query(
      'SELECT * from cliente',
      (err, responseCliente) => {
        if (err) res.send('ERROR CONSULTANDO CLIENTES')
        else {
          db.query(
            'SELECT * from entrenador',
            (err, responseEntrenador) => {
              if (err) res.send('ERROR CONSULTANDO ENTRENADORES')
              else res.render('sesiones/add', { clientes: responseCliente, entrenadores: responseEntrenador });
            })
        }
      }
    )
  }
  else res.redirect('/auth/login')
};


//exporta la logica para añadir una sesion nueva 
exports.sesionesAdd = (req, res) => {
  if (req.session.user) {
    const { entrenador, cliente, duracion_minutos } = req.body;
    db.query(
      'INSERT INTO sesion (id_entrenador, id_cliente, fecha_hora_inicio, duracion_minutos) VALUES (?, ?, SYSDATE() ,?)',
      [entrenador, cliente, duracion_minutos],
      (error, respuesta) => {
        if (error) res.send('ERROR INSERTANDO SESION' + req.body)
        else res.redirect('/sesiones')
      }
    );
  }
  else res.redirect('/auth/login')
};

// exporta la logica para borrar una sesion situado en el formulario
exports.sesionesDelFormulario = (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT sesion.id, entrenador.nombre AS nombre_entrenador, cliente.nombre AS nombre_cliente ' +
        'FROM sesion ' +
        'JOIN cliente ON sesion.id_cliente = cliente.id ' +
        'JOIN entrenador ON sesion.id_entrenador = entrenador.id ' +
        'WHERE sesion.id = ?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR AL CONSULTAR LA SESION')
          else {
            if (respuesta.length > 0) {
              res.render('sesiones/del', { sesion: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR BORRAR LA SESION, NO EXISTE')
            }
          }
        });
  }
  else res.redirect('/auth/login')

};

//exporta la logica para borrar una sesion
exports.sesionesDel = (req, res) => {
  if (req.session.user) {
    const { id } = req.body;
    const paramId = req.params['id'];

    if (isNaN(id) || isNaN(paramId) || id !== paramId) {
      res.send('ERROR BORRANDO')
    } else {
      db.query(
        'DELETE FROM sesion WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR BORRANDO SESION' + req.body)
          else res.redirect('/sesiones')
        }
      );
    }
  }
  else res.redirect('/auth/login')
};

//exporta la logica para editar una sesion dentro del formulario
exports.sesionesEditFormulario = (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT sesion.id, sesion.id_entrenador, sesion.id_cliente, entrenador.nombre AS nombre_entrenador, cliente.nombre AS nombre_cliente, sesion.duracion_minutos ' +
        'FROM sesion ' +
        'JOIN cliente ON sesion.id_cliente = cliente.id ' +
        'JOIN entrenador ON sesion.id_entrenador = entrenador.id ' +
        'WHERE sesion.id = ?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR ACTUALIZAR LA SESION')
          else {
            db.query(
              'SELECT * from cliente',
              (err, responseCliente) => {
                if (err) res.send('ERROR CONSULTANDO CLIENTES')
                else {
                  db.query(
                    'SELECT * from entrenador',
                    (err, responseEntrenador) => {
                      if (err) res.send('ERROR CONSULTANDO ENTRENADORES')
                      else {
                        if (respuesta.length > 0) {
                          res.render('sesiones/edit', { sesion: respuesta[0], entrenadores: responseEntrenador, clientes: responseCliente })
                        } else {
                          res.send('ERROR al INTENTAR ACTUALIZAR LA SESION, NO EXISTE')
                        }
                      }
                    })
                }
              }
            )
          }
        });
  }
  else res.redirect('/auth/login')
};

//exporta la logica para editar completamente una sesion por su id

exports.sesionesEdit = (req, res) => {

  const { id, entrenador, cliente, duracion_minutos } = req.body;
  const paramId = req.params['id'];
  if (req.session.user) {
    if (isNaN(id) || isNaN(paramId) || id !== paramId) {
      res.send('ERROR ACTUALIZANDO')
    } else {
      db.query(
        'UPDATE `sesion` SET `id_entrenador` = ?, `id_cliente` = ?, `duracion_minutos` = ? ' +
        ' WHERE `id` = ?',
        [entrenador, cliente, duracion_minutos, id],
        (error, respuesta) => {
          if (error) {
            res.send('ERROR ACTUALIZANDO SESION' + error)
            console.log(error)
          }
          else res.redirect('/sesiones')
        }
      );
    }
  }
  else res.redirect('/auth/login')
};

