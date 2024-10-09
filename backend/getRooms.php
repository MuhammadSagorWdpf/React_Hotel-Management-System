<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
include ('config.php');


// Prepare SQL query to select all data
$sql = "SELECT * FROM roomes";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Fetch all data
    $roomsData = array();
    while ($row = $result->fetch_assoc()) {
        $roomsData[] = $row;
    }
    echo json_encode($roomsData);
} else {
    echo json_encode(array("error" => "No rooms found"));
}

// Close connection
$conn->close();
?>
