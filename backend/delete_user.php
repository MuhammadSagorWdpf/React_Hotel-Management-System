<?php
// backend/delete_user.php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$id = $_GET['id'] ?? '';

if (!$id) {
    echo json_encode(['success' => false, 'message' => 'No user ID provided']);
    exit;
}

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Prepare delete user query
$sql = "DELETE FROM sign_up WHERE id = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $id);

// Execute delete user query
if ($stmt->execute()) {
    // Check if any row was affected
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No user found with the given ID']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to execute query: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
