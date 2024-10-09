<?php
// backend/fetch_users.php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
include('config.php');

// Query to fetch users
$sql = "SELECT id, fullname, username, email, password FROM sign_up";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

echo json_encode($users);

$conn->close();
?>
