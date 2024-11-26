# 🚀 Gestión de Gimnasios

Este proyecto es un **CRUD de gestión de gimnasios** desarrollado como parte del módulo de **Acceso a Datos**, con el objetivo de aprender a trabajar con **Node.js** y **Express**. En colaboración con mi compañero **Daniel Stephen**, hemos creado este sistema que permite gestionar clientes, entrenadores, planes de membresía y sesiones.

---

## 🔧 Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MySQL**
- **Pug (Motor de plantillas)**
- **Docker**
- **Bcrypt** (para encriptación de contraseñas)
- **Bootstrap** (para la interfaz de usuario)

---
## 📂 Estructura del Proyecto

## Inicio del proyecto

Creamos el package.json:

```bash
npm install body-parser dotenv express express-session mysql2 pug
```

Creamos el .gitignore

```txt
node_modules
package-lock.json
.env
```

Iniciamos el repositorio en Git
```bash
git init
```

## Desarrollo de la base de datos

Creamos el docker_compose.yml

```yml
version: '3.1'

services:

  adminer:
    image: adminer
    restart: "no"
    ports:
      - ${ADMINER_PORT}:8080

  db-gimnasio:
    image: mysql:latest
    restart: "no"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - ${MYSQL_PORT}:3306
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d
```
Junto a ello, creamos el .env
```env
MYSQL_ROOT_PASSWORD=miguelon
MYSQL_USERNAME=root
MYSQL_PORT=33308
MYSQL_HOST=localhost
MYSQL_DATABASE=gestion
ADMINER_PORT=8183
SERVICE_PORT=8000
```
Creamos el archivo .sql que se ejecutará cada vez que se inicie el servidor

```sql
CREATE DATABASE IF NOT EXISTS `gestion`;

USE `gestion`;

DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS entrenador;
DROP TABLE IF EXISTS plan_membresia;
DROP TABLE IF EXISTS sesion;
DROP TABLE IF EXISTS cliente_plan;

CREATE TABLE cliente (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(25) NOT NULL , 
	correo VARCHAR(50) NOT NULL,
    fecha_registro DATE NOT NULL,
    telefono varchar(9) NOT NULL );

CREATE TABLE entrenador (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre VARCHAR(25) NOT NULL , 
	especialidad VARCHAR(20) NOT NULL,
    nivel_experiencia VARCHAR(20) NOT NULL );

CREATE TABLE plan_membresia (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	nombre_plan VARCHAR(25) NOT NULL , 
	duracion_meses INT NOT NULL,
    costo FLOAT NOT NULL );

CREATE TABLE sesion (
	id INT AUTO_INCREMENT PRIMARY KEY,
    id_entrenador INT,
    id_cliente INT, 
	fecha_hora_inicio DATE NOT NULL , 
	duracion_minutos INT NOT NULL,
    FOREIGN KEY (id_entrenador) REFERENCES entrenador(id),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) );

CREATE TABLE cliente_plan (
	id_cliente INT NOT NULL, 
	id_plan INT NOT NULL, 
	fecha_inicio DATE NOT NULL,
    PRIMARY KEY (id_cliente, id_plan),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id),
    FOREIGN KEY (id_plan) REFERENCES plan_membresia(id) );
```

## Configuración lanzamiento de app

Añadimos las líneas de código que permiten el acceso a las secciones de la app

```js
app.use('/clientes', clienteRouter);
app.use('/entrenadores', entrenadorRouter);
app.use('/planes', planesRouter);

app.get('/', (req, res) => {
    res.render('index')
});
```
También la configuración adicional como la integración del pug
y la conexión a la BBDD

```js
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const clienteRouter = require('./routes/clienteRouter');

require('dotenv').config({ path: './gesaca/.env' });

const app = express();
const port = process.env.SERVICE_PORT;
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
```

## Routes y Controller
En estas carpetas almacenaremos las rutas y la logica de nuesro codigo.
Primeramente he empezado con clientes ya que sin el no se puede hacer nada y a partir de ahi ire desglosando todo.

### Carpeta ROUTES
En la carpeta Routes creamos todas las rutas de nuestras clases:
- ClienteRouter ->
    He almacenado las rutas de los clientes para poder hacer el CRUD.
- EntrenadorRouter ->
    He almacenado las rutas de los entrenadores.
- SesionRouter -> He almacenado las rutas de los las sesiones.
- PlanMembresiaRouter -> He almacenado las rutas de los planes.

### Carpeta CONTROLLER
- ClienteController ->
    Almacenamos toda la lógica donde tendremos el CRUD de clientes.
- EntrenadorController ->
    Almacenamos toda la lógica del CRUD de entrenadores.
- SesionController -> Almacenamos toda la lógica del CRUD de entrenadores.
- PlanMembresiaController -> Almacenamos toda la lógica edl CRUD de los planes de membresía.

### CRUD de CLIENTES

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /clientes | Listar todos los clientes
GET | /clientes/add | Muestra el formulario para añadir un cliente
POST | /clientes/add | Añade un alumno a la BBDD
GET | /clientes/edit/:id | Muestra el formulario para editar el cliente con ese ID
POST | /clientes/edit/:id | Guarda la información del cliente con ese ID
GET | /clientes/del/:id | Muestra el formulario para borrar el cliente con ese ID
POST | /clientes/del/:id | Borra el cliente con ese ID

