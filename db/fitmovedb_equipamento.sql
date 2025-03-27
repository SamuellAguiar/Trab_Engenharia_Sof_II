-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fitmovedb
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `equipamento`
--

DROP TABLE IF EXISTS `equipamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamento` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `preco_mensal` decimal(38,2) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `avaliacao` int DEFAULT NULL,
  `disponivel` bit(1) DEFAULT NULL,
  `preco_diario` decimal(38,2) DEFAULT NULL,
  `preco_semanal` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `equipamento_chk_1` CHECK ((`avaliacao` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamento`
--

LOCK TABLES `equipamento` WRITE;
/*!40000 ALTER TABLE `equipamento` DISABLE KEYS */;
INSERT INTO `equipamento` VALUES (1,'Esteira Profissional','Esteira profissional com inclinação automática e programas de treino','/esteira.jpeg?height=300&width=300',299.99,'Movement',5,NULL,NULL,NULL),(2,'Bicicleta Ergométrica','Bicicleta ergométrica com resistência ajustável e monitor cardíaco','/bicicleta.jpeg?height=300&width=300',199.99,'Caloi',4,NULL,NULL,NULL),(3,'Conjunto de Halteres','Conjunto de halteres de diferentes pesos para treino de força','/halteres.jpeg?height=300&width=300',149.99,'Polimet',5,NULL,NULL,NULL),(4,'Banco Multifuncional','Banco ajustável para diversos exercícios de musculação','/Banco.jpeg?height=300&width=300',129.99,'Kikos',4,NULL,NULL,NULL),(5,'Barra Olímpica','Barra olímpica de 2,20m para levantamento de peso','/Barra.jpeg?height=300&width=300',9.99,'LiveUp',5,NULL,NULL,NULL),(6,'Anilhas de Ferro','Conjunto de anilhas de ferro para musculação','/Anilhas.jpeg?height=300&width=300',8.99,'Gorilla',5,NULL,NULL,NULL),(7,'Leg Press 45°','Equipamento para treino de pernas com ajuste de carga','/Leg.jpeg?height=300&width=300',39.99,'Gervasport',5,NULL,NULL,NULL),(8,'Crossover','Máquina crossover para treino de membros superiores','/Crossover.jpeg?height=300&width=300',49.99,'HulkFit',5,NULL,NULL,NULL),(9,'Plano Inicial','Plano básico com equipamentos essenciais para treino funcional e resistência','/iniciante.jpeg?height=300&width=300',69.99,'Iniciante',5,NULL,NULL,NULL),(10,'Plano Intermediário','Plano intermediário com mais variedade de equipamentos para musculação e cardio','intermediario.jpeg',89.99,'Intermediario',4,NULL,NULL,NULL),(11,'Plano Avançado','Plano avançado com equipamentos completos para um treino profissional','avancado.jpeg',129.99,'Avançado',5,NULL,NULL,NULL);
/*!40000 ALTER TABLE `equipamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 10:23:57
