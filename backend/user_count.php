<?php
header('Content-Type: application/json');
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
include ('config.php');

// Query to get room count
$sql = "SELECT COUNT(*) as count FROM sign_up";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // Output data of each row
  $row = $result->fetch_assoc();
  echo json_encode($row);
} else {
  echo json_encode(["count" => 0]);
}

$conn->close();
?>
