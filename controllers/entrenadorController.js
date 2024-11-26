//VARIABLE donde tenemos nuestra base de datos
const db = require('../db')

// exporta toda la lista de entrenadores --Realizado y va bien
exports.entrenadores = (req, res) => {
  if (req.session.user) {
    db.query(
      'SELECT * FROM `entrenador`',
      (err, response) => {
        if (err) res.send('ERROR al hacer la consulta')
        else res.render('entrenadores/entrenadores', { entrenadores: response })
      }
    );
  }
  else res.redirect('/auth/login')
};

// exporta para que podamos entrar en la ruta para añadir un nuevo entrenador
exports.entrenadorAddFormulario = (req, res) => {
  if (req.session.user) {
    res.render('entrenadores/add');
  }
  else res.redirect('/auth/login')
};


//exporta la logica para añadir un entrenador nuevo -- Realizado bien
exports.entrenadorAdd = (req, res) => {
  const { nombre, especialidad, nivel_experiencia } = req.body;
  if (req.session.user) {
    db.query(
      'INSERT INTO entrenador (nombre, especialidad, nivel_experiencia) VALUES (?,?,?)',
      [nombre, especialidad, nivel_experiencia],
      (error, respuesta) => {
        if (error) res.send('ERROR INSERTANDO ENTRENADOR' + req.body)
        else res.redirect('/entrenadores')
      }
    );
  }
  else res.redirect('/auth/login')
};

// exporta la logica para borrar un entrenador situado en el formulario -Realizado bien
exports.entrenadorDelFormulario = (req, res) => {
  const { id } = req.params;
  if (req.session.user) {
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM entrenador WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR BORRAR EL ENTRENADOR')
          else {
            if (respuesta.length > 0) {
              res.render('entrenadores/del', { entrenador: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR BORRAR EL ENTRENADOR, NO EXISTE')
            }
          }
        });
  }
  else res.redirect('/auth/login')

};

//exporta la logica para borrar un entrenador --REALIZADO Y VA BIEN
exports.entrenadorDel = (req, res) => {
  const { id, nombre, especialidad, nivel_experiencia } = req.body;
  const paramId = req.params['id'];
  if (req.session.user) {
    if (isNaN(id) || isNaN(paramId) || id !== paramId) {
      res.send('ERROR BORRANDO')
    } else {
      db.query(
        'DELETE FROM entrenador WHERE id =?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR BORRANDO ENTREANDOR' + req.body)
          else res.redirect('/entrenadores')
        }
      );
    }
  }
  else res.redirect('/auth/login')
};

//exporta la logica para editar un entrenador dentro del formulario
exports.entrenadorEditFormulario = (req, res) => {
  const { id } = req.params;
  if (req.session.user) {
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM entrenador WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL ENTRENADOR')
          else {
            if (respuesta.length > 0) {
              res.render('entrenadores/edit', { entrenador: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR ACTUALIZAR EL ENTRENADOR, NO EXISTE')
            }
          }
        });
  }
  else res.redirect('/auth/login')
};

//exporta la logica para editar completamente un entrenador por su id_entrenador

exports.entrenadorEdit = (req, res) => {

  const { id, nombre, especialidad, nivel_experiencia } = req.body;
  const paramId = req.params['id'];
  if (req.session.user) {
    if (isNaN(id) || isNaN(paramId) || id !== paramId) {
      res.send('ERROR ACTUALIZANDO')
    } else {
      db.query(
        'UPDATE `entrenador` SET `nombre` = ?, `especialidad` = ? , `nivel_experiencia` = ?' +
        ' WHERE `id` = ?',
        [nombre, especialidad, nivel_experiencia, id],
        (error, respuesta) => {
          if (error) {
            res.send('ERROR ACTUALIZANDO ENTRENADOR' + error)
            console.log(error)
          }
          else res.redirect('/entrenadores')
        }
      );
    }
  }
  else res.redirect('/auth/login')
};

exports.entrenadorSesiones = (req, res) => {
  if(req.session.user) {

    if (isNaN(req.params.id))
        res.send('Error al buscar los entrenadores')
    else {
        db.query(
            'SELECT * FROM `entrenador` ',
            (error, responseEntrenadores) => {
                if (!error) {
                    db.query(
                        'SELECT sesion.*, cliente.nombre AS cliente ' +
                        'FROM `sesion`, `cliente`  ' +
                        'WHERE sesion.id_entrenador = ?  ' +
                        'AND sesion.id_cliente = cliente.id; ',
                        [req.params.id],
                        (err, listaSesiones) => {
                            if (err) res.send('ERROR al hacer la consulta')
                            else {
                                res.render('entrenadores/entrenadores_sesiones',
                                    { entrenadores: responseEntrenadores, sesiones: listaSesiones, idEntrenador: req.params.id })
                            }
                        }
                    );
                } else {
                    res.send('No hay sesiones para este entrenador');
                }
            }
        );
    }
}
else res.redirect('/auth/login')
}

