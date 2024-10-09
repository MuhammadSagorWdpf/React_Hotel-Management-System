<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
include 'config.php'; // Ensure this file correctly sets up $conn

// Get parameters from the request
$roomType = $_GET['roomType'];
$startDate = $_GET['startDate'];
$endDate = $_GET['endDate'];

// Debugging: log parameters
error_log("Room Type: $roomType");
error_log("Start Date: $startDate");
error_log("End Date: $endDate");

// Query to check if the room is available
$query = "
    SELECT * 
    FROM bookings 
    WHERE roomType = ? 
    AND status = 'Booked' 
    AND (
        (startDate < ? AND endDate > ?) OR
        (startDate < ? AND endDate > ?)
    )
";

if ($stmt = $conn->prepare($query)) {
    $stmt->bind_param('sssss', $roomType, $endDate, $startDate, $startDate, $endDate);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if any rows were returned
    $available = $result->num_rows === 0; // If no bookings found, room is available

    // Debugging: log result
    error_log("Number of rows found: " . $result->num_rows);

    echo json_encode(['available' => $available]);

    $stmt->close();
} else {
    echo json_encode(['available' => false, 'error' => $conn->error]);
}

$conn->close();
?>
