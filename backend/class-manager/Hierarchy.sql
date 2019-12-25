use hierarchy;

DROP TABLE IF EXISTS `Classes`;

CREATE TABLE `Classes` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `pid` int(11) DEFAULT '0',
  `abstract` int(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Classes` WRITE;
INSERT INTO `Classes` VALUES (1,'Vehicle',0,1),(2,'Car',1,0),(3,'Plane',1,0),(4,'Watercraft',1,0),(5,'Ship',4,0),(6,'Boat',4,0),(7,'Powerboat',6,0),(8,'Rowingboat',6,0),(9,'Gondola',8,0),(10,'SailingVessel',4,0);
UNLOCK TABLES;
