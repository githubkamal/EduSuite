-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2025 at 01:17 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edusuite_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `batchs`
--

CREATE TABLE `batchs` (
  `BatchId` int(11) NOT NULL,
  `BatchName` varchar(15) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `ModifiedBy` int(50) DEFAULT NULL,
  `ModifiedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `batchs`
--

INSERT INTO `batchs` (`BatchId`, `BatchName`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
(1, '2022 - 2025', '2025-11-01 11:59:26', NULL, '2025-11-01 11:59:26');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `DepartmentId` int(11) NOT NULL,
  `DepartmentName` varchar(100) NOT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `ModifiedOn` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ModifiedBy` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`DepartmentId`, `DepartmentName`, `CreatedOn`, `ModifiedOn`, `ModifiedBy`) VALUES
(1, 'BSc CS', '2025-10-31 21:33:13', '2025-10-31 21:33:13', 1),
(2, 'BCA', '2025-10-31 21:33:13', '2025-10-31 21:33:13', 1),
(3, 'MSc CS', '2025-10-31 21:33:13', '2025-10-31 21:33:13', 1),
(4, 'MCA', '2025-10-31 21:33:13', '2025-10-31 21:33:13', 1);

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `Id` int(11) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `RoleId` int(11) NOT NULL,
  `IsActive` tinyint(1) NOT NULL DEFAULT 1,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `ModifiedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`Id`, `PasswordHash`, `Email`, `RoleId`, `IsActive`, `CreatedOn`, `ModifiedOn`) VALUES
(2, '3Sbdp9GoC5a/+U88S3yfTd7qdJ3MKUKJFFyIqm2EieI=', 'kamalzeus@gmail.com', 2, 1, '2025-10-31 16:44:45', '2025-10-31 16:44:45');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleId` int(11) NOT NULL,
  `RoleName` varchar(100) NOT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `ModifiedOn` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ModifiedBy` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleId`, `RoleName`, `CreatedOn`, `ModifiedOn`, `ModifiedBy`) VALUES
(1, 'Admin', '2025-10-31 21:30:31', '2025-10-31 21:30:31', 0),
(2, 'Staff', '2025-10-31 21:30:31', '2025-10-31 21:30:31', 0),
(3, 'Student', '2025-10-31 21:30:31', '2025-10-31 21:30:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `staffs`
--

CREATE TABLE `staffs` (
  `Id` int(11) NOT NULL,
  `LoginId` int(11) NOT NULL,
  `StaffCode` varchar(50) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `ModifiedBy` int(11) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `ModifiedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staffs`
--

INSERT INTO `staffs` (`Id`, `LoginId`, `StaffCode`, `FullName`, `DepartmentId`, `ModifiedBy`, `CreatedOn`, `ModifiedOn`) VALUES
(1, 2, 'BSC001', 'Kamal Vshal', 3, 0, '2025-10-31 16:44:58', '2025-10-31 16:44:58');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `Id` int(11) NOT NULL,
  `LoginId` int(11) NOT NULL,
  `RollNumber` varchar(50) NOT NULL,
  `FullName` varchar(150) NOT NULL,
  `DepartmentId` int(100) NOT NULL,
  `BatchId` int(50) NOT NULL,
  `ModifiedBy` int(11) DEFAULT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT current_timestamp(),
  `ModifiedOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`Id`, `LoginId`, `RollNumber`, `FullName`, `DepartmentId`, `BatchId`, `ModifiedBy`, `CreatedOn`, `ModifiedOn`) VALUES
(1, 2, 'BSC001', 'Kamal Vshal', 1, 1, NULL, '2025-11-01 15:37:55', '2025-11-01 15:37:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `batchs`
--
ALTER TABLE `batchs`
  ADD PRIMARY KEY (`BatchId`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`DepartmentId`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleId`);

--
-- Indexes for table `staffs`
--
ALTER TABLE `staffs`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LoginId` (`LoginId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `LoginId` (`LoginId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `batchs`
--
ALTER TABLE `batchs`
  MODIFY `BatchId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `DepartmentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `staffs`
--
ALTER TABLE `staffs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `staffs`
--
ALTER TABLE `staffs`
  ADD CONSTRAINT `FK_Staff_Login` FOREIGN KEY (`LoginId`) REFERENCES `logins` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `FK_Student_Login` FOREIGN KEY (`LoginId`) REFERENCES `logins` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
