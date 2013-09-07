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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `td_drf_detalle_relacion_fab`
--

LOCK TABLES `td_drf_detalle_relacion_fab` WRITE;
/*!40000 ALTER TABLE `td_drf_detalle_relacion_fab` DISABLE KEYS */;
INSERT INTO `td_drf_detalle_relacion_fab` VALUES (1,1,'Pared',5,25),(2,1,'Hueco Pulido',5.3,140),(3,2,'Base Hexagonal',55.013,300),(4,3,'Base Hexagonal',5.01,300),(5,3,'Base Cuadrada',215.035,250);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `td_dri_detalle_relacion_ins`
--

LOCK TABLES `td_dri_detalle_relacion_ins` WRITE;
/*!40000 ALTER TABLE `td_dri_detalle_relacion_ins` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_con_contratista`
--

LOCK TABLES `tm_con_contratista` WRITE;
/*!40000 ALTER TABLE `tm_con_contratista` DISABLE KEYS */;
INSERT INTO `tm_con_contratista` VALUES (25,'Andrea','Brito','21323822','Femenino','Soltero','1988-03-19','Porlamar','02952744092','04248000916','El Poblado','apbg19@gmail.com','2011-06-06'),(26,'Tony','Pino','17654289','Masculino','Soltero','1979-02-14','Porlamar','0295286145','04168569575','Porlamar','Tony@gmail.com','2009-02-10'),(27,'Yolanda','Granchelli','8569145','Femenino','Casado','1987-09-01','Bolivar','02954587898','04268569825','Porlamar','yolanda@gmail.com','2008-02-11'),(28,'Gabriela','Brito','21323826','Femenino','Casado','2006-04-26','Porlamar','02952583696','04168547858','Porlamar','gaby@gmail.com','2011-05-10'),(29,'Alvaro','Brito','8547965','Masculino','Casado','1954-09-03','Barcelona','02951458546','04146589535','Porlamar','alvaro@hotmail.com','2007-01-02'),(30,'Fernando','Suarez','16.854.433','Masculino','Casado','2011-06-14','Caracas','0295-2624502','04147887715','asdf','nelsonsuare@gmail.com','2011-06-22'),(31,'Fercho','Suarez','16.854.343','Femenino','Soltero','2011-06-09','asdf','0295 262 4502','0414 788 7715','asdf','asdf@asdf.com','2011-06-06');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_cxc_cuentas_por_cobrar`
--

LOCK TABLES `tm_cxc_cuentas_por_cobrar` WRITE;
/*!40000 ALTER TABLE `tm_cxc_cuentas_por_cobrar` DISABLE KEYS */;
INSERT INTO `tm_cxc_cuentas_por_cobrar` VALUES (1,31,'2011-06-29','Pr&eacutestamo',0,'PROCESADO',5500),(2,31,'2011-06-29','Material',58952.25,'NO_PROCESADO',58952.25),(3,31,'2011-06-30','Vale',0,'PROCESADO',1250.55),(4,31,'2011-06-30','Vale',1250.75,'NO_PROCESADO',1250.75),(5,31,'2011-07-01','Pr&eacutestamo',550,'NO_PROCESADO',550),(6,31,'2011-07-01','Adelanto',525.327,'NO_PROCESADO',525.327),(7,31,'2011-07-01','Adelanto',524.359,'NO_PROCESADO',524.359),(8,31,'2011-07-01','Material',785,'NO_PROCESADO',785),(9,31,'2011-07-01','Material',550,'NO_PROCESADO',550);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_cxp_cuentas_por_pagar`
--

LOCK TABLES `tm_cxp_cuentas_por_pagar` WRITE;
/*!40000 ALTER TABLE `tm_cxp_cuentas_por_pagar` DISABLE KEYS */;
INSERT INTO `tm_cxp_cuentas_por_pagar` VALUES (1,31,'2011-07-01',18003.9,6750.55,'123');
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
INSERT INTO `tm_nor_numero_orden` VALUES (1,'2011-07-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_rfa_relacion_fabricacion`
--

LOCK TABLES `tm_rfa_relacion_fabricacion` WRITE;
/*!40000 ALTER TABLE `tm_rfa_relacion_fabricacion` DISABLE KEYS */;
INSERT INTO `tm_rfa_relacion_fabricacion` VALUES (1,31,123,'2011-06-29','Jose lopez','asdf','asdf',50,'NO_PROCESADO'),(2,31,123,'2011-07-01','Nelson suarez','los olivos','madera',1500,'PROCESADO'),(3,31,123,'2011-07-01','r34','r3r34','referfe',20,'NO_PROCESADO');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_rin_relacion_instalacion`
--

LOCK TABLES `tm_rin_relacion_instalacion` WRITE;
/*!40000 ALTER TABLE `tm_rin_relacion_instalacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tm_rin_relacion_instalacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tm_usu_usuario`
--

DROP TABLE IF EXISTS `tm_usu_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tm_usu_usuario` (
  `usu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usu_login` varchar(25) NOT NULL,
  `usu_pass` varchar(35) NOT NULL,
  `usu_nivel` varchar(25) NOT NULL,
  PRIMARY KEY (`usu_id`),
  UNIQUE KEY `usu_login` (`usu_login`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tm_usu_usuario`
--

LOCK TABLES `tm_usu_usuario` WRITE;
/*!40000 ALTER TABLE `tm_usu_usuario` DISABLE KEYS */;
INSERT INTO `tm_usu_usuario` VALUES (1,'test','098f6bcd4621d373cade4e832627b4f6','Administrador'),(2,'uFercho','ddc7278b54b37337d98a5e37f043bbd6','Administrador'),(6,'Pichu1','a8f5f167f44f4964e6c998dee827110c','Registrado'),(7,'Tupichu','827ccb0eea8a706c4c34a16891f84e7b','Administrador');
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

-- Dump completed on 2011-07-04  3:53:16
