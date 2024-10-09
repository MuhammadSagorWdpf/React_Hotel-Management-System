<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$roomType = $_GET['roomType'] ?? '';
$price = $_GET['price'] ?? '';

// Create connection


// Prepare SQL query with filtering
$sql = "SELECT * FROM roomes WHERE 1";
if ($roomType) {
    $sql .= " AND roomType = ?";
}
if ($price) {
    $sql .= " AND price <= ?";
}

$stmt = $conn->prepare($sql);
if ($roomType && $price) {
    $stmt->bind_param("sd", $roomType, $price);
} elseif ($roomType) {
    $stmt->bind_param("s", $roomType);
} elseif ($price) {
    $stmt->bind_param("d", $price);
}

$stmt->execute();
$result = $stmt->get_result();
$rooms = $result->fetch_all(MYSQLI_ASSOC);

echo json_encode(['success' => true, 'rooms' => $rooms]);

$stmt->close();
$conn->close();
?>
