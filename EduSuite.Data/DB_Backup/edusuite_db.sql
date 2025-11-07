-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2025 at 05:43 PM
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
-- Table structure for table `alumnis`
--

CREATE TABLE `alumnis` (
  `AlumniId` int(11) NOT NULL,
  `DepartmentId` int(11) NOT NULL,
  `BatchId` int(11) NOT NULL,
  `Name` varchar(200) DEFAULT NULL,
  `RegNo` varchar(50) DEFAULT NULL,
  `MccEmail` varchar(200) DEFAULT NULL,
  `NameFromForm` varchar(200) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `PersonalEmail` varchar(200) DEFAULT NULL,
  `ReligionCommunity` varchar(200) DEFAULT NULL,
  `Nationality` varchar(100) DEFAULT NULL,
  `AadharNo` varchar(20) DEFAULT NULL,
  `BloodGroup` varchar(10) DEFAULT NULL,
  `MobileNumber` varchar(20) DEFAULT NULL,
  `SslcSchool` varchar(200) DEFAULT NULL,
  `SslcMarks` varchar(50) DEFAULT NULL,
  `SslcPercentage` varchar(10) DEFAULT NULL,
  `SslcAchievements` text DEFAULT NULL,
  `ModeOfConveyance` varchar(100) DEFAULT NULL,
  `HallNameRoom` varchar(200) DEFAULT NULL,
  `LocalGuardianName` varchar(200) DEFAULT NULL,
  `LocalGuardianPhone` varchar(20) DEFAULT NULL,
  `Hobbies` text DEFAULT NULL,
  `ExtraCurricularInterests` text DEFAULT NULL,
  `SocialFacebook` varchar(200) DEFAULT NULL,
  `SocialInstagram` varchar(200) DEFAULT NULL,
  `SocialTwitter` varchar(200) DEFAULT NULL,
  `LanguagesKnown` text DEFAULT NULL,
  `InterestedInPartTimeJob` varchar(5) DEFAULT NULL,
  `SpecialHealthComplaint` text DEFAULT NULL,
  `PhysicalDisability` text DEFAULT NULL,
  `EmergencyPhone` varchar(20) DEFAULT NULL,
  `DateOfSignature` date DEFAULT NULL,
  `ParentGuardianSignature` varchar(200) DEFAULT NULL,
  `CreatedBy` int(11) DEFAULT NULL,
  `CreatedOn` datetime DEFAULT current_timestamp(),
  `ModifiedOn` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ModifiedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumnis`
--

INSERT INTO `alumnis` (`AlumniId`, `DepartmentId`, `BatchId`, `Name`, `RegNo`, `MccEmail`, `NameFromForm`, `DateOfBirth`, `PersonalEmail`, `ReligionCommunity`, `Nationality`, `AadharNo`, `BloodGroup`, `MobileNumber`, `SslcSchool`, `SslcMarks`, `SslcPercentage`, `SslcAchievements`, `ModeOfConveyance`, `HallNameRoom`, `LocalGuardianName`, `LocalGuardianPhone`, `Hobbies`, `ExtraCurricularInterests`, `SocialFacebook`, `SocialInstagram`, `SocialTwitter`, `LanguagesKnown`, `InterestedInPartTimeJob`, `SpecialHealthComplaint`, `PhysicalDisability`, `EmergencyPhone`, `DateOfSignature`, `ParentGuardianSignature`, `CreatedBy`, `CreatedOn`, `ModifiedOn`, `ModifiedBy`) VALUES
(1, 1, 1, 'DIVYA C', '2201721058001', '2201721058001@mcc.edu.in', 'C. Divya', '2003-11-01', 'Codivya2003@gmail.com', 'Hindu, Sc', 'Indian', '328111139244', 'B+ve', '1305125574', 'Sivanthi Modric Hr. Sec. Schood', '395', '78%', '', 'Bus.', '', 'Vishnu.', '8309022195', 'Drawing', 'Dance.', 'TRUE', 'FALSE', 'FALSE', 'Tamil', '', 'No', 'No', '8681805969', '2022-09-23', 'C. ALAMELU', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(2, 1, 1, 'SHRI HARINI B', '2201721058002', '2201721058002@mcc.edu.in', 'SHRI HARINI B', '2000-10-03', 'shri13anitha@gmail.com', 'Hindu - Sengunthar (BC)', 'Indian', '6309 2153 6265', 'B+', '9042363654', 'SREE VATSA VISWANATHAN VIVEKANANDA VIDYALAYA', '9.4/10.0', '94%', '', 'Train.', '', '', '', 'Novel reading, painting.', '', 'FALSE', 'TRUE', 'FALSE', 'Tomil, English', '', '', 'None', '9840209209/944465484', NULL, 'B. Mahalak', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(3, 1, 1, 'SWEETY SHALO S', '2201721058003', '2201721058003@mcc.edu.in', 'Sweety Shalo', '2004-02-05', 'Sweety shato0205@gmail.com / celinesweety02@gmail', 'HINDU / YADAVA', 'INDIAN', '8140 9655 4199', 'B+ve', '6369725969', 'New Punce Mat Hr Sec', '351', '70.1.%', '', 'Traum', '', '', '', '', 'Dance', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', '', '', '', '7904680259 638189745', '2022-09-23', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(4, 1, 1, 'VENUS SERINA D', '2201721058004', '2201721058004@mcc.edu.in', 'D.Venus Serina.', '2004-06-23', 'Venusserina@gmail.com', 'Christian', 'Indian', '918551040339', 'A+ve', '6383846985', 'Shanthosh vidyalaya mabric.hr. Sec school', '492/500', '98.40%', '', 'Bus.', '', '', '', 'Singing Cooking', '', 'FALSE', 'TRUE', 'TRUE', 'Tamil, English.', 'NO', '', '', '9025265279, 74487187', '2022-09-23', 'S. Davy ce', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(5, 1, 1, 'THARANI', '2201721058005', '2201721058005@mcc.edu.in', 'S. THARANI', '2005-10-03', 'Tharuma4448@gmail.com', 'BC (YAADAVAR) HINDU', 'INDIAN', '98090 8247 8536', 'B+', '893951317O', 'THE NATIONAL IT INT. MAT. HR-SEC SCHOOL', '408/500', '81.00%', '', '', '', '', '', 'weiting', 'Badmetton', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English, Hindi', '', '', '', '9840373584,909283799', NULL, 'S. Valti', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(6, 1, 1, 'VISHALI M', '2201721058006', '2201721058006@mcc.edu.in', 'M VISHALI', '2005-02-17', 'bhuvaneswarimurati79@gmail.com / mvishalivishali@gmail.com', 'Hinduism Bc', 'INDIAN', '9008 6498 9315', 'A+ve', '9710745157 / 8668003', 'Neelan Matric. Hrsec School', '399', '79.80%', '', 'Train', '', '', '', 'Dance, Art Works.', 'No', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', 'No', 'No', 'NO', '9710745157, 98412442', '2022-09-23', 'G.M', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(7, 1, 1, 'ABDUL HABIB KHAN', '2201721058007', '2201721058007@mcc.edu.in', 'ABDUL HABIB KHAN', '2004-11-30', 'Khan the great 4@gmail.com', 'Muslim', 'INDIAN.', '6181 83858554', 'O+ve', '9150542290', 'Kendriya Vidyalaya No.1', '373', '74.60%', '', 'Bus', '', '', '', 'FOOTBALL VOLLYBALL', '', 'TRUE', 'TRUE', 'FALSE', 'ENGLISH, HINDI', '', '', '', '8925750829. 70865716', '2022-09-26', 'fna', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(8, 1, 1, 'AMARNATH SR', '2201721058008', '2201721058008@mcc.edu.in', 'Amarnath SR', '2004-05-11', 'emanathstores2001@gmall.com / umarrajisaju2004@gmail.com', 'Hindu, General, Nair', 'Indian', '5685 85453154', 'AB+ve', '7994600942', 'Kendriya vidyalaya Adooo', '334', '66.80%', '', '', 'St, Thomas\'s hall', 'Mubarak. M.M.', '9746927476', '', '', 'TRUE', 'TRUE', 'TRUE', 'Malayalam, Hindi, English', '', 'N', 'No', '948697496, 940029046', '2022-09-26', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(9, 1, 1, 'ANAND MA', '2201721058009', '2201721058009@mcc.edu.in', 'ANAND.MA', '2004-02-26', 'anandmenokkil04@gmail.com', 'Hindu', 'lodiaA', '7356 9301 7249', 'A+', '7025766554', 'M.A.M.H.S, Koookky, Thrissur', '', '85%', '', '', 'aberinss/John.k', 'K.M. THULASI DASS', '9150202088/860657549', 'Listening Songs, Criettet', 'Cricket', 'FALSE', 'TRUE', 'FALSE', 'Malayalam, English, Hindi', '', '', '', '9447319569', '2022-09-28', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(10, 1, 1, 'ARAVINDH K', '2201721058010', '2201721058010@mcc.edu.in', 'ARAVINDH.K', NULL, 'aravindhk0405@gmail.cor', 'HINDU & BC-SENGUNTHAR', 'INDIAN', '6552 83807619', 'A1+VE', '7695886601', 'PACHAIYAPPAS HR. SEC. SCHOOL', '315/500', '63%', '', 'Train, bus', '', '', '9994585143', 'CRICKET.', '', 'FALSE', 'TRUE', 'FALSE', 'TAMIL, ENGLISH', 'NO', 'NO', 'NO', '9994585143/892545389', NULL, 'K. Aravind', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(11, 1, 1, 'ASHWIN K', '2201721058011', '2201721058011@mcc.edu.in', 'K.ASHWIN', '2004-06-12', 'ashwinmaccundas@gmail.com / ashwinK6124@gmail.com', 'HINDU, MBC', 'INDIAN', '4647 0534 7276', 'O+ve', '9790904553', 'St. John\'s Mat.hr. Sec.school', '461/500', '92.20%', '', 'TRAIN', '', '', '', '', '', 'FALSE', 'TRUE', 'FALSE', '', '', '', '', '9941436672,801519213', NULL, '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(12, 1, 1, 'D SARVESH', '2201721058012', '2201721058012@mcc.edu.in', 'Sarvesh. D', '2004-04-25', 'SARVESHOFFI@gmail.com', 'Hindu OBC', 'Indian', '2540 7407 9864', 'tke', '9150540069', 'Boaz Public School', '360/500', '70%', '', 'BUS', '', '', '', 'Gaming, Fitness', 'Fitness and outdoor games', 'TRUE', 'TRUE', 'TRUE', 'Tamil, Hindi, English and French', '', 'Barcel', '', '8939744277/893974437', '2022-09-23', 'D. Sankari', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(13, 1, 1, 'DILLI BABU L', '2201721058013', '2201721058013@mcc.edu.in', 'L. DILLI BABU', '2005-01-26', 'dilli2764@gmail.com', 'BC', 'Indian', '9459 8030 3452', 'o+t', '9952831818', 'ANDERSON HR SEC', '274', '54.80%', '', 'Train', '', '', '', 'BADMINTION Player, GYM', 'Sports', 'TRUE', 'TRUE', 'TRUE', 'Tamil, English', 'NO', '', '', '9500318023, 98941480', NULL, 'N.Loganathan.', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(14, 1, 1, 'DINESH CHETRI', '2201721058014', '2201721058014@mcc.edu.in', 'DINESH CHETRI', '2002-10-20', 'mrmalchetri666@gmail.com', 'HINDU & OBC', 'INDIAN', '', 'A+ve', '7426856066', 'KENDRIYA VIDYALAYA', '434/500', '86.80%', 'HINDI, SCIENCE', 'Self', '', '', '', '', 'DANCING, POETRY WRITER', 'TRUE', 'TRUE', 'TRUE', 'English, Hindi, Nepali', 'NO', 'No', 'No', '7426856066', '2022-06-10', 'B.maya', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(15, 1, 1, 'IBIN J', '2201721058016', '2201721058016@mcc.edu.in', 'JIBIN', NULL, 'ibini1661@gmail.com', 'Hindu BC', 'Indian', '8216 5455 9296', 'B+', '7200345590', 'SDMS Jain vidhylaya Mitriclation schoole', '306/500', '62%', '', 'By walk', '', '', '', 'niket', '', 'TRUE', 'FALSE', 'FALSE', 'Tamil, English', '', '', '', '9176112275, 96779428', NULL, 'செ. ஜெயக்கும', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(16, 1, 1, 'JABEZ RICHMOND PHILIP B', '2201721058017', '2201721058017@mcc.edu.in', 'B.JABEZ RICHMOND PHILIP', '2004-03-08', 'JabeyRichmond@gmail.com', 'CHRISTIAN NADAR', 'INDIAN', '245) 9807 8774', 'B+ve', '9043533748', 'ICF SILVER JUBILEE', '348', '69.60%', 'WiL', '', '', '', '', 'Video-games, guitard guitar', '', 'FALSE', 'TRUE', 'TRUE', 'ENG/TAMIL', '', 'NIL', 'NIL', '9841033748 / 9841520', '2022-09-27', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(17, 1, 1, 'JANANANTH B', '2201721058018', '2201721058018@mcc.edu.in', 'B. JANANANTH.', NULL, 'Jeeva bala 236@gmail.com.', 'Hindu (Sc).', 'Indian.', '7677 6868 2630.', 'A+ve.', '7550200459', 'St. Joseph mat Hr S Spe School.', '284', '56.80%', '', 'By Bus.', '', '', '', 'Watching movies.', '-', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', 'No.', '', '', '9790000016 979000004', NULL, '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(18, 1, 1, 'KISHORKUMAR S', '2201721058019', '2201721058019@mcc.edu.in', 'KISHORKUMAR S', '2002-11-11', 'Kishorkumarı', 'HINDUE BC', 'INDIAN', '8717 1286 7087', '+he', '4092970125 / 9345643', 'Sri Sampawna vidyalayım', '405/500', '81%-', '', 'TRAIN', '', '', '', '', 'BATMITION, CRICKET, DRAWING.', 'FALSE', 'TRUE', 'FALSE', 'TAMIL / ENGLISH', '', '', '', '8015271193/98426117 ', '2022-09-27', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(19, 1, 1, 'KOWCHIK MUGAM S', '2201721058020', '2201721058020@mcc.edu.in', '5. Kowchik Mugame', NULL, 'KowchikMugam98420@gmail.com', 'Hindu & SCA', 'Indian', '5609 6566 4832', 'B+ Ve', '9566340042', 'T.M.H.N. U. Vid. MATIC Hr. Sec. Schl', '212', '54.40%', '', 'outbus', '', 'P. Veera Raja', '9940416938', 'Dance, Editing', 'Sports', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', 'Yes', 'NO', 'WO', '9940416938, 99400213', NULL, 'v. vijayalakshni', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(20, 1, 1, 'KUMARAN B', '2201721058021', '2201721058021@mcc.edu.in', 'KUMARAN. B', NULL, 'kumaran18112004@gmail.com', 'HINDHU-BC', 'INDIAN', '5966 5472 6743', 'O+ve', '6380307296', 'M.L.M MAHALLAN MAT HR.Sec SCHOOL', '405/500', '81%', '', 'TRAIN', '', '', '', 'EDITING, GAMING', 'PAINTING, DRAWING', 'FALSE', 'TRUE', 'FALSE', 'TAMIL, ENGLISH', 'NO', '', '', '9790442144, 95664665', '2022-09-26', 'B. Dexi', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(21, 1, 1, 'LOGESH VINAYAK V', '2201721058022', '2201721058022@mcc.edu.in', 'V. Logesh Vinayak', '2002-08-11', 'Lokimas108112003@gmail.com', 'Hinduism & Virakodi Vellalar', 'Indian', '5964 4721 1525', 'O+t', '9840616414', 'V.G.P Philominal', '393/500', '78.7.%', '', 'Bus', '', '', '', 'Playing Cricket, Hearing Music, Reading', 'Interest in music like Guitar, Keyb wterest', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English, Hindi', 'No', '', '', '9940519400, 93614739', '2022-09-27', 'Rajssly', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(22, 1, 1, 'M ABIJITH', '2201721058023', '2201721058023@mcc.edu.in', 'M. ABHIJITH', NULL, 'abhijithaj188@gmail.com', 'HINDU & SC', 'INDIAN', '425 80420758', 'B+ve', '9384173475', 'KENDRIYA VIDYALAYA No2 JALAHALLI EAST BANGALORE', '269', '53.80%', '', '', 'BISHOP HEBER HALL RO No 41', '', '', 'CHESS, Collcting old coins & no tog Rummu', 'football', 'TRUE', 'TRUE', 'FALSE', 'HINDI,TAMIL,ENGLISH, KANADA', '', 'Nil', 'Nil', 'Nil', NULL, 'Rajeenal', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(23, 1, 1, 'MOHAMMED ASLAH K', '2201721058024', '2201721058024@mcc.edu.in', 'MOHAMMED ASLAH-K', '2000-12-05', 'aslakkochu84@gmail.com', 'Muslim.', 'Indicus', '2618 0912 1967', 'B+Ve', '9567884372', 'NIBRAS SECONDARY SCHOOL', '', '', '', '', '', 'HASHIMIK', '9744988887', 'Hearing Music', '', 'TRUE', 'TRUE', 'FALSE', 'English, Malayalam,', 'NO', '', '', '9445115047, 95678843', '2022-09-26', 'Hass', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(24, 1, 1, 'MOHAMMED SAMROOD', '2201721058025', '2201721058025@mcc.edu.in', 'M Samrood', NULL, 'Smrodadam@gmail.com / smroodadam@gmasl.10m', 'Muslim OBL', 'Indian', '3203 99206457', 'B+', '9048376099', 'P.P.M.H.S.S Kattukkανα', '', '', '', '', '', 'HASHIM', '974493 8887', '', '', 'FALSE', 'FALSE', 'FALSE', '', '', '', '', '9249375667', '2022-10-01', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(25, 1, 1, 'MOHAN KUMAR M N', '2201721058026', '2201721058026@mcc.edu.in', 'MOHAN KUMAR.MN', '2005-03-24', 'Saravana chinna@gmail.com', 'Hindu & Jangam', 'Indian', '4830 7933 8366', 'O+', '8072324908', 'Holy cross mat. Hr. sec. School', '303', '62.10%', '', 'evening stream.', '', '', '', 'cricket', 'chet', 'FALSE', 'TRUE', 'FALSE', 'Tamil, Telugu. English', '', 'NA', 'NA', '9786541532', '2022-09-10', 'mm', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(26, 1, 1, 'NIHAL A', '2201721058027', '2201721058027@mcc.edu.in', 'Nihal A', '2004-06-05', 'nihalvmb06@gmail.com', 'Hindu OC', 'Indian', '5816 2385 5430', 'O (Negativ', '93609 41432', 'BVM Global', '310', '62%', '', 'Train', '', '', '', '', '', 'FALSE', 'FALSE', 'FALSE', 'English, Tamil, Malayalam', 'Yes', 'NO', 'NO', '9360941432, 99627788', '2023-02-22', 'Deep', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(27, 1, 1, 'NISSIRAJ S', '2201721058028', '2201721058028@mcc.edu.in', 'S. NISSI RAJ', '2004-07-23', 'nissiraj18@gmail.COM', 'Christian BC', 'INDIAN', '7702 9035 6690', 'A-ve', '9150551957', 'KENDRIYA VIDYALAYA', '313/500', '62.60%', '', 'Bus and Train', '', '', '', 'Playing Football', '', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English and Hindi', 'NO', '', '', '9884624751, 98408583', '2022-09-23', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(28, 1, 1, 'NITIN COLLINS C D', '2201721058029', '2201721058029@mcc.edu.in', 'NITIN COLLINS.C.D.', NULL, 'Collinsnitin4@gmail.com', 'CHRISTIAN (B-C)', 'INDIAN', '778354465662', 'A+ve', '7358667852', 'SMT DURGADEVI VIDYALAYA CHENNAI-82', '324/500', '64.8', 'NIL', 'Train', '-', '', '', 'Writing scripts, watching movies', 'Cricket', 'TRUE', 'TRUE', 'FALSE', 'Tamil, English, hindi', '', 'NIL', 'NIL', '6385128643/984033954', NULL, 'D. Charles', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(29, 1, 1, 'P SIDDHI SHAKTI', '2201721058030', '2201721058030@mcc.edu.in', 'P SIDDHI SHAKTI', '2005-09-03', '87DSID9325@GMAIL.COM / iddhishakti31@gmail.com', 'HINDU, MBC', 'INDIAN', '956287133608', 'O+ve', '8122280352', 'Kendriya Vidyalaya No.1', '406/500', '81.2', '', 'BUS', 'No', '', '', 'Fitness, Music, Deconstructing movies', 'football', 'TRUE', 'TRUE', 'TRUE', 'ENGLISH HINDI TAMIL', 'NO', 'NONE', 'NONE', '86673 914 98 81482 7', '2022-09-22', 'S. Sumathi (MOTHER)', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(30, 1, 1, 'RAGUL RANITH S', '2201721058031', '2201721058031@mcc.edu.in', 'RAGUL RANITH S', '2004-07-24', 'Danithragill @gmail.com', 'Hindu MBC', 'Indian', '70326579 7277', 'O+Ve', '9342624584', 'V.O.C MTR HR SEC SCHOOL', '399', '79', '', '', '', '', '', '', 'Drawings', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', '', '', '', '3428047440/956626179', '2022-10-18', 'Shanthakaman', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(31, 1, 1, 'RAGUL RATHESH S', '2201721058032', '2201721058032@mcc.edu.in', 'RAGUL RATHESH.S', '2004-07-24', 'ragulrathesh815@gmail.com', 'HINDU MBC', 'ANDIAN', '8950 0502 0197', 'O+ve', '6379526461', 'V.D.C MTR HR SEC SCHOOL', '428', '85.6', '', '', '', '', '', '', 'Paintings', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', '', '', '', '8428047440/956626179', NULL, 'Shantha Kaman', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(32, 1, 1, 'SAMUEL ABISHEK RAJ M', '2201721058033', '2201721058033@mcc.edu.in', 'SAMUEL ABISHEK RAJ-M', NULL, 'Samuelabishek24', 'CHRISTIAN B.C.', 'INDIAN', '431885033047', 'A+ve', '8939275333', 'Saviour Matric School', '374', '74.80%', '', 'PUBLIC TRANSPORT, TRA', '', '', '', 'PLAYING KEYBOARD., PADet', '', 'FALSE', 'FALSE', 'FALSE', 'ENGLISH, TAMIL', '', '-NO', 'NO-', '9444475344, 98404094', '2025-11-05', 'S. Victoria', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(33, 1, 1, 'SANJAI SK', '2201721058034', '2201721058034@mcc.edu.in', 'S.K.SANJAI', '2004-09-29', 'sankes.sk299@gmail.com', 'Hindu MBC', 'Indian', '2464 7631 0466', 'O+ positiv', '9363564711', 'Annai Violet Matriculation Higher Secondary School', '231/500', '46.20%', '', '', '', '', '', '', '', 'FALSE', 'TRUE', 'FALSE', 'English, Tamil', 'Yes', 'No', 'No', '8754470058/790408288', '2022-10-18', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(34, 1, 1, 'SANJAY N', '2201721058035', '2201721058035@mcc.edu.in', 'SANJAY.N', '2001-09-14', 'sanjay sumithra 2004@gmail.com', 'HINDU & SC', 'ANDIAN', '404986834235', 'AR+ve', '730510 6523', 'GMHSS SOMANGALAM', '330', '66%', '', '', '', '', '', 'photography', '', 'FALSE', 'TRUE', 'FALSE', 'TAMIL', '', '', '', '8148741330', NULL, '2.நாகப்பன்.', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(35, 1, 1, 'SANTHOSH RAJ R', '2201721058036', '2201721058036@mcc.edu.in', 'R. Santhosh Raj', '2005-06-05', 'Sr841369@gmail.com', 'Hindu, MBC', 'Fridian', '2547 0200 9725', 'o+ve', '8248 617 404', 'Royal Marticulation Schad', '299', '59.8', '', 'Bike', 'NO', '', '', 'Gym workout', 'Cricket', 'TRUE', 'TRUE', 'FALSE', 'Tamil, English', '', 'No', 'NO', '9884054518 790486471', '2022-09-24', 'Rep', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(36, 1, 1, 'SATHEESH K', '2201721058037', '2201721058037@mcc.edu.in', 'K. SATHEESH', '2004-09-07', 'Sathishkumaran3537@gmail.com', 'Hindu (MBC)', 'Indian', '8736 4558 8655', 'B+ve', '6374904885', 'V. O.C Matric And Hr Sec Schoo1', '371/500', '74.20%', '', '', '', '', '', 'DRAWING, DANCING', '', 'FALSE', 'TRUE', 'FALSE', 'TAMIL / ENGLISH', '', '', '', '994024 7791 / 883841', '2022-09-28', 'K.சாவித்தல்', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(37, 1, 1, 'SATHYANARAYANAN N', '2201721058038', '2201721058038@mcc.edu.in', 'N. Sathya Narayanan.', '2003-10-09', 'Knsathyanarayanan2003@gmail.com', 'Hindu (SC)', 'Indian', '7041 2341 7889', 'B+h', '9677161528', 'St Joseph\'s HR Sec School CPT', '289', '57.80%', '', 'by bike', '', '', '', 'cricketer.', '', 'FALSE', 'TRUE', 'FALSE', '', 'No.', '', '', '9677161528, 89406713', '2022-09-23', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(38, 1, 1, 'SIMON ANANDAN', '2201721058039', '2201721058039@mcc.edu.in', 'SIMON ANANDAN', '2001-09-08', 'SIMONANANDAN@OUTLOOK.COM', 'CHRISTIAN, NATHAMAR', 'INDIAN', '9651 0096 6527', '', '6381773350', 'M.CC, Hr, Sec, chetret', '421/500', '84.20%', '', 'Bus lauto', '', '', '', 'Reading & Contemplatky Epistemology, fallowy t', 'startup tech', 'TRUE', 'TRUE', 'TRUE', 'Engesh, Tamil', '', '', '', '9791055304, 87786008', '2023-02-16', 'Amandan', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(39, 1, 1, 'SOORYA R', '2201721058040', '2201721058040@mcc.edu.in', 'R. SOORYA', '2004-10-25', 'Soonyarajajiply@gmail.com', 'Hindu Vanniar (MBC)', 'Indian', '2677 7374 5750', 'A-', '7010706212', 'Petit Seminaire HR SEC School, PUDUCHERRY', '361/500', '72.20%', '', 'Day Scholar', '', 'D. Nalini', '9841660653', 'Read newspaper', 'Badminton', 'FALSE', 'TRUE', 'FALSE', 'Tamil, English', '', '', '', '7358823500, 93676016', NULL, 'D. Nalini', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(40, 1, 1, 'SRIKANTH K', '2201721058041', '2201721058041@mcc.edu.in', 'K. SRIKANTH', '2002-11-16', 'Sririosav@gmail.com', 'Hindu', 'Indian', '899318766182', 'O+ve', '6380728985', 'ZION MATRICULATION HIGHER SECONDARY SCHOOL', '305', '61%', '', '', '-', '', '', 'Going To Gym, Training Boxing', 'Boxing', 'FALSE', 'TRUE', 'FALSE', 'TAMIL, ENGLISH', 'YES', '', '', '9941229412, 89252856', '2022-09-23', 'Ms.Km', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(41, 1, 1, 'Surya Prakash Rajpurohit V', '2201721058042', '2201721058042@mcc.edu.in', 'Surya Prakash Rajpurohit. V', '2005-06-27', 'Surya pra', 'hindu (oc)', 'Indian', '', 'A++ve', '7094289498', 'Alwin Hemaid publicl', '405/500', '81%.', '', '', '', '', '', 'Outdoor pontoon (cricket football)', '', 'FALSE', 'TRUE', 'FALSE', '4', '', '', '', '9380119380, 91501708', NULL, '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(42, 1, 1, 'T HARJITH ROY', '2201721058043', '2201721058043@mcc.edu.in', 'T. Harjith Roy', NULL, 'tharjithroy@gmail.com', 'christian BC', 'Indian', '8041 8000 5923', 'B+ve', '8667542712', 'S.B.O.A School and junior College', '362/500', '72%', '', 'car', '', '', '', 'Music Keyboard', 'Athletics', 'TRUE', 'TRUE', 'FALSE', 'Tamil. English', 'No', '', '', '9940631945, 94459038', NULL, 'Jasmine Rose', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(43, 1, 1, 'VASANTH B', '2201721058044', '2201721058044@mcc.edu.in', 'B. VASANTH', NULL, 'Vasanth,Vasa 21012005@gmail,com', 'MBC Vanniyar', 'Indian', '3882 2541 4602', 'O+', '9884730157', 'St. Joseph Hrisec school', '291', '58.20%', '', 'Bytrain', '', '', '', 'Cricketer', '', 'FALSE', 'TRUE', 'FALSE', 'Tamil', 'NO', '', '', '9566627446, 94442760', '2022-09-23', '', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(44, 1, 1, 'VIGNESH B', '2201721058045', '2201721058045@mcc.edu.in', 'B. VIGNESH', '2004-10-22', 'Vignesh ganesh 8021@gmail.com', 'Hindu & OBC', 'INDIAN', '695276297482', 'B+ve', '9123552469', 'Zion. Matric. Hr. Sec. School', '352/500', '70%', '', 'MTC BUS or Auto', '', '', '', '', 'Cricket', 'TRUE', 'TRUE', 'TRUE', 'Hindi, English, Tamil', 'yes', '', '', '8637417215/936077041', '2022-09-23', 'B. Babull', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL),
(45, 1, 1, 'PRIYA DHARSHENI R', '2201721058047', '2201721058047@mcc.edu.in', 'R. Priya Dharsheni', '2005-05-19', 'Usharevatny&@gmail.com', 'Hindu MBC', 'Indian', '4779 74964001', 'B+ve', '9884633984', 'Model. Mat. Hr. Sec. School', '242', '48.4', '', 'Train', '', '', '', 'Reading books', 'Painting', 'FALSE', 'TRUE', 'FALSE', 'Three', 'Yes', '', '', '7397400846, 99622777', NULL, 'R.', NULL, '2025-11-05 22:42:57', '2025-11-05 22:43:32', NULL);

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
-- Indexes for table `alumnis`
--
ALTER TABLE `alumnis`
  ADD PRIMARY KEY (`AlumniId`),
  ADD UNIQUE KEY `uq_reg_no` (`RegNo`),
  ADD UNIQUE KEY `uq_mcc_email` (`MccEmail`),
  ADD KEY `idx_reg_no` (`RegNo`),
  ADD KEY `idx_mcc_email` (`MccEmail`),
  ADD KEY `idx_personal_email` (`PersonalEmail`),
  ADD KEY `fk_alumni_department` (`DepartmentId`),
  ADD KEY `fk_alumni_batch` (`BatchId`);

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
-- AUTO_INCREMENT for table `alumnis`
--
ALTER TABLE `alumnis`
  MODIFY `AlumniId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
-- Constraints for table `alumnis`
--
ALTER TABLE `alumnis`
  ADD CONSTRAINT `fk_alumni_batch` FOREIGN KEY (`BatchId`) REFERENCES `batchs` (`BatchId`),
  ADD CONSTRAINT `fk_alumni_department` FOREIGN KEY (`DepartmentId`) REFERENCES `departments` (`DepartmentId`);

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
