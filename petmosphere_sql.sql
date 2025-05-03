-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: petmosphere
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `admin_username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `admin_pass` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (2,'Edmark','$2y$12$HGyQnDLBrhJwv843sBixouNf56cjAdGPz4Qrk.9ptpYd8QB10NJfi'),(5,'Edmark12','$2y$12$tzRRunmY.fZms2kcyclBKuPYYNU4NG86xy5Y1pIHU2QW57FcSEjjC'),(6,'Edmark1434','$2y$12$EIWcxGOsDWsRHs7KnqOmqOE5jQaZSg7evzmw/dtsx1q9HmohlxPrO');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `adoption_request`
--

DROP TABLE IF EXISTS `adoption_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoption_request` (
  `req_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `req_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `req_date` date NOT NULL DEFAULT '2025-04-23',
  `user_id` bigint unsigned NOT NULL,
  `pet_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`req_id`),
  KEY `adoption_request_pet_id_foreign` (`pet_id`),
  KEY `adoption_request_user_id_foreign` (`user_id`),
  CONSTRAINT `adoption_request_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `adoption_request_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_request`
--

LOCK TABLES `adoption_request` WRITE;
/*!40000 ALTER TABLE `adoption_request` DISABLE KEYS */;
INSERT INTO `adoption_request` VALUES (1,'complete','2025-04-26',1,1),(2,'completed','2025-04-26',1,2);
/*!40000 ALTER TABLE `adoption_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `breed`
--

DROP TABLE IF EXISTS `breed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `breed` (
  `breed_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `breed_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`breed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `breed`
--

