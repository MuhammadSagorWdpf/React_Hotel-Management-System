<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php'; // Ensure this file contains your database credentials


// Prepare query to fetch room types
$sql = "SELECT DISTINCT roomType FROM roomes";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(['success' => false, 'message' => 'Query failed: ' . $conn->error]);
    exit;
}

// Fetch results
$roomTypes = [];
while ($row = $result->fetch_assoc()) {
    $roomTypes[] = $row['roomType'];
}

// Send response
echo json_encode(['success' => true, 'data' => $roomTypes]);

// Close connection
$conn->close();
?>
