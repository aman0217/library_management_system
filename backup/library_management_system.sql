-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: library_management_system
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `active` bit(1) NOT NULL,
  `author` varchar(255) NOT NULL,
  `available_copies` int NOT NULL,
  `category` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `publication_year` int NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `total_copies` int NOT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKkibbepcitr0a3cpk3rfr7nihn` (`isbn`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'2026-08-05 22:06:47.000000','2026-08-05 22:14:59.726046',_binary '','James Gosling',20,'Programming','9780000000001',2021,'Oracle Press','Java Programming',20,NULL),(2,'2026-08-05 22:06:47.000000','2026-08-05 22:14:39.474368',_binary '','Joshua Bloch',19,'Programming','9780000000002',2018,'Addison-Wesley','Effective Java',20,NULL),(3,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Craig Walls',20,'Programming','9780000000003',2022,'Manning','Spring Boot in Action',20,NULL),(4,'2026-08-05 22:06:47.000000','2026-08-05 22:10:36.391131',_binary '','Robert C. Martin',19,'Programming','9780000000004',2008,'Prentice Hall','Clean Code',20,NULL),(5,'2026-08-05 22:06:47.000000','2026-08-05 22:13:57.923839',_binary '','Kathy Sierra',20,'Programming','9780000000005',2020,'O\'Reilly','Head First Java',20,NULL),(6,'2026-08-05 22:06:47.000000','2026-08-05 22:12:10.304106',_binary '','Mark Allen Weiss',19,'Programming','9780000000006',2019,'Pearson','Data Structures in Java',20,NULL),(7,'2026-08-05 22:06:47.000000','2026-08-05 22:14:45.513482',_binary '','Thomas H. Cormen',19,'Algorithms','9780000000007',2022,'MIT Press','Introduction to Algorithms',20,NULL),(8,'2026-08-05 22:06:47.000000','2026-08-05 22:12:31.993864',_binary '','Erich Gamma',19,'Programming','9780000000008',1994,'Addison-Wesley','Design Patterns',20,NULL),(9,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Brian Goetz',20,'Programming','9780000000009',2006,'Addison-Wesley','Java Concurrency in Practice',20,NULL),(10,'2026-08-05 22:06:47.000000','2026-08-05 22:15:19.777443',_binary '','Laurentiu Spilca',19,'Programming','9780000000010',2021,'Manning','Spring Security in Action',20,NULL),(11,'2026-08-05 22:06:47.000000','2026-08-05 22:10:49.559835',_binary '','Andrew S. Tanenbaum',19,'Networking','9780000000011',2021,'Pearson','Computer Networks',20,NULL),(12,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Abraham Silberschatz',20,'Operating System','9780000000012',2020,'Wiley','Operating System Concepts',20,NULL),(13,'2026-08-05 22:06:47.000000','2026-08-05 22:12:15.774868',_binary '','Henry F. Korth',19,'Database','9780000000013',2020,'McGraw Hill','Database System Concepts',20,NULL),(14,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Ian Sommerville',20,'Software Engineering','9780000000014',2021,'Pearson','Software Engineering',20,NULL),(15,'2026-08-05 22:06:47.000000','2026-08-05 22:10:57.054105',_binary '','Carl Hamacher',19,'Computer Science','9780000000015',2019,'McGraw Hill','Computer Organization',20,NULL),(16,'2026-08-05 22:06:47.000000','2026-08-05 22:15:36.263890',_binary '','Dennis Ritchie',20,'Programming','9780000000016',2017,'Pearson','The C Programming Language',20,NULL),(17,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Eric Matthes',20,'Programming','9780000000017',2023,'No Starch Press','Python Crash Course',20,NULL),(18,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Mark Lutz',20,'Programming','9780000000018',2019,'O\'Reilly','Learning Python',20,NULL),(19,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Douglas Crockford',20,'Programming','9780000000019',2008,'O\'Reilly','JavaScript: The Good Parts',20,NULL),(20,'2026-08-05 22:06:47.000000','2026-08-05 22:13:59.360725',_binary '','Marijn Haverbeke',20,'Programming','9780000000020',2022,'No Starch Press','Eloquent JavaScript',20,NULL),(21,'2026-08-05 22:06:47.000000','2026-08-05 22:15:10.064677',_binary '','Jon Duckett',19,'Web Development','9780000000021',2018,'Wiley','HTML and CSS',20,NULL),(22,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Azat Mardan',20,'Web Development','9780000000022',2021,'Manning','React Quickly',20,NULL),(23,'2026-08-05 22:06:47.000000','2026-08-05 22:12:39.722034',_binary '','Nigel Poulton',19,'DevOps','9780000000023',2023,'Leanpub','Docker Deep Dive',20,NULL),(24,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Brendan Burns',20,'DevOps','9780000000024',2022,'O\'Reilly','Kubernetes Up and Running',20,NULL),(25,'2026-08-05 22:06:47.000000','2026-08-05 22:10:27.864255',_binary '','Stuart Russell',19,'Artificial Intelligence','9780000000025',2021,'Pearson','Artificial Intelligence',20,NULL),(26,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Tom M. Mitchell',20,'Artificial Intelligence','9780000000026',2018,'McGraw Hill','Machine Learning',20,NULL),(27,'2026-08-05 22:06:47.000000','2026-08-05 22:12:22.089067',_binary '','Ian Goodfellow',19,'Artificial Intelligence','9780000000027',2019,'MIT Press','Deep Learning',20,NULL),(28,'2026-08-05 22:06:47.000000','2026-08-05 22:10:43.824617',_binary '','Alfred V. Aho',19,'Compiler','9780000000028',2019,'Pearson','Compiler Design',20,NULL),(29,'2026-08-05 22:06:47.000000','2026-08-05 22:06:47.000000',_binary '','Herbert Schildt',20,'Programming','9780000000029',2022,'McGraw Hill','Java: The Complete Reference',20,NULL),(30,'2026-08-05 22:06:47.000000','2026-08-05 22:15:32.614733',_binary '','Bruce Eckel',19,'Programming','9780000000030',2021,'Prentice Hall','Thinking in Java',20,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_records`