### CRUD de ENTRENADORES

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /entrenadores | Listar todos los entrenadores
GET | /entrenadores/add | Muestra el formulario para añadir un entrenador
POST | /entrenadores/add | Añade un entrenador a la BBDD
GET | /entrenadores/edit/:id | Muestra el formulario para editar el entrenador con ese ID
POST | /entrenadores/edit/:id | Guarda la información del entrenador con ese ID
GET | /entrenadores/del/:id | Muestra el formulario para borrar el entrenador con ese ID
POST | /entrenadores/del/:id | Borra el entrenador con ese ID

### SESIONES

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /sesiones | Listar todos las sesiones
GET | /sesiones/add | Muestra el formulario para añadir una sesion
POST | /sesiones/add | Añade una sesion a la BBDD
GET | /sesiones/edit/:id | Muestra el formulario para editar la sesion con ese ID
POST | /sesiones/edit/:id | Guarda la información de la sesion con ese ID
GET | /sesiones/del/:id | Muestra el formulario para borrar la sesion con ese ID
POST | /sesiones/del/:id | Borra la sesion con ese ID

 
### CRUD de PLAN DE MEMBRESIA

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /planes | Listar todos los planes
GET | /planes/add | Muestra el formulario para añadir un plan
POST | /planes/add | Añade un plan a la BBDD
GET | /planes/edit/:id | Muestra el formulario para editar el plan con ese ID
POST | /planes/edit/:id | Guarda la información del plan con ese ID
GET | /planes/del/:id | Muestra el formulario para borrar el plan con ese ID
POST | /planes/del/:id | Borra el plan con ese ID
GET | /planes_clientes/:id | Muestra los clientes registrados en el plan seleccionado
GET | /planes_clientes_add/:id | Muestra el formulario para añadir un cliente al plan seleccionado
POST | /planes_clientes_add/:id | Añade un cliente a ese plan


## Creacion de la conexion a la base de datos

En la raiz del proyecto creo un archivo **db.js** donde creo la conexión a la base de datos.

```js
const mysql = require('mysql2'); 
require('dotenv').config({ path: 'gestion/.env' }); 

/**
 * Conectamos a la base de datos
 */
const db = mysql.createConnection({
    host:       process.env.MYSQL_HOST,
    port:       process.env.MYSQL_PORT,
    user:       process.env.MYSQL_USERNAME,
    password:   process.env.MYSQL_ROOT_PASSWORD,
    database:   process.env.MYSQL_DATABASE,
  });

db.connect(err => {
    if (err) {
      console.error(
        'Error al conectar a MySQL:', err);
      return;
    }
    console.log('Conexión exitosa a MySQL');
  });

module.exports=db;
```

## Maestro-detalle (plan_cliente)

En el pug de los planes hemos añadido otro dato a la tabla llamado clientes que sera nuestro: Maestro-detalle en el cual se selecciona el nombre del plan y te mostrara todos los clientes que se situan en ese plan. 

### Refrescar pagina para maestro detalle
Este codigo sirve para refrescar la pagina, para este código he creado una carpeta public donde hemos metido otra carpeta js en la cual introducimos el siguiente código : 

```js
window.document.addEventListener("change", (ev) => {
    let seleccion = document.getElementById("plan");
    let idPlan = seleccion.options[seleccion.selectedIndex].value
    document.getElementById("planForm").setAttribute(
        "action", "/planes/"+
        document.getElementById("plan").innerText() +
        idPlan +
        "/planes"
    );   
    }
)
```

## Funciones adicionales
#### Añadir un cliente a un plan
En la sección de ver los clientes añadidos a un plan, se ha implementado la función de poder añadir los clientes ha dicho plan, para hacer una aplicación más dinámica.

#### Añadir un login de admin
Al iniciar la aplicación se presentará ante el usuario una pantalla login en la que solo podrá entrar el admin ya previamente registrado en la base de datos.


### LOGIN
---
Usuario y contraseña del admin de esta aplicacion


***USERNAME***(admin) = juangu 

***PASSWORD*** = sinmiedo

---
Realizo un sistema de login sencillo.

#### Para realizar el login/register necesitamos:

- Router del login/register -> rutas del login/register
- Controller del login/register -> lógica del login/register

- Un archivo login.pug -> para renderizar la vista del login 

- Un archivo register.pug -> para renderizar la vista para registrar un nuevo usuario
- Un archivo mensaje.pug -> para renderizar la página inicial al logearse

### LOGIN

| VERBO | RUTA        | ACCION                          |
|-------------|-------------|---------------------------------|
| GET         | /register   | Muestra el formulario de registro (`registerForm`) |
| POST        | /register   | Procesa el registro del usuario (`register`)       |
| GET         | /login      | Muestra el formulario de login (`loginForm`)       |
| POST        | /login      | Procesa el login del usuario (`login`)             |
| GET         | /logout     | Cierra sesión del usuario (`logout`)               |

#### BCRIPT
Necesitamos la instalación de la dependencia *bcript* para el tema de encriptar las contraseñas :

```bash
sudo npm install bcript
```

Aplicación funcionando.
