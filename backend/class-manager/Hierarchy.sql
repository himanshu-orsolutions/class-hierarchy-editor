use hierarchy;

DROP TABLE IF EXISTS `classes`;

CREATE TABLE `classes` (
  `cid` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `pid` int(11) DEFAULT '0',
  `abstract` boolean DEFAULT NULL,
  `creation_time` datetime,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `classes` WRITE;
INSERT INTO `classes` VALUES (1,'Vehicle',0,true,NOW()),(2,'Car',1,false,NOW()),(3,'Plane',1,false,NOW()),(4,'Watercraft',1,false,NOW()),(5,'Ship',4,false,NOW()),(6,'Boat',4,false,NOW()),(7,'Powerboat',6,false,NOW()),(8,'Rowingboat',6,false,NOW()),(9,'Gondola',8,false,NOW()),(10,'SailingVessel',4,false,NOW());
UNLOCK TABLES;
