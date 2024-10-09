<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

include 'config.php'; // Include your database configuration

$query = "SELECT * FROM roomes";
$result = $conn->query($query);

if ($result) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode(["success" => true, "data" => $data]);
} else {
    echo json_encode(["success" => false, "error" => "Database query failed"]);
}

$conn->close();
?>
