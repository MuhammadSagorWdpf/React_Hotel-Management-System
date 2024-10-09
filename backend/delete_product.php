<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$id = $_GET['id'];

$query = "SELECT image FROM products WHERE id = $id";
$result = $conn->query($query);
if($result->num_rows > 0)
{
	$row = $result->fetch_assoc();
	$image = $row['image'];

	if(file_exists($image))
	{	
		unlink($image);
	}
}

$query = "DELETE FROM products WHERE id = $id";

if($conn->query($query) === TRUE)
{
	echo json_encode(["success" => true]);
}

else
{
	echo json_encode(["success" => false, "error" =>$conn->error]);
}

$conn->close();

?>