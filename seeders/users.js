--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (35,'Matthew','Holland','mholland','mtholland10@gmail.com','$2a$10$pdZFtat4ArDPhrCnG9k2CeVzm61.PS9KQHNuTv1CcJej22axqio7i','2016-11-28 19:58:51','2016-11-28 19:58:51'),(40,'Mike','Holland','m1holla2','mtholland10@gmail.com','$2a$10$iBHfyrSTMX6E483GNwiE7ut7ztZtNPHzsHYIH0beNUdffq6E6Lge2','2016-11-28 20:43:43','2016-11-28 20:43:43');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;