LOCK TABLES `breed` WRITE;
/*!40000 ALTER TABLE `breed` DISABLE KEYS */;
INSERT INTO `breed` VALUES (2,'Chitzu',2),(3,'Golden Retriever',2),(4,'Shih Tzu',2),(5,'Persian Cat',3),(6,'Siberian Cat',3),(7,'Parrot',4),(8,'Canary',4),(9,'Python',5),(10,'Cobra',5),(11,'Mallard',6),(12,'Muscovy',6),(13,'Leghorn',7),(14,'Silkie',7),(15,'dopperman',2),(16,'chimpanziniBananini',2);
/*!40000 ALTER TABLE `breed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `msg_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `msg_content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `msg_time` time NOT NULL,
  `sender_id` bigint unsigned NOT NULL,
  `receiver_id` bigint unsigned NOT NULL,
  `post_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`msg_id`),
  KEY `message_sender_id_foreign` (`sender_id`),
  KEY `message_receiver_id_foreign` (`receiver_id`),
  KEY `message_post_id_foreign` (`post_id`),
  CONSTRAINT `message_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,'test_update','14:45:30',1,2,2);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2025_04_22_015048_user',1),(2,'2025_04_23_155923_create_admin',1),(3,'2025_04_23_160136_create_tag',1),(4,'2025_04_23_160212_create_type',1),(5,'2025_04_23_160226_create_breed',1),(6,'2025_04_23_160232_create_pet',1),(7,'2025_04_23_160244_create_post',1),(8,'2025_04_23_160253_create_message',1),(9,'2025_04_23_160304_create_review',1),(10,'2025_04_23_160322_create_adoption_request',1),(11,'2025_04_23_160341_create_request_history',1),(12,'2025_04_23_160349_create_pet_tag',1),(13,'2025_04_23_202716_create_sessions_table',1),(14,'2025_04_23_205325_create_personal_access_tokens_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',2,'auth_token','c2fe16beb2ece65709b049f4429240176151b14aa36acbe955703d4e17d5cd88','[\"*\"]','2025-04-28 12:52:27',NULL,'2025-04-28 12:45:26','2025-04-28 12:52:27'),(2,'App\\Models\\User',2,'auth_token','04bab44e9ebe4ef5f9889f3a30a30744cec8a72cdd74049a81d9d6bcebdac4ad','[\"*\"]',NULL,NULL,'2025-05-01 20:54:05','2025-05-01 20:54:05'),(3,'App\\Models\\User',2,'auth_token','40eb39a691edbf0ff65945b53550305962a549382beb6b51a92abff57f409556','[\"*\"]',NULL,NULL,'2025-05-01 21:03:01','2025-05-01 21:03:01'),(4,'App\\Models\\User',2,'auth_token','7ed508c8098026e5910f43c6f483bbec102024a168de4a373afadacc7cf6be21','[\"*\"]',NULL,NULL,'2025-05-01 21:40:23','2025-05-01 21:40:23'),(5,'App\\Models\\User',2,'auth_token','5811208533b0748545830f85c79e9bc52a7896672abfb17cb3fe85662ee8dbd5','[\"*\"]',NULL,NULL,'2025-05-02 08:44:49','2025-05-02 08:44:49'),(6,'App\\Models\\User',5,'auth_token','48642526eef3982b0a1300f0b5a8edf45be76bb506c4d689063389a6f6d7179d','[\"*\"]',NULL,NULL,'2025-05-02 08:53:07','2025-05-02 08:53:07'),(7,'App\\Models\\User',5,'auth_token','0040435563b6af6d2ff1a05badde5419099a5b9c12fc612032af69e786f4d6a7','[\"*\"]',NULL,NULL,'2025-05-02 09:07:01','2025-05-02 09:07:01'),(8,'App\\Models\\User',2,'auth_token','9d3940e8bed1ee4dea9ab366378bb5f29d459836995c8de9e036a46d3c8360cf','[\"*\"]',NULL,NULL,'2025-05-02 16:37:48','2025-05-02 16:37:48'),(9,'App\\Models\\User',2,'auth_token','0aaf7a709b9757328e85db7a4cd3030e2acc773c3963a29c48d83686b100fe45','[\"*\"]',NULL,NULL,'2025-05-02 16:50:03','2025-05-02 16:50:03'),(10,'App\\Models\\User',5,'auth_token','c0beb376775f3edef20101f8dd901acfc8efda32d7e7ed5c8502bcb5f0ed1c9b','[\"*\"]',NULL,NULL,'2025-05-02 17:05:17','2025-05-02 17:05:17'),(11,'App\\Models\\User',5,'auth_token','2a06eda5876f91d246f0de3059ab8fae8ab58364f1af73f6a6390b72aac93b2d','[\"*\"]',NULL,NULL,'2025-05-02 17:48:42','2025-05-02 17:48:42'),(12,'App\\Models\\User',5,'auth_token','23f33115efeba4cd95efa0a4b204672d361327071ba157a6952a4b84eb414640','[\"*\"]',NULL,NULL,'2025-05-02 17:50:08','2025-05-02 17:50:08'),(13,'App\\Models\\User',5,'auth_token','5196a7dfb7930a70defc02ced1bb8d2b1678bef961f5431de40d593c2e698cb4','[\"*\"]',NULL,NULL,'2025-05-02 17:50:58','2025-05-02 17:50:58'),(14,'App\\Models\\User',5,'auth_token','af04c8af1b003b233761bfe76a07c8a0336aea02160b360e213b79b777a7ec0d','[\"*\"]',NULL,NULL,'2025-05-02 17:52:37','2025-05-02 17:52:37'),(15,'App\\Models\\User',5,'auth_token','afa2d2690bfc59ad314f51323d0ba3deb4be10cab5b4de2dfe77f627daa0598d','[\"*\"]',NULL,NULL,'2025-05-02 17:55:06','2025-05-02 17:55:06'),(16,'App\\Models\\User',2,'auth_token','98d3377c81f8ad98b772c86701d60115bc59cba73dad018790c95de1561abda7','[\"*\"]',NULL,NULL,'2025-05-02 20:35:54','2025-05-02 20:35:54'),(17,'App\\Models\\User',5,'auth_token','6677eab016e2ff2a9e7164831281cd5fb87e16d1766c9c8bd8065a6e8d35badb','[\"*\"]',NULL,NULL,'2025-05-03 01:01:38','2025-05-03 01:01:38');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `pet_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pet_location` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pet_age` int NOT NULL,
  `pet_description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pet_status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `breed_id` bigint unsigned NOT NULL,
  `type_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `pet_tag` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pet_medical` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`pet_id`),
  KEY `pet_breed_id_foreign` (`breed_id`),
  KEY `pet_type_id_foreign` (`type_id`),
  KEY `pet_user_id_foreign` (`user_id`),
  CONSTRAINT `pet_breed_id_foreign` FOREIGN KEY (`breed_id`) REFERENCES `breed` (`breed_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pet_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `type` (`type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pet_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,'jodeci','cebu city',3,'sipatan','goods',14,3,1,'loving,caring','gihubak'),(2,'Dan','Urgello',3,'bomboclat','Available',16,3,1,'fun,lovely','gi bun i');
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `post_date` date NOT NULL,
  `post_img` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_descrip` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pet_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `post_status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'Pending',
  `post_reason` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `post_pet_id_foreign` (`pet_id`),
  KEY `post_user_id_foreign` (`user_id`),
  CONSTRAINT `post_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2025-04-26','main_assets/images/pets/charlie.jpg','This is a updated description of the pet post.',1,1,'Available','wala lang'),(2,'2025-04-26','https://example.com/uploads/post_images/pet_image.jpg','This is a description of the pet post.',1,1,'Available','boot ka?'),(3,'2025-04-26','https://example.com/uploads/post_images/pet_image.jpg','Ballerina Capuccina MI mi mi .',2,2,'Available','tang ina mo');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_history`
--

DROP TABLE IF EXISTS `request_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_history` (
  `history_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `status_old` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_new` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `change_at` timestamp NULL DEFAULT NULL,
  `req_id` bigint unsigned NOT NULL,
  `change_by` bigint unsigned NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `request_history_change_by_foreign` (`change_by`),
  KEY `request_history_req_id_foreign` (`req_id`),
  CONSTRAINT `request_history_change_by_foreign` FOREIGN KEY (`change_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_history_req_id_foreign` FOREIGN KEY (`req_id`) REFERENCES `adoption_request` (`req_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_history`
--

LOCK TABLES `request_history` WRITE;
/*!40000 ALTER TABLE `request_history` DISABLE KEYS */;
INSERT INTO `request_history` VALUES (1,'pending','complete',NULL,1,1),(2,'pending','rejected',NULL,1,2),(3,'pending','rejected','2025-04-25 16:00:00',1,2);
/*!40000 ALTER TABLE `request_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `rev_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rev_rating` int NOT NULL,
  `rev_description` text COLLATE utf8mb4_unicode_ci,
  `rev_date` date NOT NULL DEFAULT '2025-04-23',
  `rev_rated_by` bigint unsigned DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`rev_id`),
  KEY `review_user_id_foreign` (`user_id`),
  KEY `fk_rev_rated_by` (`rev_rated_by`),
  CONSTRAINT `fk_rev_rated_by` FOREIGN KEY (`rev_rated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,5,NULL,'2025-04-23',1,1),(2,1,'the pet is cute','2025-04-23',2,1),(3,1,'chimpanzini bananini','2025-04-23',2,1),(4,5,'tralalelo tralala','2025-04-23',1,2);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('p6owLAfXAxPN9J9hVDzc3HugcnhI7ebsZNm9v337',NULL,'127.0.0.1','PostmanRuntime/7.43.4','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZnhsaGkzckJYSHVkRnJFV0FycUVqekMyZk1NbkE2cHZaRkVQeDB3eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746203071),('SQ8kkLl96QEvnZNdw9Q8dvCK3AjFB2GU2K2LdEOV',NULL,'127.0.0.1','PostmanRuntime/7.43.3','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUms5dG5RYTVXR1F4NEVGOFp5aVhSSHRLWFhKb3JNaGJjY1Uzb2x0VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1745614282),('vbVnZYYJowRuijUMYMDRItxiDNEpQiY2Y8eE8wnf',NULL,'127.0.0.1','PostmanRuntime/7.43.3','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWZXNks1SVNBSG9FVlh4Y29YT01peTZGM1dZZk1DN000UmhPQWlIRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1745637288);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'update test'),(2,'Dogs'),(3,'Cats'),(4,'Birds'),(5,'Snakes'),(6,'Ducks'),(7,'Chicken'),(8,'type kita yiee');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_phone` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_location` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_prof_pic` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_pass` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_createdate` date NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'edmar1434z','09123456789','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','juan.delacruz@example.com','$2y$12$7U9YwMKiA3kjc8amIcQwW.jasvONdh9le9JOYRGLRKHDAu9HhUA7.','2025-04-26'),(2,'Edmark C. Talingting','09106682418','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','edmarktalingting0@gmail.com','$2y$12$mptaBojzkHIPiIOFI7AN0eRnPBrQJzPsYtB07H3KkYyAY1petwPGu','2025-04-26'),(3,'Edmark C. Talingting','09106682418','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','edmarktalingting120@gmail.com','$2y$12$Kmx4TiJ9lSLXBFXvk4l3POPWFCz5nunVbc6BfZGTno4a9TZ3a5yui','2025-04-26'),(4,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'edmarktalingting5@gmail.com','$2y$12$LhFZprnoK1klA0v3l69t1.77VBUNZp.P5bKYhXq53h73Cw.wlHqti','2025-05-02'),(5,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'cobolritchie4@gmail.com','$2y$12$BLTd1hgZv0U/A3kpQq9gP.BYrSlectbrp.n7F51RhICiUDlUFBOry','2025-05-02'),(6,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'ewewae@gmail.com','$2y$12$7T1F/pxFfgPjiDPopTqB/e/oBoXt4iplfg7linamvIE/LtcVgBfGS','2025-05-02');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-03 20:02:26
