-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 03-03-2012 a las 14:02:36
-- Versión del servidor: 5.5.8
-- Versión de PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `admins_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `td_drf_detalle_relacion_fab`
--

CREATE TABLE IF NOT EXISTS `td_drf_detalle_relacion_fab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rfa` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `costo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_td_drf_detalle_relacion_fab_tm_rfa_relacion_fabricacion` (`id_rfa`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Volcar la base de datos para la tabla `td_drf_detalle_relacion_fab`
--

INSERT INTO `td_drf_detalle_relacion_fab` (`id`, `id_rfa`, `descripcion`, `cantidad`, `costo`) VALUES
(1, 1, 'Doble Borde Redondo', 1.89, 65),
(2, 2, 'Doble Borde Redondo', 3.58, 65),
(3, 2, 'Salpicadero', 4.52, 55),
(4, 2, 'Fald&oacute;n', 3.58, 40),
(5, 3, 'Doble Borde Redondo', 6.57, 65),
(6, 3, 'Corte Recto', 4.51, 40),
(7, 3, 'Salpicadero', 3.02, 55),
(8, 3, 'Base Hexagonal', 1, 300),
(9, 4, 'Doble Borde Cuadrado', 2.6, 65),
(10, 4, 'Corte Recto', 4.8, 40),
(11, 4, 'Salpicadero', 1.3, 55),
(12, 5, 'Borde Sencillo', 11, 60),
(13, 5, 'Fald&oacute;n', 11, 40),
(14, 6, 'Doble Borde Chaflaneado', 4.08, 65),
(15, 6, 'Corte Recto', 4.75, 40),
(16, 6, 'Salpicadero', 1.29, 55),
(17, 7, 'Borde Sencillo', 26.05, 60),
(18, 7, 'Rodapi&eacute;', 26.05, 40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `td_dri_detalle_relacion_ins`
--

CREATE TABLE IF NOT EXISTS `td_dri_detalle_relacion_ins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rin` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `costo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_td_dri_detalle_relacion_ins_tm_rin_relacion_instalacion` (`id_rin`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Volcar la base de datos para la tabla `td_dri_detalle_relacion_ins`
--

INSERT INTO `td_dri_detalle_relacion_ins` (`id`, `id_rin`, `descripcion`, `cantidad`, `costo`) VALUES
(14, 6, 'Instalaci&oacute;n de Tope', 7.56, 65),
(15, 6, 'Hueco de Cocina y Fregadero', 1, 70),
(16, 6, 'Hueco de Grifer&iacute;a', 2, 60),
(17, 6, 'Pared', 1.56, 65),
(18, 6, 'Hueco de Cajet&iacute;n', 2, 70),
(19, 6, 'Salpicadero', 1.9, 35),
(20, 7, 'Borde Sencillo', 1.96, 60),
(21, 7, 'Instalaci&oacute;n de Tope', 1, 65),
(22, 7, 'Ponchera', 1, 40),
(23, 8, 'Instalaci&oacute;n de Tope', 1, 65),
(24, 8, 'Hueco de Cocina y Fregadero', 1, 70),
(25, 8, 'Hueco de Grifer&iacute;a', 1, 60),
(26, 8, 'Salpicadero', 2.38, 35),
(27, 9, 'Instalaci&oacute;n de Tope', 1, 65),
(28, 9, 'Hueco de Cocina y Fregadero', 1, 70),
(29, 9, 'Hueco de Grifer&iacute;a', 1, 60),
(30, 9, 'Salpicadero', 1, 35),
(31, 10, 'Instalaci&oacute;n de Tope', 5.38, 65),
(32, 10, 'Hueco de Cocina y Fregadero', 2, 70),
(33, 10, 'Hueco de Grifer&iacute;a', 1, 60),
(34, 10, 'Pared', 4.74, 65),
(35, 10, 'Hueco de Cajet&iacute;n', 4, 70),
(36, 10, 'Salpicadero', 2.21, 35),
(37, 11, 'Instalaci&oacute;n de Tope', 5.13, 65),
(38, 11, 'Hueco de Cocina y Fregadero', 2, 70),
(39, 11, 'Pared', 4.51, 65),
(40, 11, 'Hueco de Cajet&iacute;n', 4, 70),
(41, 11, 'Salpicadero', 3.02, 35),
(42, 11, 'Instalaci&oacute;n de Base', 1, 80);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_con_contratista`
--

