-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 06 mai 2023 à 02:21
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `calendrier`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id_events` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `nom_events` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `id_ville` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id_events`, `start_date`, `end_date`, `nom_events`, `description`, `id_ville`) VALUES
(1, '2023-04-05', '2023-04-10', 'events 1', 'qdqsdqsd q\r\ndqs\r\n dqs\r\nd qsd\r\nqs\r\nqsd ', 6),
(4, '2023-05-12', '2023-05-14', 'event 2', 'dffffffffffff', 6),
(5, '2023-05-09', '2023-05-12', 'qqdsfsdf', 'dfsdfsdf', 2),
(6, '2023-05-06', '2023-05-08', 'ezsldf', 'qsdqsd', 1);

-- --------------------------------------------------------

--
-- Structure de la table `holidays`
--

CREATE TABLE `holidays` (
  `id_holiday` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `nom_holiday` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `holidays`
--

INSERT INTO `holidays` (`id_holiday`, `start_date`, `nom_holiday`, `description`) VALUES
(2, '2023-05-01', '3id choghlll', 'aaaa'),
(3, '2023-04-09', '3id chouhade2', '3id chouhade2'),
(5, '2023-11-11', 'qsd', 'ssss');

-- --------------------------------------------------------

--
-- Structure de la table `mosques`
--

CREATE TABLE `mosques` (
  `id_mosque` int(11) NOT NULL,
  `nom_mosque` varchar(100) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `id_ville` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `mosques`
--

INSERT INTO `mosques` (`id_mosque`, `nom_mosque`, `adresse`, `longitude`, `latitude`, `id_ville`) VALUES
(1, 'Grande Mosquée de Kairouan', 'Rue Sanaani, Kairouan', '35.675497298', '10.102332924', 5),
(3, 'Grande Mosquée de Sfax', 'souke el arbi', '34.7354', '10.76145', 2),
(4, 'Mosquée des Étrangers', 'Houmt Souk', '33.8767', '10.8606', 18);

-- --------------------------------------------------------

--
-- Structure de la table `prayer_times`
--

CREATE TABLE `prayer_times` (
  `id_prayer_time` int(11) NOT NULL,
  `id_ville` int(11) NOT NULL,
  `fajr` varchar(10) NOT NULL,
  `Sunrise` varchar(10) NOT NULL,
  `dhuhr` varchar(10) NOT NULL,
  `asr` varchar(10) NOT NULL,
  `maghrib` varchar(10) NOT NULL,
  `isha` varchar(10) NOT NULL,
  `last_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `prayer_times`
--

INSERT INTO `prayer_times` (`id_prayer_time`, `id_ville`, `fajr`, `Sunrise`, `dhuhr`, `asr`, `maghrib`, `isha`, `last_date`) VALUES
(1, 1, '3:47 am', '5:17 am', '12:19 pm', '4:05 pm', '7:21 pm', '8:44 pm', '2023-05-06'),
(2, 2, '3:47 am', '5:18 am', '12:13 pm', '3:58 pm', '7:09 pm', '8:33 pm', '2023-05-06'),
(3, 17, '3:42 am', '5:15 am', '12:16 pm', '4:03 pm', '7:17 pm', '8:43 pm', '2023-05-06'),
(4, 6, '3:41 am', '5:15 am', '12:15 pm', '4:03 pm', '7:16 pm', '8:43 pm', '2023-05-06'),
(5, 4, '3:43 am', '5:15 am', '12:14 pm', '4:00 pm', '7:13 pm', '8:38 pm', '2023-05-06'),
(6, 10, '3:52 am', '5:22 am', '12:16 pm', '3:59 pm', '7:10 pm', '8:33 pm', '2023-05-06'),
(7, 8, '3:42 am', '5:15 am', '12:15 pm', '4:03 pm', '7:16 pm', '8:43 pm', '2023-05-06'),
(8, 16, '3:43 am', '5:14 am', '12:12 pm', '3:58 pm', '7:10 pm', '8:35 pm', '2023-05-06'),
(9, 7, '4:49 am', '6:22 am', '1:28 pm', '5:17 pm', '8:33 pm', '10:00 pm', '2023-05-06'),
(10, 9, '3:41 am', '5:15 am', '12:17 pm', '4:05 pm', '7:19 pm', '8:46 pm', '2023-05-06'),
(11, 5, '3:46 am', '5:17 am', '12:16 pm', '4:02 pm', '7:15 pm', '8:39 pm', '2023-05-06'),
(12, 14, '4:00 am', '5:26 am', '12:21 pm', '4:03 pm', '7:15 pm', '8:36 pm', '2023-05-06'),
(13, 15, '3:50 am', '5:18 am', '12:21 pm', '4:08 pm', '7:25 pm', '8:47 pm', '2023-05-06'),
(14, 21, '3:51 am', '5:19 am', '12:18 pm', '4:03 pm', '7:18 pm', '8:40 pm', '2023-05-06'),
(15, 24, '3:43 am', '5:14 am', '12:16 pm', '4:02 pm', '7:17 pm', '8:42 pm', '2023-05-06'),
(16, 18, '3:53 am', '5:20 am', '12:14 pm', '3:56 pm', '7:09 pm', '8:30 pm', '2023-05-06'),
(17, 13, '3:53 am', '5:20 am', '12:21 pm', '4:06 pm', '7:22 pm', '8:43 pm', '2023-05-06'),
(18, 20, '3:41 am', '5:14 am', '12:13 pm', '4:00 pm', '7:13 pm', '8:40 pm', '2023-05-06'),
(19, 23, '4:00 am', '5:29 am', '12:24 pm', '4:07 pm', '7:19 pm', '8:41 pm', '2023-05-06'),
(20, 19, '3:43 am', '5:15 am', '12:13 pm', '3:59 pm', '7:11 pm', '8:37 pm', '2023-05-06'),
(21, 3, '3:41 am', '5:15 am', '12:15 pm', '4:03 pm', '7:17 pm', '8:43 pm', '2023-05-06'),
(22, 12, '3:48 am', '5:20 am', '12:21 pm', '4:08 pm', '7:23 pm', '8:48 pm', '2023-05-06'),
(23, 22, '3:54 am', '5:19 am', '12:14 pm', '3:56 pm', '7:10 pm', '8:29 pm', '2023-05-06'),
(24, 11, '3:56 am', '5:23 am', '12:21 pm', '4:05 pm', '7:19 pm', '8:40 pm', '2023-05-06');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`) VALUES
(1, 'admin', 'admin@admin.com', 'admin_admin', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `id_ville` int(11) NOT NULL,
  `nom_ville` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`id_ville`, `nom_ville`) VALUES
(1, 'siliana'),
(2, 'sfax'),
(3, 'tunis'),
(4, 'sousse'),
(5, 'Kairouan'),
(6, 'Ariana'),
(7, 'Béja'),
(8, 'Ben Arous'),
(9, 'Bizerte'),
(10, 'Gabès'),
(11, 'Gafsa'),
(12, 'Jendouba'),
(13, 'Kasserine'),
(14, 'Kébili'),
(15, 'Le Kef'),
(16, 'Mahdia'),
(17, 'Manouba'),
(18, 'Médenine'),
(19, 'Monastir'),
(20, 'Nabeul'),
(21, 'Sidi Bouzid'),
(22, 'Tataouine'),
(23, 'Tozeur'),
(24, 'Zaghouan');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id_events`),
  ADD KEY `id_ville` (`id_ville`);

--
-- Index pour la table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id_holiday`);

--
-- Index pour la table `mosques`
--
ALTER TABLE `mosques`
  ADD PRIMARY KEY (`id_mosque`),
  ADD KEY `id_ville` (`id_ville`);

--
-- Index pour la table `prayer_times`
--
ALTER TABLE `prayer_times`
  ADD PRIMARY KEY (`id_prayer_time`),
  ADD KEY `id_ville` (`id_ville`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`id_ville`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id_events` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id_holiday` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `mosques`
--
ALTER TABLE `mosques`
  MODIFY `id_mosque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `prayer_times`
--
ALTER TABLE `prayer_times`
  MODIFY `id_prayer_time` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ville`
--
ALTER TABLE `ville`
  MODIFY `id_ville` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`id_ville`) REFERENCES `ville` (`id_ville`);

--
-- Contraintes pour la table `mosques`
--
ALTER TABLE `mosques`
  ADD CONSTRAINT `mosques_ibfk_1` FOREIGN KEY (`id_ville`) REFERENCES `ville` (`id_ville`);

--
-- Contraintes pour la table `prayer_times`
--
ALTER TABLE `prayer_times`
  ADD CONSTRAINT `prayer_times_ibfk_1` FOREIGN KEY (`id_ville`) REFERENCES `ville` (`id_ville`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
