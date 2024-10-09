<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $id = intval($data['id']);
        $query = "DELETE FROM bookings WHERE id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param('i', $id);
            $stmt->execute();
            $stmt->close();
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Failed to prepare statement"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Invalid data"]);
    }
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