CREATE TABLE IF NOT EXISTS `tm_con_contratista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) NOT NULL,
  `apellido` varchar(25) NOT NULL,
  `cedula` varchar(10) NOT NULL,
  `sexo` varchar(10) NOT NULL,
  `e_civil` varchar(10) DEFAULT NULL,
  `f_nacimiento` date NOT NULL,
  `l_nacimiento` varchar(25) DEFAULT NULL,
  `tlf_fijo` varchar(15) DEFAULT NULL,
  `tlf_movil` varchar(15) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `f_ingreso` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Volcar la base de datos para la tabla `tm_con_contratista`
--

INSERT INTO `tm_con_contratista` (`id`, `nombre`, `apellido`, `cedula`, `sexo`, `e_civil`, `f_nacimiento`, `l_nacimiento`, `tlf_fijo`, `tlf_movil`, `direccion`, `email`, `f_ingreso`) VALUES
(1, 'JESUS JAVIER', 'BRITO MOREY', '17404108', 'Masculino', 'Soltero', '1981-12-24', 'PORLAMAR', '0295 808 9072', '0416', 'PORLAMAR', 'jesusbrito@hotmail.com', '2010-02-20'),
(2, 'LUIS EGARDO', 'HERNANDEZ', '14761848', 'Masculino', 'Soltero', '1980-03-03', 'SAN CRISTOBAL', '0295 808 9072', '0416', 'PORLAMAR', 'luisedgado@hotmail.com', '2008-06-21'),
(3, 'HERNANDO', 'MENDOZA', '15725562', 'Masculino', 'Soltero', '1982-07-13', 'CARACAS', '0295 808 9072', '0416', 'PORLAMAR', 'stevenhdo@hotmail.com', '2008-09-19'),
(4, 'RICARDO', 'RAMOS PEREZ', '18113556', 'Masculino', 'Soltero', '1986-04-24', 'CATIALAMAR', '0295 808 9072', '0416', 'PORLAMAR', 'loquetegustaya@hotmail.com', '2008-12-23'),
(5, 'CHRISVIER ALEXANDER', 'GOMEZ MARCANO', '19318011', 'Masculino', 'Soltero', '1989-02-04', 'PORLAMAR', '0295 808 9072', '0416', 'PORLAMAR', 'chrisvier@hotmail.com', '2009-05-27'),
(6, 'ERIC', 'RAMIREZ GONZALEZ ', '16336165', 'Masculino', 'Soltero', '1981-03-11', 'BARQUISIMETO', '0295 274 2462', '0426 289 3234', 'CALLE LAS FLORES RES. LA CHACALERA', 'eric_rusticky@hotmail.com', '2008-11-14'),
(7, 'HERIBERTO ENRIQUE', 'BRACHO FERNANDEZ ', '20149549', 'Masculino', 'Soltero', '1989-11-28', 'Maracaibo', '0295 808 9072', '0416', 'porlamar ', 'heriberto@hotmail.com', '2009-05-29'),
(8, 'GILBERTO JOSE', 'MARTINEZ IBARRA', '16825766', 'Masculino', 'Soltero', '1983-12-31', 'PORLAMAR', '0295 808 9072', '0416', 'EL VALLE', 'gilberto@hotmail.com', '2008-06-21'),
(9, 'ANDRES', 'SANCHEZ BARON', '21326887', 'Masculino', 'Soltero', '1969-09-16', 'Cartagena Colombia', '0295 274 4650', '0426 586 5512', 'Isleta 2 Calle 8 Casa 83-92', 'baronandres@hotmail.com', '2012-01-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_cxc_cuentas_por_cobrar`
--

