<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include './config.php';

// Get parameters
$roomType = isset($_GET['roomType']) ? $_GET['roomType'] : '';
$roomPrice = isset($_GET['roomPrice']) ? $_GET['roomPrice'] : '';

// Base query
$sql = "SELECT * FROM roomes WHERE 1=1";

// Filter by roomType
if ($roomType !== '') {
    $sql .= " AND roomType = '" . $conn->real_escape_string($roomType) . "'";
}

// Filter by roomPrice
if ($roomPrice !== '') {
    list($minPrice, $maxPrice) = explode('-', $roomPrice);
    $sql .= " AND price BETWEEN " . intval($minPrice) . " AND " . intval($maxPrice);
}

$result = $conn->query($sql);

if ($result) {
    $rooms = [];
    while ($row = $result->fetch_assoc()) {
        $rooms[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $rooms]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch rooms']);
}

$conn->close();
?>
