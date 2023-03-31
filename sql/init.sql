-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 03-03-2023 a las 21:03:48
-- Versión del servidor: 10.6.11-MariaDB-cll-lve
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u715380418_noglaxman`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Account`
--

CREATE TABLE `Account` (
  `clientID` int(11) NOT NULL,
  `account_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Client`
--

CREATE TABLE `Client` (
  `client_id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `pass` varchar(500) NOT NULL,
  `role` varchar(40) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Volcado de datos para la tabla `Client`
--

INSERT INTO `Client` (`client_id`, `dni`, `name`, `lastname`, `username`, `pass`, `role`) VALUES
(180, 43149328, 'Admin', 'Admin', 'AdminDevelopers', '$2a$10$OGgxX7q6vzsWzZE/vFCa5eg4kjutnFplou9WxGqZAzqt80AGhYjZu', 'admin'),
(200, 43681173, 'Gonzalo', 'Ozan', 'NOGLAXADMIN', 'Kart0E1o', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Summary`
--

CREATE TABLE `Summary` (
  `accountID` bigint(20) NOT NULL,
  `summary_id` int(11) NOT NULL,
  `summary_url` varchar(400) NOT NULL,
  `summary_date` date NOT NULL,
  `profit` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`account_id`),
  ADD KEY `clientID` (`clientID`);

--
-- Indices de la tabla `Client`
--
ALTER TABLE `Client`
  ADD PRIMARY KEY (`client_id`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `Summary`
--
ALTER TABLE `Summary`
  ADD PRIMARY KEY (`summary_id`),
  ADD KEY `accountID` (`accountID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Client`
--
ALTER TABLE `Client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;

--
-- AUTO_INCREMENT de la tabla `Summary`
--
ALTER TABLE `Summary`
  MODIFY `summary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Account`
--
ALTER TABLE `Account`
  ADD CONSTRAINT `Account_ibfk_1` FOREIGN KEY (`clientID`) REFERENCES `Client` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `Summary`
--
ALTER TABLE `Summary`
  ADD CONSTRAINT `Summary_ibfk_1` FOREIGN KEY (`accountID`) REFERENCES `Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
