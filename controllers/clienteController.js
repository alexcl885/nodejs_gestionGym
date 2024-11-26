//VARIABLE donde tenemos nuestra base de datos
const db = require('../db')

// exporta toda la lista de clientes mas el plan del cliente
exports.clientes = (req, res) => {
  if (req.session.user)
    db.query(
      'SELECT * FROM `cliente`',
      (err, response) => {
        if (err) res.send('ERROR al hacer la consulta')
        else res.render('clientes/clientes', { clientes: response, user: req.session.user })
      }
    )
  else
    res.redirect('/auth/login')

};
// exporta para que podamos entrar en la ruta para añadir un nuevo cliente
exports.clienteAddFormulario = (req, res) => {
  if (req.session.user)
    res.render('clientes/add')
  else
    res.redirect('/auth/login')

};

//exporta la logica para añadir un cliente nuevo (EL SYSDATE PONE LA FECHA ACTUAL QUE SE AÑADIO AL CLIENTE)
exports.clienteAdd = (req, res) => {
  if (req.session.user) {
    const { nombre, correo, telefono } = req.body;
    db.query(
      'INSERT INTO cliente (nombre, correo, fecha_registro, telefono) VALUES (?,?, SYSDATE() ,?)',
      [nombre, correo, telefono],

      (error, respuesta) => {
        if (error) res.send('ERROR INSERTANDO CLIENTE' + req.body)
        else res.redirect('/clientes')
      }
    );
  }
  else res.redirect('/auth/login')
};

// exporta la logica para borrar un cliente situado en el formulario
exports.clienteDelFormulario = (req, res) => {
  if (req.session.user) {
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM cliente WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR BORRAR EL CLIENTE')
          else {
            if (respuesta.length > 0) {
              res.render('clientes/del', { cliente: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR BORRAR EL CLIENTE, NO EXISTE')
            }
          }
        });
  }
  else res.redirect('/auth/login')

};
//exporta la logica para borrar un cliente
exports.clienteDel = (req, res) => {

  const { id } = req.body;
  const paramId = req.params['id'];

  if (isNaN(id) || isNaN(paramId) || id !== paramId) {
    res.send('ERROR BORRANDO')
  } else {
    if (req.session.user) {
      db.query(
        'DELETE FROM cliente WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR BORRANDO CLIENTE')
          else res.redirect('/clientes')
        }
      );
    }
    else res.redirect('/auth/login')
  }
};

//exporta la logica para editar un cliente dentro del formulario
exports.clienteEditFormulario = (req, res) => {
  if (req.session.user){
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM cliente WHERE id=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL CLIENTE')
          else {
            if (respuesta.length > 0) {
              res.render('clientes/edit', { cliente: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR ACTUALIZAR EL CLIENTE, NO EXISTE')
            }
          }
        });
  }
  else res.redirect('/auth/login')
};

/**
 * exporta la logica para editar completamente un cliente por su id en el cual 
 * tambien cambia el plan del cliente
 * 1 º editamos el cliente
 * 2º editamos el plan del cliente
*/

exports.clienteEdit = (req, res) => {
  if (req.session.user){
    const { id, nombre, correo, telefono, plan } = req.body;
    const paramId = req.params['id'];

    if (isNaN(id) || isNaN(paramId) || id !== paramId) {
      res.send('ERROR ACTUALIZANDO')
    } else {
      db.query(
        'UPDATE `cliente` SET `nombre` = ?, `correo` = ? , `telefono` = ?' +
        ' WHERE `id` = ?',
        [nombre, correo, telefono, id],
        (error, respuesta) => {
          if (error) {
            res.send('ERROR ACTUALIZANDO CLIENTE ' + error)
            console.log(error)
          }
          else res.redirect('/clientes')
        }
      );
    }
  }
  else res.redirect('/auth/login')
};





