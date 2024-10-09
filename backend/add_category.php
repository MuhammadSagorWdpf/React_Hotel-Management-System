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

// Retrieve POST data
$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->description)) {
    $name = htmlspecialchars(trim($data->name));
    $description = htmlspecialchars(trim($data->description));

    // Prepare SQL query
    $stmt = $conn->prepare("INSERT INTO categories (name, description) VALUES (?, ?)");
    if ($stmt) {
        $stmt->bind_param("ss", $name, $description);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}

// Close connection
$conn->close();
?>
