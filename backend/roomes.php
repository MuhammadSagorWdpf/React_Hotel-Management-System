<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
include ('config.php');

// Check if 'id' is set in the query parameters
if (isset($_GET['id'])) {
    $id = intval($_GET['id']); // Convert to integer to prevent SQL injection

    // Prepare SQL query to select the room with the specified ID
    $sql = "SELECT * FROM roomes WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch the room data
        $roomData = $result->fetch_assoc();
        echo json_encode($roomData);
    } else {
        echo json_encode(array("error" => "Room not found"));
    }
} else {
    echo json_encode(array("error" => "No ID provided"));
}

// Close connection
$conn->close();
?>
