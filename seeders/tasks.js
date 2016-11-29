--
-- Table structure for table `Tasks`
--

DROP TABLE IF EXISTS `Tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `completed` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CategoryId` (`CategoryId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`CategoryId`) REFERENCES `Categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tasks`
--

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;
INSERT INTO `Tasks` VALUES (3,'Complete Aebersold Lesson 1','Figure out speaker panning',0,'2016-11-29 05:08:14','2016-11-29 05:08:14',4,35),(4,'Replace car battery','Go to AutoZone on 7th street',1,'2016-11-29 05:08:47','2016-11-29 18:46:52',3,35),(5,'Update operating system','Upgrade to El Capitan',0,'2016-11-29 20:26:17','2016-11-29 20:26:17',3,35),(6,'Provide updated copy of renter\'s insurance','Through State Farm 555-555-5555',0,'2016-11-29 20:30:06','2016-11-29 20:30:06',1,35),(7,'Get new piano pedal','Model 45-A',1,'2016-11-29 20:30:33','2016-11-29 20:30:40',4,35),(8,'Sign up for rowing class','General fee = $198, six lessons',1,'2016-11-29 20:31:30','2016-11-29 20:32:35',2,35),(9,'Clean out closet','Should have done a while ago',0,'2016-11-29 20:31:55','2016-11-29 20:31:55',3,35),(10,'Get card back from Figure 8','Left a week ago',0,'2016-11-29 20:32:29','2016-11-29 20:32:29',3,35);
/*!40000 ALTER TABLE `Tasks` ENABLE KEYS */;
UNLOCK TABLES;