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
  `req_message` text COLLATE utf8mb4_unicode_ci,
  `req_view_status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'unread',
  PRIMARY KEY (`req_id`),
  KEY `adoption_request_pet_id_foreign` (`pet_id`),
  KEY `adoption_request_user_id_foreign` (`user_id`),
  CONSTRAINT `adoption_request_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `pet` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `adoption_request_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_request`
--

LOCK TABLES `adoption_request` WRITE;
/*!40000 ALTER TABLE `adoption_request` DISABLE KEYS */;
INSERT INTO `adoption_request` VALUES (1,'complete','2025-04-26',1,1,NULL,'unread'),(2,'completed','2025-04-26',1,2,NULL,'read'),(3,'Pending','2025-05-09',1,1,NULL,'unread'),(4,'Pending','2025-05-09',1,1,'pls letme adopt this','unread'),(5,'Pending','2025-05-09',1,1,'dadwada','unread'),(6,'Pending','2025-05-09',5,1,'fawdawd','read'),(7,'Approved','2025-05-09',5,14,'this is required','read'),(8,'Completed','2025-05-10',5,2,'i want to own this cat, the cat is very cute','read');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',2,'auth_token','c2fe16beb2ece65709b049f4429240176151b14aa36acbe955703d4e17d5cd88','[\"*\"]','2025-04-28 12:52:27',NULL,'2025-04-28 12:45:26','2025-04-28 12:52:27'),(2,'App\\Models\\User',2,'auth_token','04bab44e9ebe4ef5f9889f3a30a30744cec8a72cdd74049a81d9d6bcebdac4ad','[\"*\"]',NULL,NULL,'2025-05-01 20:54:05','2025-05-01 20:54:05'),(3,'App\\Models\\User',2,'auth_token','40eb39a691edbf0ff65945b53550305962a549382beb6b51a92abff57f409556','[\"*\"]',NULL,NULL,'2025-05-01 21:03:01','2025-05-01 21:03:01'),(4,'App\\Models\\User',2,'auth_token','7ed508c8098026e5910f43c6f483bbec102024a168de4a373afadacc7cf6be21','[\"*\"]',NULL,NULL,'2025-05-01 21:40:23','2025-05-01 21:40:23'),(5,'App\\Models\\User',2,'auth_token','5811208533b0748545830f85c79e9bc52a7896672abfb17cb3fe85662ee8dbd5','[\"*\"]',NULL,NULL,'2025-05-02 08:44:49','2025-05-02 08:44:49'),(6,'App\\Models\\User',5,'auth_token','48642526eef3982b0a1300f0b5a8edf45be76bb506c4d689063389a6f6d7179d','[\"*\"]',NULL,NULL,'2025-05-02 08:53:07','2025-05-02 08:53:07'),(7,'App\\Models\\User',5,'auth_token','0040435563b6af6d2ff1a05badde5419099a5b9c12fc612032af69e786f4d6a7','[\"*\"]',NULL,NULL,'2025-05-02 09:07:01','2025-05-02 09:07:01'),(8,'App\\Models\\User',2,'auth_token','9d3940e8bed1ee4dea9ab366378bb5f29d459836995c8de9e036a46d3c8360cf','[\"*\"]',NULL,NULL,'2025-05-02 16:37:48','2025-05-02 16:37:48'),(9,'App\\Models\\User',2,'auth_token','0aaf7a709b9757328e85db7a4cd3030e2acc773c3963a29c48d83686b100fe45','[\"*\"]',NULL,NULL,'2025-05-02 16:50:03','2025-05-02 16:50:03'),(10,'App\\Models\\User',5,'auth_token','c0beb376775f3edef20101f8dd901acfc8efda32d7e7ed5c8502bcb5f0ed1c9b','[\"*\"]',NULL,NULL,'2025-05-02 17:05:17','2025-05-02 17:05:17'),(11,'App\\Models\\User',5,'auth_token','2a06eda5876f91d246f0de3059ab8fae8ab58364f1af73f6a6390b72aac93b2d','[\"*\"]',NULL,NULL,'2025-05-02 17:48:42','2025-05-02 17:48:42'),(12,'App\\Models\\User',5,'auth_token','23f33115efeba4cd95efa0a4b204672d361327071ba157a6952a4b84eb414640','[\"*\"]',NULL,NULL,'2025-05-02 17:50:08','2025-05-02 17:50:08'),(13,'App\\Models\\User',5,'auth_token','5196a7dfb7930a70defc02ced1bb8d2b1678bef961f5431de40d593c2e698cb4','[\"*\"]',NULL,NULL,'2025-05-02 17:50:58','2025-05-02 17:50:58'),(14,'App\\Models\\User',5,'auth_token','af04c8af1b003b233761bfe76a07c8a0336aea02160b360e213b79b777a7ec0d','[\"*\"]',NULL,NULL,'2025-05-02 17:52:37','2025-05-02 17:52:37'),(15,'App\\Models\\User',5,'auth_token','afa2d2690bfc59ad314f51323d0ba3deb4be10cab5b4de2dfe77f627daa0598d','[\"*\"]',NULL,NULL,'2025-05-02 17:55:06','2025-05-02 17:55:06'),(16,'App\\Models\\User',2,'auth_token','98d3377c81f8ad98b772c86701d60115bc59cba73dad018790c95de1561abda7','[\"*\"]',NULL,NULL,'2025-05-02 20:35:54','2025-05-02 20:35:54'),(17,'App\\Models\\User',5,'auth_token','6677eab016e2ff2a9e7164831281cd5fb87e16d1766c9c8bd8065a6e8d35badb','[\"*\"]',NULL,NULL,'2025-05-03 01:01:38','2025-05-03 01:01:38'),(18,'App\\Models\\User',5,'auth_token','83f9fe68f0740a4a9d79987c643081bf0d698f55178fa29f5fc9b3eba4464c82','[\"*\"]',NULL,NULL,'2025-05-04 06:35:32','2025-05-04 06:35:32'),(19,'App\\Models\\User',5,'auth_token','dee2284cc581f4fed4e232ed07e5141b81f4c6b5df53c90751731daa6858f22f','[\"*\"]',NULL,NULL,'2025-05-04 15:02:00','2025-05-04 15:02:00'),(20,'App\\Models\\User',5,'auth_token','b2ba274865a13e0aa88b1d67ecb6672ebed600dd3ce8da1f6a2940f77a67098e','[\"*\"]',NULL,NULL,'2025-05-04 15:02:58','2025-05-04 15:02:58'),(21,'App\\Models\\User',2,'auth_token','83aeed29e5bebb8d2d2068550ef2c1b4cc56b2de658ffa6e6261288d2109be30','[\"*\"]',NULL,NULL,'2025-05-04 15:53:53','2025-05-04 15:53:53'),(22,'App\\Models\\User',5,'auth_token','8e9e85a7c28f24feb62a1340ff04a8a0f21bf545351a27c8bc1b36549ebade7a','[\"*\"]',NULL,NULL,'2025-05-04 20:22:46','2025-05-04 20:22:46'),(23,'App\\Models\\User',5,'auth_token','7ac5a4d5aaef6658bed809d68da49c81e44908c5f3f7c038ffd640cca484e62c','[\"*\"]',NULL,NULL,'2025-05-04 21:18:08','2025-05-04 21:18:08'),(24,'App\\Models\\User',5,'auth_token','12d0b347d7e5e0aa624a2aa699152b343e8926f113d32f0b9fbe13991acddcf6','[\"*\"]',NULL,NULL,'2025-05-05 14:18:20','2025-05-05 14:18:20'),(25,'App\\Models\\User',5,'auth_token','b223b01e60eedc00f831805db11af72c3fde2f785f21aa5b40c849a0b30e2abf','[\"*\"]',NULL,NULL,'2025-05-05 14:18:21','2025-05-05 14:18:21'),(26,'App\\Models\\User',2,'auth_token','c9ddd5abce551faed95b1bc5ed6b51f5acd598b39cbbe44c2a6c1e2b0424f663','[\"*\"]',NULL,NULL,'2025-05-05 14:22:14','2025-05-05 14:22:14'),(27,'App\\Models\\User',5,'auth_token','7b1d0de5d22de6205efb69daf9537dd71586ac73e56aa6c0ffa6085bb904214a','[\"*\"]',NULL,NULL,'2025-05-08 09:23:12','2025-05-08 09:23:12'),(28,'App\\Models\\User',5,'auth_token','9352dabb79e363bfc1ccbe6d43e4937613a4c0de49393633802b0451601c7af0','[\"*\"]',NULL,NULL,'2025-05-08 11:55:11','2025-05-08 11:55:11'),(29,'App\\Models\\User',5,'auth_token','b44bcd54d6b7fe91f20330627471c2c8a447ec6faed322dd3c007581c26fe024','[\"*\"]',NULL,NULL,'2025-05-08 22:09:09','2025-05-08 22:09:09'),(30,'App\\Models\\User',5,'auth_token','98d7e37736cc2d5f9e00d10ce21f4ba2db3b56bb147e606e64b13136956bcace','[\"*\"]',NULL,NULL,'2025-05-09 05:08:18','2025-05-09 05:08:18'),(31,'App\\Models\\User',2,'auth_token','8c936e0b7bd3e2d4d5bd96001a56e861128dc2b13bc74e5d72786aa245251369','[\"*\"]',NULL,NULL,'2025-05-09 05:10:56','2025-05-09 05:10:56'),(32,'App\\Models\\User',2,'auth_token','e9862db13cc0a7b6b96a9ad6a6c3d4ef977d0979dc43e4a59a52c1bc2b17319f','[\"*\"]',NULL,NULL,'2025-05-09 05:12:04','2025-05-09 05:12:04'),(33,'App\\Models\\User',2,'auth_token','be3c0661274f9f5fc25bae45b95d971812c37a6551efbf2724d921f0ede9410d','[\"*\"]',NULL,NULL,'2025-05-09 05:13:05','2025-05-09 05:13:05'),(34,'App\\Models\\User',2,'auth_token','11f54cb742a004bf89f3fe67dbdf99467c0e675d77d005e87558500b271d74fb','[\"*\"]',NULL,NULL,'2025-05-09 05:16:11','2025-05-09 05:16:11'),(35,'App\\Models\\User',2,'auth_token','7c729f1c90e5a96185482d73a626ec1cd5312e5014f76763cf2efdd14b540bc2','[\"*\"]',NULL,NULL,'2025-05-09 05:18:24','2025-05-09 05:18:24'),(36,'App\\Models\\User',2,'auth_token','97eba46dedf7b22e7c7d825519860ee2fa2988c7d103b6b44a2b45dcfcf78ce8','[\"*\"]',NULL,NULL,'2025-05-09 05:21:31','2025-05-09 05:21:31'),(37,'App\\Models\\User',2,'auth_token','37bad2c30912457a7681196559ff8ab4f42c2c4eeb8655aa85547a1e192e3930','[\"*\"]',NULL,NULL,'2025-05-09 05:22:23','2025-05-09 05:22:23'),(38,'App\\Models\\User',2,'auth_token','2a9984b5224887c961e621bb2aa4c21cd5b06cf91fc8caebe67b573a0eecbe96','[\"*\"]',NULL,NULL,'2025-05-09 05:23:06','2025-05-09 05:23:06'),(39,'App\\Models\\User',2,'auth_token','eb96cbb6842e0872f504670d5186d7398026acbbeeaeb176fce52b026eb6d3b5','[\"*\"]',NULL,NULL,'2025-05-09 05:23:41','2025-05-09 05:23:41'),(40,'App\\Models\\User',2,'auth_token','3af57b600a9507bd10c80a02018d44c7749b8d248fb4e5e7b6b72c611703021e','[\"*\"]',NULL,NULL,'2025-05-09 05:27:46','2025-05-09 05:27:46'),(41,'App\\Models\\User',2,'auth_token','9c65433437aae76c1349f3a03d0da2290dbe7fe116fb8785d673455376d61d00','[\"*\"]',NULL,NULL,'2025-05-09 05:28:12','2025-05-09 05:28:12'),(42,'App\\Models\\User',2,'auth_token','b0ad63f89d1ef78e9627db61b27796b139a90322d30bc9ff1a859d900fdebcbe','[\"*\"]',NULL,NULL,'2025-05-09 05:33:34','2025-05-09 05:33:34'),(43,'App\\Models\\User',2,'auth_token','f94ab1b42c0139a12371488c26a9fa47b607a499f0e796a2f6bb58a0f02582ff','[\"*\"]',NULL,NULL,'2025-05-09 05:34:54','2025-05-09 05:34:54'),(44,'App\\Models\\User',2,'auth_token','67cfd0946c3f8df5233561a5470dfed9686f5ff8e27912945d5d794687523fc2','[\"*\"]',NULL,NULL,'2025-05-09 05:36:27','2025-05-09 05:36:27'),(45,'App\\Models\\User',2,'auth_token','578e0033f02704f9d34feebce39e71babad610bab697ad3c2180456506f10b12','[\"*\"]',NULL,NULL,'2025-05-09 05:37:12','2025-05-09 05:37:12'),(46,'App\\Models\\User',2,'auth_token','1525794db415627eda9bf460579e30a2f56c09e78d07540a1c1f3713f1590915','[\"*\"]',NULL,NULL,'2025-05-09 05:55:58','2025-05-09 05:55:58'),(47,'App\\Models\\User',2,'auth_token','cc23c05f3e4117af4ef15bdf4f6804aba8fbb07e629be5cd53dfe62b960bf8a8','[\"*\"]',NULL,NULL,'2025-05-09 05:58:26','2025-05-09 05:58:26'),(48,'App\\Models\\User',2,'auth_token','46014129d5764e9b70d2dad99bb232151d498e327c5fb7da79c1d29f7afe17d7','[\"*\"]',NULL,NULL,'2025-05-09 06:01:02','2025-05-09 06:01:02'),(49,'App\\Models\\User',2,'auth_token','25fec5ed31533705681cca5b4ba3b06308177abcb5309715bb1ce82476085083','[\"*\"]',NULL,NULL,'2025-05-09 06:10:36','2025-05-09 06:10:36'),(50,'App\\Models\\User',5,'auth_token','02697e01109f5f90ae0814ac6c5a4bd3ec7861201ee2223e46c56ea50eec5915','[\"*\"]',NULL,NULL,'2025-05-10 07:00:37','2025-05-10 07:00:37'),(51,'App\\Models\\User',2,'auth_token','04a731a11cfe3fd62b0ae4e2332d44758119689b983b15d05f119c27b5733f6f','[\"*\"]',NULL,NULL,'2025-05-10 13:52:30','2025-05-10 13:52:30'),(52,'App\\Models\\User',5,'auth_token','d4bf0b9d0365918cac8347c78e46b9107d34dfe8d5a9dc05eb299b8e3d861716','[\"*\"]',NULL,NULL,'2025-05-10 13:59:11','2025-05-10 13:59:11'),(53,'App\\Models\\User',2,'auth_token','a81e3f4e0a5bd236ca4e7da9a2a32d2b80bee6cf62b3f9d05095a37b52e3e336','[\"*\"]',NULL,NULL,'2025-05-10 14:01:22','2025-05-10 14:01:22'),(54,'App\\Models\\User',5,'auth_token','1c4fd02ddc36895dfa50cb79fedaf68cfa446e54111684c41f92e795dbe811d9','[\"*\"]',NULL,NULL,'2025-05-10 14:15:24','2025-05-10 14:15:24'),(55,'App\\Models\\User',2,'auth_token','ed751fea3d4e18fd175cb85b3f86013dc3350049ba574da46e010f3c673c3502','[\"*\"]',NULL,NULL,'2025-05-10 14:47:09','2025-05-10 14:47:09'),(56,'App\\Models\\User',5,'auth_token','bf7bc7d4ce0cccfd2d93e126d726d0c688d0249816bcf7472cb30f4c0314f922','[\"*\"]',NULL,NULL,'2025-05-10 15:01:31','2025-05-10 15:01:31');
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
  `pet_age` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,'jodeci','cebu city','3','sipatan','goods',14,3,1,'loving,caring','gihubak'),(2,'Dan','Urgello','3','bomboclat','Adopted',16,3,2,'fun,lovely','gi bun i'),(3,'Dan','Urgello','3','bomboclat','ok ra',16,3,1,NULL,NULL),(4,'Dan','Urgello','3','bomboclat','ok ra',16,3,1,NULL,NULL),(5,'Dan','Urgello','3','bomboclat','ok ra',16,3,1,NULL,NULL),(6,'dajkdhawd','SITO LOWER PANABANG BRGY. APAS','1','dadaw','Available',5,3,5,'dawdwad',NULL),(7,'Edmark','SITO LOWER PANABANG BRGY. APAS','1 year old','dhawdhah','Available',6,3,5,'dwajdhawd',NULL),(8,'dhawhdawda','SITO LOWER PANABANG BRGY. APAS','1 year old','dada','Available',15,2,5,'dkjawkdaw',NULL),(9,'djadjawhd','SITO LOWER PANABANG BRGY. APAS','1 year','daojdawj','Available',4,2,5,'djadjwad',NULL),(10,'hduwhduh','SITO LOWER PANABANG BRGY. APAS','1','AKDAWLK','Available',2,2,5,'djawdwad',NULL),(11,'hduwhduh','SITO LOWER PANABANG BRGY. APAS','1','AKDAWLK','Available',2,2,5,'djawdwad',NULL),(12,'hduwhduh','SITO LOWER PANABANG BRGY. APAS','1','AKDAWLK','Available',2,2,5,'djawdwad',NULL),(13,'hduwhduh','SITO LOWER PANABANG BRGY. APAS','1','AKDAWLK','Available',2,2,5,'djawdwad',NULL),(14,'dadawd','SITO LOWER PANABANG BRGY. APAS','1','dawdaw','Available',3,2,5,'dawdwa',NULL);
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
  `post_img` text COLLATE utf8mb4_unicode_ci,
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2025-04-26','main_assets/images/pets/charlie.jpg','This is a updated description of the pet post.',1,1,'Available','wala lang'),(2,'2025-04-26','https://example.com/uploads/post_images/pet_image.jpg','This is a description of the pet post.',1,1,'Available','boot ka?'),(3,'2025-04-26','https://example.com/uploads/post_images/pet_image.jpg','Ballerina Capuccina MI mi mi .',2,2,'Completed','tang ina mo'),(4,'2025-04-26','https://example.com/uploads/post_images/pet_image.jpg','Ballerina Capuccina MI mi mi .',2,3,'Available','wala lang'),(5,'2025-05-09','/path/to/profile.jpg','dawdwa',14,5,'Pending',NULL);
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
  `pet_id` int DEFAULT NULL,
  PRIMARY KEY (`rev_id`),
  KEY `review_user_id_foreign` (`user_id`),
  KEY `fk_rev_rated_by` (`rev_rated_by`),
  CONSTRAINT `fk_rev_rated_by` FOREIGN KEY (`rev_rated_by`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,5,NULL,'2025-04-23',1,1,2),(2,1,'the pet is cute','2025-04-23',2,1,3),(3,1,'chimpanzini bananini','2025-04-23',2,1,1),(4,5,'tralalelo tralala','2025-04-23',1,2,1),(5,5,'good shits','2025-04-23',2,5,2),(6,5,'fine shyt','2025-04-23',2,5,3),(7,3,NULL,'2025-04-23',2,5,1),(8,1,'tralalelo tralala','2025-04-23',2,5,2),(9,1,NULL,'2025-04-23',2,5,2),(10,1,'yow','2025-05-05',2,5,3);
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
INSERT INTO `sessions` VALUES ('FTY6nRWzeymiIjI2CubbAJogI6EDfbtEPfyPMI8I',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 OPR/118.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoibTI1eElxcEM0SUczVWVRa2NFb3d0d21UZlpEbkpKbWd4djlPRUdxOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746770268),('Mz9024Uon0ZtFZjqADbiDm7KbHx2QelHnSluAEvq',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 OPR/118.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoicjM2TElJOWxuN0JiM2I2Ym8wcHQ1cWtHWVlWUlVtNjFYeHNhZko1SyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746752638),('OK20ws2k9G0nFMlRuY0H1S4VDuw8Q3HkjKLn1RHF',NULL,'127.0.0.1','PostmanRuntime/7.43.4','YTozOntzOjY6Il90b2tlbiI7czo0MDoid3BQb3FMZUFUeE9rOHVYdWRFSzhWU3N2dVNLbE1kMmpQTWpKeTRObiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746732269),('OlZ65BdOxZwpJvktXDbys4XZJjlcaxQpL316yznq',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT; Windows NT 10.0; en-PH) WindowsPowerShell/5.1.26100.3624','YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2ZLWFg1WFlLZ0lpN3dYbU0yZ2xwWnVMODhNQzNkYXRTSjNBZDVqdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746771121),('p6owLAfXAxPN9J9hVDzc3HugcnhI7ebsZNm9v337',NULL,'127.0.0.1','PostmanRuntime/7.43.4','YTozOntzOjY6Il90b2tlbiI7czo0MDoiZnhsaGkzckJYSHVkRnJFV0FycUVqekMyZk1NbkE2cHZaRkVQeDB3eCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1746203071),('SQ8kkLl96QEvnZNdw9Q8dvCK3AjFB2GU2K2LdEOV',NULL,'127.0.0.1','PostmanRuntime/7.43.3','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUms5dG5RYTVXR1F4NEVGOFp5aVhSSHRLWFhKb3JNaGJjY1Uzb2x0VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1745614282),('vbVnZYYJowRuijUMYMDRItxiDNEpQiY2Y8eE8wnf',NULL,'127.0.0.1','PostmanRuntime/7.43.3','YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWZXNks1SVNBSG9FVlh4Y29YT01peTZGM1dZZk1DN000UmhPQWlIRyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1745637288);
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
  `user_verified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'edmar1434z','09123456789','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','juan.delacruz@example.com','$2y$12$7U9YwMKiA3kjc8amIcQwW.jasvONdh9le9JOYRGLRKHDAu9HhUA7.','2025-04-26',0),(2,'Edmark C. Talingting','09106682418','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','edmarktalingting0@gmail.com','$2y$12$mptaBojzkHIPiIOFI7AN0eRnPBrQJzPsYtB07H3KkYyAY1petwPGu','2025-04-26',0),(3,'Edmark C. Talingting','09106682418','Apas, Cebu City','https://example.com/uploads/profile/juan.jpg','edmarktalingting120@gmail.com','$2y$12$Kmx4TiJ9lSLXBFXvk4l3POPWFCz5nunVbc6BfZGTno4a9TZ3a5yui','2025-04-26',0),(4,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'edmarktalingting5@gmail.com','$2y$12$LhFZprnoK1klA0v3l69t1.77VBUNZp.P5bKYhXq53h73Cw.wlHqti','2025-05-02',0),(5,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'cobolritchie4@gmail.com','$2y$12$BLTd1hgZv0U/A3kpQq9gP.BYrSlectbrp.n7F51RhICiUDlUFBOry','2025-05-02',1),(6,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'ewewae@gmail.com','$2y$12$7T1F/pxFfgPjiDPopTqB/e/oBoXt4iplfg7linamvIE/LtcVgBfGS','2025-05-02',0),(7,'Edmark Cujardo Talingting','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'edmarktalingting513213@gmail.com','$2y$12$CrF8QcKjSq1FCn7f3IceQ.RSWMvZcGkbobP90PqnvI9GbSOaCC0Wy','2025-05-05',0),(8,'edmark','09103426707','SITO LOWER PANABANG BRGY. APAS',NULL,'edmarktdawda@gmail.com','$2y$12$ulQqcRdPm/sIE1SPuVhYb.nTFe03q7CsTcjSJSHCyNSD07x2yi61O','2025-05-08',0);
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

-- Dump completed on 2025-05-11  7:42:12
