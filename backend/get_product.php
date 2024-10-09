<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$id = $_GET['id'];

$query = "SELECT * FROM products WHERE id = $id";

$result = $conn->query($query);

if($result->num_rows > 0)
{
	echo json_encode($result->fetch_assoc());
}

else
{
	echo json_encode(["success"=>false, "error"=>"Product Not Found"]);
}

$conn->close();

?>