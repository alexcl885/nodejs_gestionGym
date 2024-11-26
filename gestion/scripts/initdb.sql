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
    FOREIGN KEY (id_entrenador) REFERENCES entrenador(id) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE);

CREATE TABLE cliente_plan (
	id_cliente INT NOT NULL, 
	id_plan INT NOT NULL, 
	fecha_inicio DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id) ON DELETE CASCADE,
    FOREIGN KEY (id_plan) REFERENCES plan_membresia(id) ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL, 
  `enabled` BOOL,
  tipo ENUM('CLIENTE' , 'ADMIN') 
);

SET NAMES utf8mb4;

INSERT INTO cliente (id, nombre, correo, fecha_Registro, telefono) VALUES
(1, 'Luis', 'cliente1@gymcorreo.com', '2022-02-20', '555-6983'),
(2, 'Sofia', 'cliente2@gymcorreo.com', '2016-03-23', '555-6896'),
(3, 'Ana', 'cliente3@gymcorreo.com', '2016-02-02', '555-6864'),
(4, 'Ana', 'cliente4@gymcorreo.com', '2008-02-15', '555-4611'),
(5, 'Sofia', 'cliente5@gymcorreo.com', '2010-01-07', '555-1593'),
(6, 'Luis', 'cliente6@gymcorreo.com', '2013-05-28', '555-1116'),
(7, 'Sofia', 'cliente7@gymcorreo.com', '2008-05-04', '555-2996'),
(8, 'José', 'cliente8@gymcorreo.com', '1992-06-26', '555-9572'),
(9, 'Lucía', 'cliente9@gymcorreo.com', '2019-09-06', '555-3335'),
(10, 'María', 'cliente10@gymcorreo.com', '1990-09-22', '555-7920');

INSERT INTO entrenador (id, nombre, Especialidad, Nivel_Experiencia) VALUES
(1, 'Lucía', 'Crossfit', 'Intermedio'),
(2, 'José', 'Pesas', 'Avanzado'),
(3, 'María', 'Crossfit', 'Avanzado'),
(4, 'Lucía', 'Crossfit', 'Intermedio'),
(5, 'Carlos', 'Pesas', 'Principiante');

INSERT INTO plan_membresia (id, nombre_plan, duracion_meses, costo) VALUES
(1, 'Básico Anual', 12, 214.63),
(2, 'Premium Mensual', 6, 181.74),
(3, 'Elite Mensual', 3, 76.22);

INSERT INTO sesion (id, fecha_hora_inicio, duracion_minutos, id_cliente, id_Entrenador) VALUES
(1, '2000-12-01 17:00:00', 45, 8, 2),
(2, '1991-12-14 09:00:00', 45, 4, 3),
(3, '2021-05-26 10:00:00', 45, 6, 5),
(4, '2011-05-05 11:00:00', 60, 9, 4),
(5, '2007-09-23 09:00:00', 30, 8, 1),
(6, '2005-09-29 21:00:00', 90, 6, 1),
(7, '2008-08-30 15:00:00', 45, 8, 3),
(8, '2005-10-02 07:00:00', 90, 9, 4),
(9, '2011-04-12 11:00:00', 60, 5, 3),
(10, '2001-01-09 12:00:00', 60, 5, 3),
(11, '1999-03-04 20:00:00', 30, 8, 2),
(12, '2001-08-05 07:00:00', 30, 8, 5),
(13, '1991-12-28 15:00:00', 90, 6, 1),
(14, '1996-11-06 20:00:00', 90, 9, 3),
(15, '2000-03-23 16:00:00', 45, 1, 1);


INSERT INTO cliente_plan (id_cliente, id_plan, fecha_inicio) VALUES
(3, 1, '2005-11-08'),
(9, 3, '1998-07-03'),
(2, 1, '2021-01-26'),
(2, 1, '1995-10-28'),
(3, 3, '2003-09-21'),
(9, 1, '2016-09-21'),
(9, 1, '2020-12-23'),
(3, 1, '2006-08-14'),
(6, 1, '2016-04-13'),
(10, 1, '2018-04-18'),
(4, 1, '2021-08-28'),
(10, 3, '2005-05-31'),
(2, 2, '2005-07-14'),
(10, 1, '2011-01-26'),
(6, 1, '2017-07-26');

SET NAMES utf8mb4;

INSERT INTO `users` (`id`, `username`, `password`, `enabled`, `tipo`) VALUES
(1,	'juangu',	'$2b$10$ww.HHCD2c5JLfjLBr7nreuhwkDctYYZIEh3X5B28UdEH3.t88/ZKG',	1,	2);
