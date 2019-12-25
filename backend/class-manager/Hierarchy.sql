use hierarchy;

DROP TABLE IF EXISTS `Classes`;

CREATE TABLE `Classes` (
  `cid` varchar(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `pid` varchar(11) DEFAULT '0',
  `abstract` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `Classes` WRITE;
INSERT INTO `Classes` VALUES ('1','Vehicle','0','true'),('2','Car','1','false'),('3','Plane','1','false'),('4','Watercraft','1','false'),('5','Ship','4','false'),('6','Boat','4','false'),('7','Powerboat','6','false'),('8','Rowingboat','6','false'),('9','Gondola','8','false'),('10','SailingVessel','4','false');
UNLOCK TABLES;
