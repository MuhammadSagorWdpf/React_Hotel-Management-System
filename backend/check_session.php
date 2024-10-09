<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
include('config.php');
session_start(); // Start the session

header("Content-Type: application/json"); // Set content type to JSON

// Check if the session variable for the user is set
if (isset($_SESSION['user'])) {
    // User is logged in, return user data
    echo json_encode([
        "success" => true,
        "user" => $_SESSION['user'] // Assuming 'user' contains user details
    ]);
} else {
    // No user is logged in
    echo json_encode([
        "success" => false,
        "message" => "No active session"
    ]);
}
?>