CREATE TABLE IF NOT EXISTS `tm_cxc_cuentas_por_cobrar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_con` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `pendiente` double NOT NULL,
  `estado` varchar(15) NOT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_cxc_cuentas_por_cobrar_tm_con_contratista` (`id_con`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Volcar la base de datos para la tabla `tm_cxc_cuentas_por_cobrar`
--

INSERT INTO `tm_cxc_cuentas_por_cobrar` (`id`, `id_con`, `fecha`, `tipo`, `pendiente`, `estado`, `total`) VALUES
(4, 7, '2011-12-30', 'Prestamo', 13420, 'NO_PROCESADO', 13420),
(5, 1, '2011-12-30', 'Prestamo', 916.24, 'NO_PROCESADO', 916.24),
(6, 3, '2011-12-30', 'Prestamo', 26387.96, 'NO_PROCESADO', 26387.96),
(7, 5, '2011-12-30', 'Prestamo', 5422.47, 'NO_PROCESADO', 5772.47),
(8, 6, '2011-12-30', 'Prestamo', 8432.65, 'NO_PROCESADO', 8432.65),
(9, 8, '2011-12-30', 'Prestamo', 17091.71, 'NO_PROCESADO', 18427.26),
(10, 2, '2011-12-30', 'Prestamo', 9747.83, 'NO_PROCESADO', 9747.83),
(11, 4, '2011-12-30', 'Prestamo', 5751.55, 'NO_PROCESADO', 5751.55),
(12, 5, '2012-01-13', 'Vale', 0, 'PROCESADO', 380),
(13, 8, '2012-01-11', 'Adelanto', 0, 'PROCESADO', 500),
(14, 8, '2012-01-13', 'Vale', 0, 'PROCESADO', 49);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_cxp_cuentas_por_pagar`
--

CREATE TABLE IF NOT EXISTS `tm_cxp_cuentas_por_pagar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_con` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `total_rel` double DEFAULT NULL,
  `total_cxc` double DEFAULT NULL,
  `num_factura` varchar(25) DEFAULT NULL,
  `forma_pago` varchar(25) NOT NULL,
  `banco` varchar(25) NOT NULL,
  `num_item` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_cxp_cuentas_por_pagar_tm_con_contratista` (`id_con`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Volcar la base de datos para la tabla `tm_cxp_cuentas_por_pagar`
--

INSERT INTO `tm_cxp_cuentas_por_pagar` (`id`, `id_con`, `fecha`, `total_rel`, `total_cxc`, `num_factura`, `forma_pago`, `banco`, `num_item`) VALUES
(5, 6, '2012-01-13', 1211.8999999999999, 0, '0156', '', '', ''),
(6, 5, '2012-01-13', 2955.75, 730, '0135', '', '', ''),
(7, 8, '2012-01-14', 6484.55, 1884.55, '0232', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_nor_numero_orden`
--

CREATE TABLE IF NOT EXISTS `tm_nor_numero_orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Volcar la base de datos para la tabla `tm_nor_numero_orden`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_rfa_relacion_fabricacion`
--

CREATE TABLE IF NOT EXISTS `tm_rfa_relacion_fabricacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `con_id` int(11) NOT NULL,
  `num_orden` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cli_nombre` varchar(25) NOT NULL,
  `cli_direccion` varchar(100) DEFAULT NULL,
  `cli_material` varchar(50) DEFAULT NULL,
  `gastos_especiales` double DEFAULT NULL,
  `estado` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_rfa_relacion_fabricacion_tm_con_contratista` (`con_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Volcar la base de datos para la tabla `tm_rfa_relacion_fabricacion`
--

