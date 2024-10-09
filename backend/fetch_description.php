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

$roomType = $_GET['roomType'];

// Fetch details based on room type
$sql = "SELECT description FROM categories WHERE name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $roomType);
$stmt->execute();
$result = $stmt->get_result();

$details = [];
while ($row = $result->fetch_assoc()) {
    $details[] = $row['description'];
}

echo json_encode($details);

// Close connection
$stmt->close();
$conn->close();
?>
