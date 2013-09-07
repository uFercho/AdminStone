-- MySQL dump 10.13  Distrib 5.1.53, for Win64 (unknown)
--
-- Host: localhost    Database: admins_db
-- ------------------------------------------------------
-- Server version	5.1.53-community-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `td_drf_detalle_relacion_fab`
--

DROP TABLE IF EXISTS `td_drf_detalle_relacion_fab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `td_drf_detalle_relacion_fab` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rfa` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `costo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_td_drf_detalle_relacion_fab_tm_rfa_relacion_fabricacion` (`id_rfa`),
  CONSTRAINT `FK_td_drf_detalle_relacion_fab_tm_rfa_relacion_fabricacion` FOREIGN KEY (`id_rfa`) REFERENCES `tm_rfa_relacion_fabricacion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `td_drf_detalle_relacion_fab`
--

LOCK TABLES `td_drf_detalle_relacion_fab` WRITE;
/*!40000 ALTER TABLE `td_drf_detalle_relacion_fab` DISABLE KEYS */;
INSERT INTO `td_drf_detalle_relacion_fab` VALUES (12,6,'Base Triangular',1.5,250),(13,6,'Bisel M&iacute;nimo',3.01,5),(14,7,'Doble Borde Cuadrado',1.09,50),(15,7,'Base Hexagonal',2.1,300),(16,8,'Pie de Amigo',1.3,100),(17,8,'Salpicadero',1.01,40);
/*!40000 ALTER TABLE `td_drf_detalle_relacion_fab` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `td_dri_detalle_relacion_ins`
--

DROP TABLE IF EXISTS `td_dri_detalle_relacion_ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `td_dri_detalle_relacion_ins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_rin` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `costo` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_td_dri_detalle_relacion_ins_tm_rin_relacion_instalacion` (`id_rin`),
  CONSTRAINT `FK_td_dri_detalle_relacion_ins_tm_rin_relacion_instalacion` FOREIGN KEY (`id_rin`) REFERENCES `tm_rin_relacion_instalacion` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `td_dri_detalle_relacion_ins`
--

LOCK TABLES `td_dri_detalle_relacion_ins` WRITE;
/*!40000 ALTER TABLE `td_dri_detalle_relacion_ins` DISABLE KEYS */;
INSERT INTO `td_dri_detalle_relacion_ins` VALUES (13,5,'Borde Sencillo',2.01,40),(14,5,'Hueco de Cajet&iacute;n',3.35,40);
/*!40000 ALTER TABLE `td_dri_detalle_relacion_ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_con_contratista`
--

DROP TABLE IF EXISTS `tm_con_contratista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_con_contratista` (
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_con_contratista`
--

