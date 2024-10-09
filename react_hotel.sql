-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2024 at 08:11 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(500) NOT NULL,
  `status` enum('active','inactive','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `username`, `password`, `status`) VALUES
(3, 'sagorwdpf@gmail.com', 'sagor', '$2y$10$aiXWfyBAvF71nU9YL2GBw.e1acsraz.qeoZjfKynbEpRy.W2PjnvS', 'active'),
(5, 'sagor@gmail.com', 'sagor', '$2y$10$DDhghYmQHHvGwV2AMQjEPe0hyZrQ/IA7mU.Vf2LWoS6AXkcHN372e', 'active'),
(6, 'sagor@gmail.com', 'sagor', '$2y$10$Ixo1nSgHL9b/zzolhp.Xg.0yfCLhft8C626VjEA.LRhrB/pW5XNqW', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `cnic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `persons` int(11) NOT NULL,
  `roomType` varchar(50) NOT NULL,
  `startDate` varchar(50) NOT NULL DEFAULT current_timestamp(),
  `endDate` varchar(50) NOT NULL DEFAULT current_timestamp(),
  `totalPrice` decimal(10,2) NOT NULL,
  `days` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `status` enum('Pending','Booked','','') NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `name`, `address`, `cnic`, `email`, `phone`, `persons`, `roomType`, `startDate`, `endDate`, `totalPrice`, `days`, `capacity`, `status`) VALUES
(7, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'dd', 'sagorwdpf@gmail.com', '+880156839308', 1, 'single', '9/26/2024', '9/28/2024', '2400.00', 2, 1, 'Pending'),
(9, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'ghgfj', 'sagorwdpf@gmail.com', '+880156839308', 1, 'single', '9/21/2024', '9/26/2024', '5000.00', 5, 1, 'Pending'),
(13, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'w', 'sagorwdpf@gmail.com', '+880156839308', 2, 'presidential', '9/14/2024', '9/15/2024', '2500.00', 1, 7, 'Booked'),
(14, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'df', 'sagorwdpf@gmail.com', '+880156839308', 1, 'presidential', '9/14/2024', '9/15/2024', '2500.00', 1, 7, 'Pending'),
(15, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'ghgfj', 'sagorwdpf@gmail.com', '+880156839308', 1, 'presidential', '2024-09-14', '2024-09-15', '2500.00', 1, 7, 'Booked'),
(16, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'sd', 'sagorwdpf@gmail.com', '+880156839308', 1, 'single', '9/14/2024', '9/15/2024', '2000.00', 2, 1, 'Booked'),
(17, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'fhg', 'sagorwdpf@gmail.com', '+880156839308', 2, 'double', '9/15/2024', '9/16/2024', '2000.00', 1, 2, 'Booked'),
(18, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'ghgfj', 'sagorwdpf@gmail.com', '+880156839308', 2, 'presidential', '9/15/2024', '9/16/2024', '2500.00', 1, 7, 'Pending'),
(20, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'dsfgfdg', 'sagorwdpf@gmail.com', '+880156839308', 1, 'presidential', '9/15/2024', '9/16/2024', '2500.00', 1, 7, 'Pending'),
(22, 'sagor ddd', 'Khilgaon,Dhaka-1219', 'dd', 'sagorwdpf@gmail.com', '+880156839308', 1, 'single', '9/21/2024', '9/24/2024', '3600.00', 3, 1, 'Booked');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('unread','read') DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `status`, `created_at`) VALUES
(1, 'Family', 'The Presidential Suite consists of two bedrooms with individual bathrooms, a spacious living area with a work desk and a fully equipped kitchenette. The size of this generous suite is 1136 square feet (105.54 square meters). All the windows are facing Gulshan Lake.', 'unread', '2024-09-12 20:08:47'),
(2, 'Single', 'The Presidential Suite consists of two bedrooms with individual bathrooms, a spacious living area with a work desk and a fully equipped kitchenette. The size of this generous suite is 1136 square feet (105.54 square meters). All the windows are facing Gulshan Lake.', 'unread', '2024-09-12 21:13:30'),
(3, 'Presidential', 'The Presidential Suite consists of two bedrooms with individual bathrooms, a spacious living area with a work desk and a fully equipped kitchenette. The size of this generous suite is 1136 square feet (105.54 square meters). All the windows are facing Gulshan Lake.', 'unread', '2024-09-12 22:41:56'),
(4, 'Double', 'Booking the right hotel room can make or break a vacation. But given the number of different hotel room types available, the booking process can often be confusing, whether you’re an avid traveler or booking your first trip. What is a double room in a hotel? What is a standard hotel room and how is it different from a deluxe room? What is a mini suite vs. a full suite, and which is best suited for families?', 'unread', '2024-09-12 22:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','','') NOT NULL DEFAULT 'unread',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `full_name`, `email`, `message`, `status`, `created_at`) VALUES
(1, 'sagor', 'sagorwdf@gmail.com', 'ws', 'unread', '2024-09-09 10:25:35'),
(2, 'sagor', 'sagorwdf@gmail.com', 'ws', 'unread', '2024-09-09 10:25:36'),
(3, 'sagor', 'sagorwdf@gmail.com', 'ws', 'unread', '2024-09-09 10:27:37'),
(4, 'sagor', 'sagors@gmail.com', 'xxx', 'unread', '2024-09-09 10:27:50'),
(5, 'sagor', 'sagorwdpf@gmail.com', 'ssss', 'unread', '2024-09-09 10:29:32'),
(6, 'sagor', 'sagorwdf@gmail.com', 'dd', 'unread', '2024-09-09 21:54:26'),
(7, 'sagor ddd', 'sagorwdpf@gmail.com', 'ss', 'unread', '2024-09-12 19:33:04');

-- --------------------------------------------------------

--
-- Table structure for table `roomes`
--

CREATE TABLE `roomes` (
  `id` int(11) NOT NULL,
  `details` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` int(11) NOT NULL,
  `capacity` int(11) NOT NULL,
  `pets` tinyint(1) NOT NULL DEFAULT 0,
  `breakfast` tinyint(1) NOT NULL DEFAULT 0,
  `extrac_1` varchar(255) DEFAULT NULL,
  `extrac_2` varchar(255) DEFAULT NULL,
  `extrac_3` varchar(255) DEFAULT NULL,
  `roomType` enum('single','double','family','presidential') NOT NULL,
  `image1` varchar(255) DEFAULT NULL,
  `image2` varchar(500) NOT NULL,
  `image3` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roomes`
--

INSERT INTO `roomes` (`id`, `details`, `price`, `size`, `capacity`, `pets`, `breakfast`, `extrac_1`, `extrac_2`, `extrac_3`, `roomType`, `image1`, `image2`, `image3`) VALUES
(11, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '2500.00', 1000, 7, 0, 0, '0', 'Where does it come from?', 'Where does it come from?', 'presidential', 'uploads/card14.jpg', 'uploads/card6.jpg', 'uploads/card11.jpg'),
(12, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '1000.00', 400, 1, 0, 0, '0', 'Where does it come from?', 'Where does it come from?', 'single', 'uploads/card5.jpg', 'uploads/card15.jpg', 'uploads/card9.jpg'),
(13, 'lgggg', '4567.00', 1000, 4, 0, 0, '0', 'Where does it come from?', 'Where does it come from?', 'family', 'uploads/card13.jpg', 'uploads/card6.jpg', 'uploads/hotel2.jpg'),
(14, 'ssss', '1200.00', 200, 1, 0, 0, '0', 'Where does it come from?', 'Where does it come from?', 'single', 'uploads/hotel3.jpg', 'uploads/card12.jpg', 'uploads/hotel4.jpg'),
(15, 'Booking the right hotel room can make or break a vacation. But given the number of different hotel room types available, the booking process can often be confusing, whether you’re an avid traveler or booking your first trip. What is a double room in a hotel? What is a standard hotel room and how is it different from a deluxe room? What is a mini suite vs. a full suite, and which is best suited for families?', '2000.00', 300, 2, 0, 0, '0', 'Poolside Double Rooms', 'Poolside Double Rooms', 'double', 'uploads/cocoon1.jpg', 'uploads/images.jpeg', 'uploads/Dhaka-Hotel-71-1.jpg'),
(16, 'The Presidential Suite consists of two bedrooms with individual bathrooms, a spacious living area with a work desk and a fully equipped kitchenette. The size of this generous suite is 1136 square feet (105.54 square meters). All the windows are facing Gulshan Lake.', '4000.00', 300, 5, 0, 0, '0', 'Poolside Double Rooms', 'Poolside Double Rooms', 'family', 'uploads/cocoon1.jpg', 'uploads/Dhaka-Hotel-71-1.jpg', 'uploads/images.jpeg'),
(17, 'The Presidential Suite consists of two bedrooms with individual bathrooms, a spacious living area with a work desk and a fully equipped kitchenette. The size of this generous suite is 1136 square feet (105.54 square meters). All the windows are facing Gulshan Lake.', '2999.00', 1000, 10, 0, 0, '0', 'Where does it come from?', 'Poolside Double Rooms', 'presidential', 'uploads/cocoon1.jpg', 'uploads/images.jpeg', 'uploads/Dhaka-Hotel-71-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `roomes_details`
--

CREATE TABLE `roomes_details` (
  `id` int(11) NOT NULL,
  `capacity` int(2) NOT NULL,
  `breakfast` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `pets` varchar(30) NOT NULL,
  `roomtype` varchar(30) NOT NULL,
  `size` varchar(50) NOT NULL,
  `image` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sign_up`
--

CREATE TABLE `sign_up` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sign_up`
--

INSERT INTO `sign_up` (`id`, `fullname`, `username`, `email`, `password`, `status`, `created_at`) VALUES
(22, 'sagor', '123', 'sagorwdf@gmail.com', '$2y$10$JHHAE5qxA2qr2myYGJUCrexbboxh.tA0DNRoBnlN39HwErtiSH7uO', 'active', '2024-09-13 14:12:51'),
(40, 'Muhammad', 'ssss', 'sagor@gmail.com', '$2y$10$rFor3/IhMCJm9YygP5ceJu2vqAQ7nkFj1Zy2A2x.Lgkknq1EGvapC', 'active', '2024-09-13 14:13:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roomes`
--
ALTER TABLE `roomes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roomes_details`
--
ALTER TABLE `roomes_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sign_up`
--
ALTER TABLE `sign_up`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roomes`
--
ALTER TABLE `roomes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `roomes_details`
--
ALTER TABLE `roomes_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sign_up`
--
ALTER TABLE `sign_up`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