INSERT INTO `tm_rfa_relacion_fabricacion` (`id`, `con_id`, `num_orden`, `fecha`, `cli_nombre`, `cli_direccion`, `cli_material`, `gastos_especiales`, `estado`) VALUES
(1, 8, 0, '2012-01-14', 'Andreina', 'El Poblado', 'PorriÃ±o', 0, 'PROCESADO'),
(2, 8, 0, '2012-01-14', 'Dayinira Guevara', 'Achipano', 'Butterfly Gold', 0, 'PROCESADO'),
(3, 8, 0, '2012-01-14', 'Maria Cordoba', 'Los Cayos Apt. A-1-2', 'Giallo Venetian', 0, 'PROCESADO'),
(4, 8, 0, '2012-01-14', 'Ceramicas Juan Griego', 'Residencias El Catire, Piso 1 Apt. 004', 'Rosabel', 0, 'PROCESADO'),
(5, 8, 0, '2012-01-14', 'Victor Beltran', 'C.C CCM', 'Silestone Rojo Rubi', 0, 'PROCESADO'),
(6, 8, 0, '2012-01-14', 'Eric Carmona', 'Las Terrazas de Genoves', 'Labrador Oscuro', 0, 'PROCESADO'),
(7, 8, 0, '2012-01-14', 'Yanet Salazar', 'La Fundacion Mundo Nuevo', 'Crema Marfil', 0, 'PROCESADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_rin_relacion_instalacion`
--

CREATE TABLE IF NOT EXISTS `tm_rin_relacion_instalacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `con_id` int(11) NOT NULL,
  `num_orden` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cli_nombre` varchar(25) NOT NULL,
  `cli_direccion` varchar(100) DEFAULT NULL,
  `cli_material` varchar(50) DEFAULT NULL,
  `gastos_especiales` double DEFAULT NULL,
  `estado` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_rin_relacion_instalacion_tm_con_contratista` (`con_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Volcar la base de datos para la tabla `tm_rin_relacion_instalacion`
--

INSERT INTO `tm_rin_relacion_instalacion` (`id`, `con_id`, `num_orden`, `fecha`, `cli_nombre`, `cli_direccion`, `cli_material`, `gastos_especiales`, `estado`) VALUES
(6, 6, 0, '2012-01-13', 'Eduardo', 'Morro I', 'Negro', 0, 'PROCESADO'),
(7, 6, 0, '2012-01-13', 'Ariel', 'Jorge Coll', 'Crema Marfil', 0, 'PROCESADO'),
(8, 5, 0, '2012-01-13', 'Ramon P', 'Taguantar', 'B. Zeus', 0, 'PROCESADO'),
(9, 5, 0, '2012-01-13', 'Domingo R', 'Guacuco', 'Travertino', 0, 'PROCESADO'),
(10, 5, 0, '2012-01-13', 'Almas Davis', 'El Palmar', 'Negro Brasil', 0, 'PROCESADO'),
(11, 5, 0, '2012-01-13', 'Maria C', 'Los Cayos', 'Gol Venecia', 0, 'PROCESADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tm_usu_usuario`
--

CREATE TABLE IF NOT EXISTS `tm_usu_usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(25) NOT NULL,
  `pass` varchar(35) NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `estado` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usu_login` (`login`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcar la base de datos para la tabla `tm_usu_usuario`
--

INSERT INTO `tm_usu_usuario` (`id`, `login`, `pass`, `tipo`, `estado`) VALUES
(2, 'admin', 'cfc507e618384e1b510368122d2d71cb', 'Administrador', 'Activo'),
(3, 'douglas', '1ea65bdc2889d57aaeff7f6805a14c8e', 'Usuario', 'Activo'),
(4, 'Darwin', '1caf63504b72e20b7d7e0f1f896b05de', 'Usuario', 'Activo'),
(5, 'Andrea', '98db6b79acb71383b5a83e0bbc1cadd4', 'Usuario', 'Activo');

--
-- Filtros para las tablas descargadas (dump)
--

--
-- Filtros para la tabla `td_drf_detalle_relacion_fab`
--
ALTER TABLE `td_drf_detalle_relacion_fab`
  ADD CONSTRAINT `FK_td_drf_detalle_relacion_fab_tm_rfa_relacion_fabricacion` FOREIGN KEY (`id_rfa`) REFERENCES `tm_rfa_relacion_fabricacion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `td_dri_detalle_relacion_ins`
--
ALTER TABLE `td_dri_detalle_relacion_ins`
  ADD CONSTRAINT `FK_td_dri_detalle_relacion_ins_tm_rin_relacion_instalacion` FOREIGN KEY (`id_rin`) REFERENCES `tm_rin_relacion_instalacion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tm_cxc_cuentas_por_cobrar`
--
ALTER TABLE `tm_cxc_cuentas_por_cobrar`
  ADD CONSTRAINT `FK_tm_cxc_cuentas_por_cobrar_tm_con_contratista` FOREIGN KEY (`id_con`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tm_cxp_cuentas_por_pagar`
--
ALTER TABLE `tm_cxp_cuentas_por_pagar`
  ADD CONSTRAINT `FK_tm_cxp_cuentas_por_pagar_tm_con_contratista` FOREIGN KEY (`id_con`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tm_rfa_relacion_fabricacion`
--
ALTER TABLE `tm_rfa_relacion_fabricacion`
  ADD CONSTRAINT `FK_tm_rfa_relacion_fabricacion_tm_con_contratista` FOREIGN KEY (`con_id`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tm_rin_relacion_instalacion`
--
ALTER TABLE `tm_rin_relacion_instalacion`
  ADD CONSTRAINT `FK_tm_rin_relacion_instalacion_tm_con_contratista` FOREIGN KEY (`con_id`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
