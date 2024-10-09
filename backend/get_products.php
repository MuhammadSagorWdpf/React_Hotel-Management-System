<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$query = "SELECT * FROM products";
$result = $conn->query($query);

$products = [];

while($row = $result->fetch_assoc())
{
	$products[] = $row;
}

echo json_encode($products);

$conn->close();

?>