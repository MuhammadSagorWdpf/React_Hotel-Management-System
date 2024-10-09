<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Include database configuration
include 'config.php'; // Ensure this file sets up $conn

// Fetch data from the database
$query = "SELECT id, details, price, size, capacity, pets, breakfast, extrac_1, extrac_2, extrac_3, roomType, image1, image2, image3 FROM roomes";

$data = [];
$error = null;

try {
    if ($result = $conn->query($query)) {
        while ($row = $result->fetch_assoc()) {
            // Modify data if needed (e.g., converting booleans)
            $row['pets'] = $row['pets'] ? 'Yes' : 'No';
            $row['breakfast'] = $row['breakfast'] ? 'Yes' : 'No';
            $data[] = $row;
        }
        $result->free();
    } else {
        $error = "Query failed: " . $conn->error;
    }
} catch (Exception $e) {
    $error = "Error: " . $e->getMessage();
}

// Output the data as JSON
if ($error) {
    echo json_encode(["success" => false, "error" => $error]);
} else {
    echo json_encode(["success" => true, "data" => $data]);
}

// Close the database connection
$conn->close();
?>