LOCK TABLES `tm_con_contratista` WRITE;
/*!40000 ALTER TABLE `tm_con_contratista` DISABLE KEYS */;
INSERT INTO `tm_con_contratista` VALUES (32,'Andrea','Brito','21323822','Femenino','Soltero','1988-03-19','Margarita','0295 274 4092','0424 800 0916','El poblado','apbg@gmail.com','2009-01-13'),(33,'Alejandro','Suarez','16854344','Masculino','Soltero','1984-01-28','Caracas','0295 262 4502','0412 356 2405','Los Robles','alejandro.suarez@hotmail.com','2010-07-14'),(34,'Nelson','Suarez','16854343','Masculino','Soltero','1984-01-28','Caracas','0295 262 4502','0414 788 7715','Los Robles','nelson.suarezp@gmail.com','2011-01-03');
/*!40000 ALTER TABLE `tm_con_contratista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_cxc_cuentas_por_cobrar`
--

DROP TABLE IF EXISTS `tm_cxc_cuentas_por_cobrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_cxc_cuentas_por_cobrar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_con` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `pendiente` double NOT NULL,
  `estado` varchar(15) NOT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_cxc_cuentas_por_cobrar_tm_con_contratista` (`id_con`),
  CONSTRAINT `FK_tm_cxc_cuentas_por_cobrar_tm_con_contratista` FOREIGN KEY (`id_con`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_cxc_cuentas_por_cobrar`
--

LOCK TABLES `tm_cxc_cuentas_por_cobrar` WRITE;
/*!40000 ALTER TABLE `tm_cxc_cuentas_por_cobrar` DISABLE KEYS */;
INSERT INTO `tm_cxc_cuentas_por_cobrar` VALUES (27,32,'2011-07-11','Vale',225,'NO_PROCESADO',225),(28,32,'2011-07-11','Adelanto',0,'PROCESADO',100),(29,32,'2011-07-11','Adelanto',0,'PROCESADO',250);
/*!40000 ALTER TABLE `tm_cxc_cuentas_por_cobrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_cxp_cuentas_por_pagar`
--

DROP TABLE IF EXISTS `tm_cxp_cuentas_por_pagar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_cxp_cuentas_por_pagar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_con` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `total_rel` double DEFAULT NULL,
  `total_cxc` double DEFAULT NULL,
  `num_factura` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tm_cxp_cuentas_por_pagar_tm_con_contratista` (`id_con`),
  CONSTRAINT `FK_tm_cxp_cuentas_por_pagar_tm_con_contratista` FOREIGN KEY (`id_con`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_cxp_cuentas_por_pagar`
--

LOCK TABLES `tm_cxp_cuentas_por_pagar` WRITE;
/*!40000 ALTER TABLE `tm_cxp_cuentas_por_pagar` DISABLE KEYS */;
INSERT INTO `tm_cxp_cuentas_por_pagar` VALUES (7,32,'2011-07-11',269.4,100,'24'),(8,32,'2011-07-12',1464.55,250,'123');
/*!40000 ALTER TABLE `tm_cxp_cuentas_por_pagar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_nor_numero_orden`
--

DROP TABLE IF EXISTS `tm_nor_numero_orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_nor_numero_orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_nor_numero_orden`
--

LOCK TABLES `tm_nor_numero_orden` WRITE;
/*!40000 ALTER TABLE `tm_nor_numero_orden` DISABLE KEYS */;
INSERT INTO `tm_nor_numero_orden` VALUES (1,'2011-07-12');
/*!40000 ALTER TABLE `tm_nor_numero_orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_rfa_relacion_fabricacion`
--

DROP TABLE IF EXISTS `tm_rfa_relacion_fabricacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_rfa_relacion_fabricacion` (
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
  KEY `FK_tm_rfa_relacion_fabricacion_tm_con_contratista` (`con_id`),
  CONSTRAINT `FK_tm_rfa_relacion_fabricacion_tm_con_contratista` FOREIGN KEY (`con_id`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_rfa_relacion_fabricacion`
--

LOCK TABLES `tm_rfa_relacion_fabricacion` WRITE;
/*!40000 ALTER TABLE `tm_rfa_relacion_fabricacion` DISABLE KEYS */;
INSERT INTO `tm_rfa_relacion_fabricacion` VALUES (6,32,25,'2011-07-11','Yolanda Granchelli','El Poblado','Blanco dallas',175,'PROCESADO'),(7,32,26,'2011-07-11','Alejandro Arguinzones','Villa Rosa','Amarillo ornamental',215,'PROCESADO'),(8,34,123,'2011-07-12','123','123','123',100,'NO_PROCESADO');
/*!40000 ALTER TABLE `tm_rfa_relacion_fabricacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_rin_relacion_instalacion`
--

DROP TABLE IF EXISTS `tm_rin_relacion_instalacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_rin_relacion_instalacion` (
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
  KEY `FK_tm_rin_relacion_instalacion_tm_con_contratista` (`con_id`),
  CONSTRAINT `FK_tm_rin_relacion_instalacion_tm_con_contratista` FOREIGN KEY (`con_id`) REFERENCES `tm_con_contratista` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_rin_relacion_instalacion`
--

LOCK TABLES `tm_rin_relacion_instalacion` WRITE;
/*!40000 ALTER TABLE `tm_rin_relacion_instalacion` DISABLE KEYS */;
INSERT INTO `tm_rin_relacion_instalacion` VALUES (5,32,27,'2011-07-11','Henry De Haay','Los Robles','Blanco Dallas',55,'PROCESADO');
/*!40000 ALTER TABLE `tm_rin_relacion_instalacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_usu_usuario`
--

DROP TABLE IF EXISTS `tm_usu_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_usu_usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login` varchar(25) NOT NULL,
  `pass` varchar(35) NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `estado` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usu_login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_usu_usuario`
--

LOCK TABLES `tm_usu_usuario` WRITE;
/*!40000 ALTER TABLE `tm_usu_usuario` DISABLE KEYS */;
INSERT INTO `tm_usu_usuario` VALUES (1,'andrea','827ccb0eea8a706c4c34a16891f84e7b','Usuario','Inactivo'),(2,'admin','827ccb0eea8a706c4c34a16891f84e7b','Administrador','Activo');
/*!40000 ALTER TABLE `tm_usu_usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-07-11 19:59:38
