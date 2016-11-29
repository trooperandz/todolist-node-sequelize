--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'Bookkeeping','2016-11-27 00:00:00','2016-11-27 00:00:00'),(2,'Exercise','2016-11-27 00:00:00','2016-11-27 00:00:00'),(3,'Miscellaneous','2016-11-27 00:00:00','2016-11-27 00:00:00'),(4,'Music','2016-11-27 00:00:00','2016-11-27 00:00:00');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;