-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: data_visualizer
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `code` varchar(32) NOT NULL,
  `region` varchar(128) DEFAULT NULL,
  `income_group` varchar(128) DEFAULT NULL,
  `special_notes` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Poland','POL','Europe & Central Asia','High income',NULL),(2,'Malta','MLT','Middle East & North Africa','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2008: 1 euro = 0.4293 Maltese lira. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries. National accounts data source from 1995 to 2015 is Eurostat; prior to 1995 is UN. The new reference year is 2010.'),(3,'Germany','DEU','Europe & Central Asia','High income',NULL),(4,'Austria','AUT','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 13.7603 Austrian schilling. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(5,'Slovak Republic','SVK','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2009: 1 euro = 30.126 Slovak koruna. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries.'),(6,'Estonia','EST','Europe & Central Asia','High income','The following irrevocable euro conversion rate entered into force on January 1, 2011: 1 euro = 15.6466 Estonian kroon. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries.'),(7,'Luxembourg','LUX','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 40.3399 Luxembourg franc. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(8,'Croatia','HRV','Europe & Central Asia','High income',NULL),(9,'Bulgaria','BGR','Europe & Central Asia','Upper middle income',NULL),(10,'Portugal','PRT','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 200.482 Portuguese escudo. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(11,'Netherlands','NLD','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 2.20371 Netherlands guilder. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(12,'Belgium','BEL','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 40.3399 Belgian franc. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(13,'Greece','GRC','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 340.75 Greek drachma. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(14,'Czech Republic','CZE','Europe & Central Asia','High income',NULL),(15,'Latvia','LVA','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2014: 1 euro = 0.702804 Latvian lats. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries. Based on data from EUROSTAT, the new reference year is 2010.'),(16,'Spain','ESP','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 166.386 Spanish peseta. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(17,'Finland','FIN','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 5.94573 Finnish markka. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(18,'Romania','ROU','Europe & Central Asia','Upper middle income',NULL),(19,'Italy','ITA','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 1936.27 Italian lira. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(20,'Slovenia','SVN','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2007: 1 euro = 239.64 Slovenian tolar. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries.'),(21,'Ireland','IRL','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 0.787564 Irish pound. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(22,'France','FRA','Europe & Central Asia','High income','The following irrevocable euro conversion rate was adopted by the EU Council on January 1, 1999: 1 euro = 6.55957 French franc. Please note that historical data before 1999 are not actual euros and are not comparable or suitable for aggregation across countries.'),(23,'Cyprus','CYP','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2008: 1 euro = 0.585274 Cyprus pounds. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries.'),(24,'Denmark','DNK','Europe & Central Asia','High income',NULL),(25,'Lithuania','LTU','Europe & Central Asia','High income','A simple multiplier is used to convert the national currencies of EMU members to euros. The following irrevocable euro conversion rate entered into force on January 1, 2015: 1 euro = 3.45280 Lithuanian litas. Please note that historical data are not actual euros and are not comparable or suitable for aggregation across countries. Based on data from EUROSTAT, the new reference year is 2010.'),(26,'Sweden','SWE','Europe & Central Asia','High income','Fiscal year end: June 30; reporting period for national accounts data: CY.'),(27,'Hungary','HUN','Europe & Central Asia','High income',NULL);
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-19 23:39:53
