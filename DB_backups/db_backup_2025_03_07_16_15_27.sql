-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: stroi_calc
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `calculation`
--

DROP TABLE IF EXISTS `calculation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calculation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `manager_id` bigint NOT NULL,
  `address_object_constractions` varchar(400) NOT NULL,
  `number` int NOT NULL,
  `created_date` datetime NOT NULL,
  `results_id` bigint NOT NULL,
  `calculation_state_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calculation`
--

LOCK TABLES `calculation` WRITE;
/*!40000 ALTER TABLE `calculation` DISABLE KEYS */;
/*!40000 ALTER TABLE `calculation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `calculation_state`
--

DROP TABLE IF EXISTS `calculation_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `calculation_state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `calculation_state`
--

LOCK TABLES `calculation_state` WRITE;
/*!40000 ALTER TABLE `calculation_state` DISABLE KEYS */;
INSERT INTO `calculation_state` VALUES (1,'Актуален'),(2,'Не актуален'),(3,'Заключен договор');
/*!40000 ALTER TABLE `calculation_state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `second_name` varchar(45) NOT NULL,
  `phone` int NOT NULL,
  `e-mail` varchar(45) NOT NULL,
  `adress` varchar(45) NOT NULL,
  `users_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_characteristics`
--

DROP TABLE IF EXISTS `material_characteristics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_characteristics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `measurement_unit_id` int NOT NULL,
  `materials_id` int NOT NULL,
  `length` float DEFAULT NULL,
  `wedth` float DEFAULT NULL,
  `thickness` float DEFAULT NULL,
  `volume` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `measurement_unit_id_UNIQUE` (`measurement_unit_id`),
  UNIQUE KEY `materials_id_UNIQUE` (`materials_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_characteristics`
--

LOCK TABLES `material_characteristics` WRITE;
/*!40000 ALTER TABLE `material_characteristics` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_characteristics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `material_caracteristics_id` int NOT NULL,
  `material_type` varchar(200) DEFAULT NULL,
  `structural_element_type` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `material_caracteristics_id_UNIQUE` (`material_caracteristics_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurement_units`
--

DROP TABLE IF EXISTS `measurement_units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurement_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `measurement_units_name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurement_units`
--

LOCK TABLES `measurement_units` WRITE;
/*!40000 ALTER TABLE `measurement_units` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurement_units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `openings`
--

DROP TABLE IF EXISTS `openings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `openings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `width` float NOT NULL,
  `height` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `openings`
--

LOCK TABLES `openings` WRITE;
/*!40000 ALTER TABLE `openings` DISABLE KEYS */;
/*!40000 ALTER TABLE `openings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `openings_in_a_structural_element_frame`
--

DROP TABLE IF EXISTS `openings_in_a_structural_element_frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `openings_in_a_structural_element_frame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `structural_element_frame_id` bigint NOT NULL,
  `openings_id` bigint NOT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `openings_in_a_structural_element_frame`
--

LOCK TABLES `openings_in_a_structural_element_frame` WRITE;
/*!40000 ALTER TABLE `openings_in_a_structural_element_frame` DISABLE KEYS */;
/*!40000 ALTER TABLE `openings_in_a_structural_element_frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_lists`
--

DROP TABLE IF EXISTS `price_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `material_characteristics_id` int NOT NULL,
  `date` date NOT NULL,
  `purchase_price` float NOT NULL,
  `selling_price` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `material_characteristics_id_UNIQUE` (`material_characteristics_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_lists`
--

LOCK TABLES `price_lists` WRITE;
/*!40000 ALTER TABLE `price_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `price_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `material_characteristics_id` bigint NOT NULL,
  `material` varchar(200) DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `measurement_unit` varchar(200) DEFAULT NULL,
  `full_price` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Уволен'),(2,'Числится в штате');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `structural_element_basement`
--

DROP TABLE IF EXISTS `structural_element_basement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `structural_element_basement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `results_id` int NOT NULL,
  `Perimeter_of_external_walls` float NOT NULL,
  `internal_wall_length` float NOT NULL,
  `concrete_piles` varchar(200) NOT NULL,
  `concrete` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structural_element_basement`
--

LOCK TABLES `structural_element_basement` WRITE;
/*!40000 ALTER TABLE `structural_element_basement` DISABLE KEYS */;
/*!40000 ALTER TABLE `structural_element_basement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `structural_element_frame`
--

DROP TABLE IF EXISTS `structural_element_frame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `structural_element_frame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `results_id` int NOT NULL,
  `amount_floor` int NOT NULL,
  `floor_number` int NOT NULL,
  `floor_height` int NOT NULL,
  `perimeter_of_external_walls` float NOT NULL,
  `base_area` float NOT NULL,
  `external_wall_thickness` float NOT NULL,
  `internal_wall_length` float NOT NULL,
  `internal_wall_thickness` float NOT NULL,
  `OSB_external_wall` varchar(200) NOT NULL,
  `steam_waterproofing_external_wall` varchar(200) NOT NULL,
  `windscreen_extern_wall` varchar(200) NOT NULL,
  `insulation_external_wall` varchar(200) NOT NULL,
  `overlap_thickness` varchar(200) NOT NULL,
  `OSB_thickness` varchar(200) NOT NULL,
  `steam_waterproofing_thickness` varchar(200) NOT NULL,
  `windscreen_thickness` varchar(200) NOT NULL,
  `insulation_thickness` varchar(200) NOT NULL,
  `OSB_internal_wall` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structural_element_frame`
--

LOCK TABLES `structural_element_frame` WRITE;
/*!40000 ALTER TABLE `structural_element_frame` DISABLE KEYS */;
/*!40000 ALTER TABLE `structural_element_frame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `last_name` varchar(200) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `second_name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `e-mail` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `login` varchar(300) NOT NULL,
  `state_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Иванов','Иван','Иванович','88005553535','ivanov@test.ru','password','ivanov',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_usersgroup`
--

DROP TABLE IF EXISTS `users_usersgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_usersgroup` (
  `users_id` int NOT NULL,
  `usersgroup_id` int NOT NULL,
  PRIMARY KEY (`users_id`),
  UNIQUE KEY `users_id_UNIQUE` (`users_id`),
  UNIQUE KEY `usersgroup_id_UNIQUE` (`usersgroup_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_usersgroup`
--

LOCK TABLES `users_usersgroup` WRITE;
/*!40000 ALTER TABLE `users_usersgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_usersgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usersgroup`
--

DROP TABLE IF EXISTS `usersgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersgroup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usersgroup`
--

LOCK TABLES `usersgroup` WRITE;
/*!40000 ALTER TABLE `usersgroup` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersgroup` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07 16:15:27
