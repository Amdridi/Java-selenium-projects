-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 20 fév. 2023 à 21:15
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_stock_dridi`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `clId` int NOT NULL,
  `clName` varchar(128) NOT NULL,
  `clphone` varchar(128) NOT NULL,
  `clsubscritpion` varchar(128) NOT NULL,
  `interest` varchar(128) NOT NULL
) ;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`clId`, `clName`, `clphone`, `clsubscritpion`, `interest`) VALUES
(0, 'ameni', '9995696', 'premium', 'sport'),
(0, 'allem', '9995697', 'premium', 'sport'),
(0, 'rim', '9995698', 'premium', 'sport'),
(0, 'zied', '9995698', 'premium', 'sport'),
(0, 'khaoula', '99956228', 'vip', 'classique'),
(0, 'anis', '9995698', 'vip', 'classique'),
(0, 'oussema', '9995698', 'vip', 'sport'),
(0, 'mouna', '9995698', 'premium', 'sport'),
(0, 'omaima', '9993698', 'classique', 'sport'),
(0, 'imen', '9995698', 'premium', 'sport');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `prId` int NOT NULL,
  `code` int NOT NULL,
  `typep` varchar(128) NOT NULL,
  `brand` varchar(128) NOT NULL,
  `ref` int DEFAULT NULL,
  PRIMARY KEY (`prId`),
  KEY `ref` (`ref`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`prId`, `code`, `typep`, `brand`, `ref`) VALUES
(111, 122, 'shoes', 'NIKE', 1),
(114, 123, 'shoes', 'NIKE', 1),
(112, 124, 'basket', 'ADIDAS', 2),
(113, 125, 'skirt', 'ADIDAS', 2);

-- --------------------------------------------------------

--
-- Structure de la table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
CREATE TABLE IF NOT EXISTS `supplier` (
  `suppId` int NOT NULL AUTO_INCREMENT,
  `SuppName` varchar(128) NOT NULL,
  PRIMARY KEY (`suppId`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `supplier`
--

INSERT INTO `supplier` (`suppId`, `SuppName`) VALUES
(1, 'MG'),
(2, 'MONOPRIX'),
(3, 'CARREFOUR'),
(4, 'AZIZA'),
(5, 'GEANT');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