--

DROP TABLE IF EXISTS `borrow_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrow_records` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `borrow_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('BORROWED','OVERDUE','RETURNED') NOT NULL,
  `book_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `fine` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9ep13xg9kn8vo3w0ntvd08tco` (`book_id`),
  KEY `FKe5k0iaamaypstfhuluoa40yom` (`user_id`),
  CONSTRAINT `FK9ep13xg9kn8vo3w0ntvd08tco` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `FKe5k0iaamaypstfhuluoa40yom` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_records`
--

LOCK TABLES `borrow_records` WRITE;
/*!40000 ALTER TABLE `borrow_records` DISABLE KEYS */;
/*!40000 ALTER TABLE `borrow_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_records`
--

DROP TABLE IF EXISTS `issue_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_records` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `due_date` date NOT NULL,
  `issue_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `returned` bit(1) NOT NULL,
  `book_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7vy21j5r9v9st5pblmij1gx1l` (`book_id`),
  KEY `FK3xkqq5u2a2miyl8ejs0jl3rqg` (`user_id`),
  CONSTRAINT `FK3xkqq5u2a2miyl8ejs0jl3rqg` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK7vy21j5r9v9st5pblmij1gx1l` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_records`
--

LOCK TABLES `issue_records` WRITE;
/*!40000 ALTER TABLE `issue_records` DISABLE KEYS */;
INSERT INTO `issue_records` VALUES (1,'2026-08-05 22:10:27.899963','2026-08-05 22:10:27.899963','2026-08-20','2026-08-05',NULL,_binary '\0',25,1),(2,'2026-08-05 22:10:36.406698','2026-08-05 22:10:36.406698','2026-08-20','2026-08-05',NULL,_binary '\0',4,1),(3,'2026-08-05 22:10:43.837373','2026-08-05 22:10:43.837373','2026-08-20','2026-08-05',NULL,_binary '\0',28,1),(4,'2026-08-05 22:10:49.574741','2026-08-05 22:10:49.574741','2026-08-20','2026-08-05',NULL,_binary '\0',11,1),(5,'2026-08-05 22:10:57.067370','2026-08-05 22:10:57.067370','2026-08-20','2026-08-05',NULL,_binary '\0',15,1),(6,'2026-08-05 22:11:05.236522','2026-08-05 22:11:57.339009','2026-08-20','2026-08-05','2026-08-05',_binary '',6,1),(7,'2026-08-05 22:11:14.010637','2026-08-05 22:11:52.413584','2026-08-20','2026-08-05','2026-08-05',_binary '',13,1),(8,'2026-08-05 22:11:19.336976','2026-08-05 22:11:51.043964','2026-08-20','2026-08-05','2026-08-05',_binary '',27,1),(9,'2026-08-05 22:11:25.817863','2026-08-05 22:11:49.871316','2026-08-20','2026-08-05','2026-08-05',_binary '',8,1),(10,'2026-08-05 22:11:32.435037','2026-08-05 22:11:48.590545','2026-08-20','2026-08-05','2026-08-05',_binary '',23,1),(11,'2026-08-05 22:12:10.312836','2026-08-05 22:12:10.312836','2026-08-20','2026-08-05',NULL,_binary '\0',6,2),(12,'2026-08-05 22:12:15.791315','2026-08-05 22:12:15.791315','2026-08-20','2026-08-05',NULL,_binary '\0',13,2),(13,'2026-08-05 22:12:22.104161','2026-08-05 22:12:22.104161','2026-08-20','2026-08-05',NULL,_binary '\0',27,2),(14,'2026-08-05 22:12:31.996381','2026-08-05 22:12:31.996381','2026-08-20','2026-08-05',NULL,_binary '\0',8,2),(15,'2026-08-05 22:12:39.741151','2026-08-05 22:12:39.741151','2026-08-20','2026-08-05',NULL,_binary '\0',23,2),(16,'2026-08-05 22:12:48.747755','2026-08-05 22:14:03.184994','2026-08-20','2026-08-05','2026-08-05',_binary '',2,2),(17,'2026-08-05 22:12:55.042544','2026-08-05 22:13:59.360725','2026-08-20','2026-08-05','2026-08-05',_binary '',20,2),(18,'2026-08-05 22:13:09.711607','2026-08-05 22:13:57.923839','2026-08-20','2026-08-05','2026-08-05',_binary '',5,2),(19,'2026-08-05 22:13:21.419543','2026-08-05 22:13:55.899833','2026-08-20','2026-08-05','2026-08-05',_binary '',21,2),(20,'2026-08-05 22:13:30.678469','2026-08-05 22:13:54.887034','2026-08-20','2026-08-05','2026-08-05',_binary '',7,2),(21,'2026-08-05 22:14:39.488992','2026-08-05 22:14:39.488992','2026-08-20','2026-08-05',NULL,_binary '\0',2,9),(22,'2026-08-05 22:14:45.523382','2026-08-05 22:14:45.523382','2026-08-20','2026-08-05',NULL,_binary '\0',7,9),(23,'2026-08-05 22:14:56.808731','2026-08-05 22:14:59.726046','2026-08-20','2026-08-05','2026-08-05',_binary '',1,9),(24,'2026-08-05 22:15:10.082141','2026-08-05 22:15:10.082141','2026-08-20','2026-08-05',NULL,_binary '\0',21,10),(25,'2026-08-05 22:15:19.794207','2026-08-05 22:15:19.794207','2026-08-20','2026-08-05',NULL,_binary '\0',10,10),(26,'2026-08-05 22:15:27.702286','2026-08-05 22:15:36.263890','2026-08-20','2026-08-05','2026-08-05',_binary '',16,10),(27,'2026-08-05 22:15:32.628594','2026-08-05 22:15:32.628594','2026-08-20','2026-08-05',NULL,_binary '\0',30,10);
/*!40000 ALTER TABLE `issue_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `is_read` bit(1) NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` enum('ERROR','INFO','SUCCESS','WARNING') NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`),
  CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-08-05 22:10:27.934202','2026-08-05 22:10:27.934202','You have successfully borrowed \"Artificial Intelligence\".',_binary '\0','Book Borrowed','SUCCESS',1),(2,'2026-08-05 22:10:27.955640','2026-08-05 22:10:27.955640','Aman Thakur borrowed \"Artificial Intelligence\".',_binary '\0','Book Borrowed','INFO',3),(3,'2026-08-05 22:10:27.955640','2026-08-05 22:10:27.955640','Aman Thakur borrowed \"Artificial Intelligence\".',_binary '\0','Book Borrowed','INFO',4),(4,'2026-08-05 22:10:36.415712','2026-08-05 22:10:36.415712','You have successfully borrowed \"Clean Code\".',_binary '\0','Book Borrowed','SUCCESS',1),(5,'2026-08-05 22:10:36.429389','2026-08-05 22:10:36.429389','Aman Thakur borrowed \"Clean Code\".',_binary '\0','Book Borrowed','INFO',3),(6,'2026-08-05 22:10:36.431064','2026-08-05 22:10:36.431064','Aman Thakur borrowed \"Clean Code\".',_binary '\0','Book Borrowed','INFO',4),(7,'2026-08-05 22:10:43.844370','2026-08-05 22:10:43.844370','You have successfully borrowed \"Compiler Design\".',_binary '\0','Book Borrowed','SUCCESS',1),(8,'2026-08-05 22:10:43.851001','2026-08-05 22:10:43.851001','Aman Thakur borrowed \"Compiler Design\".',_binary '\0','Book Borrowed','INFO',3),(9,'2026-08-05 22:10:43.851001','2026-08-05 22:10:43.851001','Aman Thakur borrowed \"Compiler Design\".',_binary '\0','Book Borrowed','INFO',4),(10,'2026-08-05 22:10:49.581546','2026-08-05 22:10:49.581546','You have successfully borrowed \"Computer Networks\".',_binary '\0','Book Borrowed','SUCCESS',1),(11,'2026-08-05 22:10:49.596618','2026-08-05 22:10:49.596618','Aman Thakur borrowed \"Computer Networks\".',_binary '\0','Book Borrowed','INFO',3),(12,'2026-08-05 22:10:49.596618','2026-08-05 22:10:49.596618','Aman Thakur borrowed \"Computer Networks\".',_binary '\0','Book Borrowed','INFO',4),(13,'2026-08-05 22:10:57.069412','2026-08-05 22:10:57.069412','You have successfully borrowed \"Computer Organization\".',_binary '\0','Book Borrowed','SUCCESS',1),(14,'2026-08-05 22:10:57.089353','2026-08-05 22:10:57.089353','Aman Thakur borrowed \"Computer Organization\".',_binary '\0','Book Borrowed','INFO',3),(15,'2026-08-05 22:10:57.090599','2026-08-05 22:10:57.090599','Aman Thakur borrowed \"Computer Organization\".',_binary '\0','Book Borrowed','INFO',4),(16,'2026-08-05 22:11:05.248194','2026-08-05 22:11:05.248194','You have successfully borrowed \"Data Structures in Java\".',_binary '\0','Book Borrowed','SUCCESS',1),(17,'2026-08-05 22:11:05.250272','2026-08-05 22:11:05.250272','Aman Thakur borrowed \"Data Structures in Java\".',_binary '\0','Book Borrowed','INFO',3),(18,'2026-08-05 22:11:05.265437','2026-08-05 22:11:05.265437','Aman Thakur borrowed \"Data Structures in Java\".',_binary '\0','Book Borrowed','INFO',4),(19,'2026-08-05 22:11:14.022208','2026-08-05 22:11:14.022208','You have successfully borrowed \"Database System Concepts\".',_binary '\0','Book Borrowed','SUCCESS',1),(20,'2026-08-05 22:11:14.037072','2026-08-05 22:11:14.037072','Aman Thakur borrowed \"Database System Concepts\".',_binary '\0','Book Borrowed','INFO',3),(21,'2026-08-05 22:11:14.047733','2026-08-05 22:11:14.047733','Aman Thakur borrowed \"Database System Concepts\".',_binary '\0','Book Borrowed','INFO',4),(22,'2026-08-05 22:11:19.342493','2026-08-05 22:11:19.342493','You have successfully borrowed \"Deep Learning\".',_binary '\0','Book Borrowed','SUCCESS',1),(23,'2026-08-05 22:11:19.356926','2026-08-05 22:11:19.356926','Aman Thakur borrowed \"Deep Learning\".',_binary '\0','Book Borrowed','INFO',3),(24,'2026-08-05 22:11:19.356926','2026-08-05 22:11:19.356926','Aman Thakur borrowed \"Deep Learning\".',_binary '\0','Book Borrowed','INFO',4),(25,'2026-08-05 22:11:25.821643','2026-08-05 22:11:25.821643','You have successfully borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','SUCCESS',1),(26,'2026-08-05 22:11:25.837006','2026-08-05 22:11:25.837006','Aman Thakur borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','INFO',3),(27,'2026-08-05 22:11:25.837006','2026-08-05 22:11:25.837006','Aman Thakur borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','INFO',4),(28,'2026-08-05 22:11:32.443678','2026-08-05 22:11:32.443678','You have successfully borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','SUCCESS',1),(29,'2026-08-05 22:11:32.456024','2026-08-05 22:11:32.456024','Aman Thakur borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','INFO',3),(30,'2026-08-05 22:11:32.457641','2026-08-05 22:11:32.457641','Aman Thakur borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','INFO',4),(31,'2026-08-05 22:11:48.611475','2026-08-05 22:11:48.611475','You have successfully returned \"Docker Deep Dive\".',_binary '\0','Book Returned','SUCCESS',1),(32,'2026-08-05 22:11:48.630551','2026-08-05 22:11:48.630551','Aman Thakur returned \"Docker Deep Dive\".',_binary '\0','Book Returned','INFO',3),(33,'2026-08-05 22:11:48.630551','2026-08-05 22:11:48.630551','Aman Thakur returned \"Docker Deep Dive\".',_binary '\0','Book Returned','INFO',4),(34,'2026-08-05 22:11:49.883351','2026-08-05 22:11:49.883351','You have successfully returned \"Design Patterns\".',_binary '\0','Book Returned','SUCCESS',1),(35,'2026-08-05 22:11:49.895626','2026-08-05 22:11:49.895626','Aman Thakur returned \"Design Patterns\".',_binary '\0','Book Returned','INFO',3),(36,'2026-08-05 22:11:49.895626','2026-08-05 22:11:49.895626','Aman Thakur returned \"Design Patterns\".',_binary '\0','Book Returned','INFO',4),(37,'2026-08-05 22:11:51.064099','2026-08-05 22:11:51.064099','You have successfully returned \"Deep Learning\".',_binary '\0','Book Returned','SUCCESS',1),(38,'2026-08-05 22:11:51.079479','2026-08-05 22:11:51.079479','Aman Thakur returned \"Deep Learning\".',_binary '\0','Book Returned','INFO',3),(39,'2026-08-05 22:11:51.079479','2026-08-05 22:11:51.079479','Aman Thakur returned \"Deep Learning\".',_binary '\0','Book Returned','INFO',4),(40,'2026-08-05 22:11:52.430553','2026-08-05 22:11:52.430553','You have successfully returned \"Database System Concepts\".',_binary '\0','Book Returned','SUCCESS',1),(41,'2026-08-05 22:11:52.444589','2026-08-05 22:11:52.444589','Aman Thakur returned \"Database System Concepts\".',_binary '\0','Book Returned','INFO',3),(42,'2026-08-05 22:11:52.446255','2026-08-05 22:11:52.446255','Aman Thakur returned \"Database System Concepts\".',_binary '\0','Book Returned','INFO',4),(43,'2026-08-05 22:11:57.357496','2026-08-05 22:11:57.357496','You have successfully returned \"Data Structures in Java\".',_binary '\0','Book Returned','SUCCESS',1),(44,'2026-08-05 22:11:57.363742','2026-08-05 22:11:57.363742','Aman Thakur returned \"Data Structures in Java\".',_binary '\0','Book Returned','INFO',3),(45,'2026-08-05 22:11:57.363742','2026-08-05 22:11:57.363742','Aman Thakur returned \"Data Structures in Java\".',_binary '\0','Book Returned','INFO',4),(46,'2026-08-05 22:12:10.321032','2026-08-05 22:19:41.129325','You have successfully borrowed \"Data Structures in Java\".',_binary '','Book Borrowed','SUCCESS',2),(47,'2026-08-05 22:12:10.335252','2026-08-05 22:12:10.335252','Vishal Kumar borrowed \"Data Structures in Java\".',_binary '\0','Book Borrowed','INFO',3),(48,'2026-08-05 22:12:10.336822','2026-08-05 22:12:10.336822','Vishal Kumar borrowed \"Data Structures in Java\".',_binary '\0','Book Borrowed','INFO',4),(49,'2026-08-05 22:12:15.791315','2026-08-05 22:19:42.230819','You have successfully borrowed \"Database System Concepts\".',_binary '','Book Borrowed','SUCCESS',2),(50,'2026-08-05 22:12:15.810741','2026-08-05 22:12:15.810741','Vishal Kumar borrowed \"Database System Concepts\".',_binary '\0','Book Borrowed','INFO',3),(51,'2026-08-05 22:12:15.813549','2026-08-05 22:12:15.813549','Vishal Kumar borrowed \"Database System Concepts\".',_binary '\0','Book Borrowed','INFO',4),(52,'2026-08-05 22:12:22.109835','2026-08-05 22:19:43.458328','You have successfully borrowed \"Deep Learning\".',_binary '','Book Borrowed','SUCCESS',2),(53,'2026-08-05 22:12:22.124800','2026-08-05 22:12:22.125349','Vishal Kumar borrowed \"Deep Learning\".',_binary '\0','Book Borrowed','INFO',3),(54,'2026-08-05 22:12:22.125854','2026-08-05 22:12:22.125854','Vishal Kumar borrowed \"Deep Learning\".',_binary '\0','Book Borrowed','INFO',4),(55,'2026-08-05 22:12:32.015984','2026-08-05 22:12:32.015984','You have successfully borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','SUCCESS',2),(56,'2026-08-05 22:12:32.026994','2026-08-05 22:12:32.026994','Vishal Kumar borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','INFO',3),(57,'2026-08-05 22:12:32.030235','2026-08-05 22:12:32.030235','Vishal Kumar borrowed \"Design Patterns\".',_binary '\0','Book Borrowed','INFO',4),(58,'2026-08-05 22:12:39.748115','2026-08-05 22:12:39.748115','You have successfully borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','SUCCESS',2),(59,'2026-08-05 22:12:39.760576','2026-08-05 22:12:39.760576','Vishal Kumar borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','INFO',3),(60,'2026-08-05 22:12:39.760576','2026-08-05 22:12:39.760576','Vishal Kumar borrowed \"Docker Deep Dive\".',_binary '\0','Book Borrowed','INFO',4),(61,'2026-08-05 22:12:48.756077','2026-08-05 22:12:48.756077','You have successfully borrowed \"Effective Java\".',_binary '\0','Book Borrowed','SUCCESS',2),(62,'2026-08-05 22:12:48.764308','2026-08-05 22:12:48.764308','Vishal Kumar borrowed \"Effective Java\".',_binary '\0','Book Borrowed','INFO',3),(63,'2026-08-05 22:12:48.764308','2026-08-05 22:12:48.764308','Vishal Kumar borrowed \"Effective Java\".',_binary '\0','Book Borrowed','INFO',4),(64,'2026-08-05 22:12:55.048792','2026-08-05 22:12:55.048792','You have successfully borrowed \"Eloquent JavaScript\".',_binary '\0','Book Borrowed','SUCCESS',2),(65,'2026-08-05 22:12:55.061641','2026-08-05 22:12:55.061641','Vishal Kumar borrowed \"Eloquent JavaScript\".',_binary '\0','Book Borrowed','INFO',3),(66,'2026-08-05 22:12:55.061641','2026-08-05 22:12:55.061641','Vishal Kumar borrowed \"Eloquent JavaScript\".',_binary '\0','Book Borrowed','INFO',4),(67,'2026-08-05 22:13:09.719032','2026-08-05 22:13:09.719032','You have successfully borrowed \"Head First Java\".',_binary '\0','Book Borrowed','SUCCESS',2),(68,'2026-08-05 22:13:09.733168','2026-08-05 22:13:09.733168','Vishal Kumar borrowed \"Head First Java\".',_binary '\0','Book Borrowed','INFO',3),(69,'2026-08-05 22:13:09.733168','2026-08-05 22:13:09.733168','Vishal Kumar borrowed \"Head First Java\".',_binary '\0','Book Borrowed','INFO',4),(70,'2026-08-05 22:13:21.419543','2026-08-05 22:13:21.419543','You have successfully borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','SUCCESS',2),(71,'2026-08-05 22:13:21.438681','2026-08-05 22:13:21.438681','Vishal Kumar borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','INFO',3),(72,'2026-08-05 22:13:21.438681','2026-08-05 22:13:21.438681','Vishal Kumar borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','INFO',4),(73,'2026-08-05 22:13:30.681730','2026-08-05 22:13:30.681730','You have successfully borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','SUCCESS',2),(74,'2026-08-05 22:13:30.697790','2026-08-05 22:13:30.697790','Vishal Kumar borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','INFO',3),(75,'2026-08-05 22:13:30.697790','2026-08-05 22:13:30.697790','Vishal Kumar borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','INFO',4),(76,'2026-08-05 22:13:54.908023','2026-08-05 22:13:54.908023','You have successfully returned \"Introduction to Algorithms\".',_binary '\0','Book Returned','SUCCESS',2),(77,'2026-08-05 22:13:54.927370','2026-08-05 22:13:54.927370','Vishal Kumar returned \"Introduction to Algorithms\".',_binary '\0','Book Returned','INFO',3),(78,'2026-08-05 22:13:54.927370','2026-08-05 22:13:54.927370','Vishal Kumar returned \"Introduction to Algorithms\".',_binary '\0','Book Returned','INFO',4),(79,'2026-08-05 22:13:55.920124','2026-08-05 22:13:55.920124','You have successfully returned \"HTML and CSS\".',_binary '\0','Book Returned','SUCCESS',2),(80,'2026-08-05 22:13:55.926960','2026-08-05 22:13:55.926960','Vishal Kumar returned \"HTML and CSS\".',_binary '\0','Book Returned','INFO',3),(81,'2026-08-05 22:13:55.926960','2026-08-05 22:13:55.926960','Vishal Kumar returned \"HTML and CSS\".',_binary '\0','Book Returned','INFO',4),(82,'2026-08-05 22:13:57.942156','2026-08-05 22:13:57.942156','You have successfully returned \"Head First Java\".',_binary '\0','Book Returned','SUCCESS',2),(83,'2026-08-05 22:13:57.955554','2026-08-05 22:13:57.955554','Vishal Kumar returned \"Head First Java\".',_binary '\0','Book Returned','INFO',3),(84,'2026-08-05 22:13:57.959379','2026-08-05 22:13:57.959379','Vishal Kumar returned \"Head First Java\".',_binary '\0','Book Returned','INFO',4),(85,'2026-08-05 22:13:59.382773','2026-08-05 22:13:59.382773','You have successfully returned \"Eloquent JavaScript\".',_binary '\0','Book Returned','SUCCESS',2),(86,'2026-08-05 22:13:59.389078','2026-08-05 22:13:59.389078','Vishal Kumar returned \"Eloquent JavaScript\".',_binary '\0','Book Returned','INFO',3),(87,'2026-08-05 22:13:59.389078','2026-08-05 22:13:59.389078','Vishal Kumar returned \"Eloquent JavaScript\".',_binary '\0','Book Returned','INFO',4),(88,'2026-08-05 22:14:03.212701','2026-08-05 22:14:03.212701','You have successfully returned \"Effective Java\".',_binary '\0','Book Returned','SUCCESS',2),(89,'2026-08-05 22:14:03.223642','2026-08-05 22:14:03.223642','Vishal Kumar returned \"Effective Java\".',_binary '\0','Book Returned','INFO',3),(90,'2026-08-05 22:14:03.226410','2026-08-05 22:14:03.226410','Vishal Kumar returned \"Effective Java\".',_binary '\0','Book Returned','INFO',4),(91,'2026-08-05 22:14:39.488992','2026-08-05 22:14:39.488992','You have successfully borrowed \"Effective Java\".',_binary '\0','Book Borrowed','SUCCESS',9),(92,'2026-08-05 22:14:39.506004','2026-08-05 22:14:39.506004','Rahul Sharma borrowed \"Effective Java\".',_binary '\0','Book Borrowed','INFO',3),(93,'2026-08-05 22:14:39.509017','2026-08-05 22:14:39.509017','Rahul Sharma borrowed \"Effective Java\".',_binary '\0','Book Borrowed','INFO',4),(94,'2026-08-05 22:14:45.530960','2026-08-05 22:14:45.530960','You have successfully borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','SUCCESS',9),(95,'2026-08-05 22:14:45.539829','2026-08-05 22:14:45.539829','Rahul Sharma borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','INFO',3),(96,'2026-08-05 22:14:45.539829','2026-08-05 22:14:45.539829','Rahul Sharma borrowed \"Introduction to Algorithms\".',_binary '\0','Book Borrowed','INFO',4),(97,'2026-08-05 22:14:56.808731','2026-08-05 22:14:56.808731','You have successfully borrowed \"Java Programming\".',_binary '\0','Book Borrowed','SUCCESS',9),(98,'2026-08-05 22:14:56.827631','2026-08-05 22:14:56.827631','Rahul Sharma borrowed \"Java Programming\".',_binary '\0','Book Borrowed','INFO',3),(99,'2026-08-05 22:14:56.827631','2026-08-05 22:14:56.827631','Rahul Sharma borrowed \"Java Programming\".',_binary '\0','Book Borrowed','INFO',4),(100,'2026-08-05 22:14:59.742923','2026-08-05 22:14:59.742923','You have successfully returned \"Java Programming\".',_binary '\0','Book Returned','SUCCESS',9),(101,'2026-08-05 22:14:59.758493','2026-08-05 22:14:59.758493','Rahul Sharma returned \"Java Programming\".',_binary '\0','Book Returned','INFO',3),(102,'2026-08-05 22:14:59.758493','2026-08-05 22:14:59.758493','Rahul Sharma returned \"Java Programming\".',_binary '\0','Book Returned','INFO',4),(103,'2026-08-05 22:15:10.082141','2026-08-05 22:15:10.082141','You have successfully borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','SUCCESS',10),(104,'2026-08-05 22:15:10.098195','2026-08-05 22:15:10.098195','Anshul  Thakur borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','INFO',3),(105,'2026-08-05 22:15:10.098195','2026-08-05 22:15:10.098195','Anshul  Thakur borrowed \"HTML and CSS\".',_binary '\0','Book Borrowed','INFO',4),(106,'2026-08-05 22:15:19.796425','2026-08-05 22:15:19.796425','You have successfully borrowed \"Spring Security in Action\".',_binary '\0','Book Borrowed','SUCCESS',10),(107,'2026-08-05 22:15:19.811900','2026-08-05 22:15:19.811900','Anshul  Thakur borrowed \"Spring Security in Action\".',_binary '\0','Book Borrowed','INFO',3),(108,'2026-08-05 22:15:19.814764','2026-08-05 22:15:19.814764','Anshul  Thakur borrowed \"Spring Security in Action\".',_binary '\0','Book Borrowed','INFO',4),(109,'2026-08-05 22:15:27.715070','2026-08-05 22:15:27.715070','You have successfully borrowed \"The C Programming Language\".',_binary '\0','Book Borrowed','SUCCESS',10),(110,'2026-08-05 22:15:27.725560','2026-08-05 22:15:27.727124','Anshul  Thakur borrowed \"The C Programming Language\".',_binary '\0','Book Borrowed','INFO',3),(111,'2026-08-05 22:15:27.729055','2026-08-05 22:15:27.729055','Anshul  Thakur borrowed \"The C Programming Language\".',_binary '\0','Book Borrowed','INFO',4),(112,'2026-08-05 22:15:32.635538','2026-08-05 22:15:32.635538','You have successfully borrowed \"Thinking in Java\".',_binary '\0','Book Borrowed','SUCCESS',10),(113,'2026-08-05 22:15:32.649652','2026-08-05 22:15:32.649652','Anshul  Thakur borrowed \"Thinking in Java\".',_binary '\0','Book Borrowed','INFO',3),(114,'2026-08-05 22:15:32.652325','2026-08-05 22:15:32.652325','Anshul  Thakur borrowed \"Thinking in Java\".',_binary '\0','Book Borrowed','INFO',4),(115,'2026-08-05 22:15:36.278119','2026-08-05 22:15:36.278119','You have successfully returned \"The C Programming Language\".',_binary '\0','Book Returned','SUCCESS',10),(116,'2026-08-05 22:15:36.292520','2026-08-05 22:15:36.292520','Anshul  Thakur returned \"The C Programming Language\".',_binary '\0','Book Returned','INFO',3),(117,'2026-08-05 22:15:36.292520','2026-08-05 22:15:36.292520','Anshul  Thakur returned \"The C Programming Language\".',_binary '\0','Book Returned','INFO',4);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(500) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKghpmfn23vmxfu3spu3lfg4r2d` (`token`),
  UNIQUE KEY `UK7tdcd6ab5wsgoudnvj7xf1b7l` (`user_id`),
  CONSTRAINT `FK1lih5y2npsf8u5o3vhdb9y0os` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `role` enum('ADMIN','LIBRARIAN','STUDENT') DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK9q63snka3mdh91as4io72espi` (`phone_number`),
  UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aman@gmail.com','Aman','Thakur','$2a$10$gRrtk1iufO84Kg5NrVS9Fu357J/bHOBE4Jt9a3pPCfPItk/Yzv1qK','9876543210','STUDENT','aman123','2026-07-22 19:08:43.206055','2026-07-31 17:36:07.025033'),(2,'vishal@gmail.com','Vishal','Kumar','$2a$10$UfAKgT39J3j6wEI05Zberu25TctKjzwQtjHrXFgWX0JstpJh5mfE2','9876558990','STUDENT','vishal123','2026-07-23 10:38:56.666120','2026-08-05 22:20:27.420858'),(3,'admin@gmail.com','Aman','Thakur','$2a$10$jQcZzLsMhsPSacmmh2LckuTEHWhGpfmBdF.CYAxepMJrBrbJLiTVS','9999999991','ADMIN','admin','2026-07-24 12:57:07.691980','2026-08-05 22:18:29.931379'),(4,'librarian@gmail.com','Library','Manager','$2a$10$IwaUb6coWCTymI1Xur017e2HRZq4HAY49EuBDwLb7W0p.a0ynhIeu','9999999992','LIBRARIAN','librarian','2026-07-24 12:57:37.960847','2026-07-24 12:57:37.960847'),(9,'rahul@gmail.com','Rahul','Sharma','$2a$10$2slGau4wi7G1PTYwJXw.A.FB1oLh9CfUmo4Pwsi8rQHuJJQSHscq.','9090908787','STUDENT','rahul','2026-08-01 09:23:00.531797','2026-08-01 09:23:00.531797'),(10,'anshul@gmail.com','Anshul ','Thakur','$2a$10$Pgxe6Vsuc9OO4CcbWwwdI.Dc6j/7YnRuPaQqV/3DfS8rTKPDmHXam','9090909087','STUDENT','anshul','2026-08-01 09:24:53.943619','2026-08-01 09:24:53.943619');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-06 22:12:26
