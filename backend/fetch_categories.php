<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
include('config.php');

// Fetch categories from database
$result = $conn->query("SELECT name FROM categories");

$categories = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row['name'];
    }
}

echo json_encode($categories);

// Close connection
$conn->close();
?>
