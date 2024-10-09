<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$product_name = $_POST['product_name'];
	$description = $_POST['description'];
	$price = $_POST['price'];
	$stock_amount = $_POST['stock_amount'];
	$status = $_POST['status'];

	//Handle file upload

	$image = '';
	if(isset($_FILES['image']['name']) && $_FILES['image']['name'] != '')
	{
		$target_dir = "uploads/";
		$image = $target_dir .basename($_FILES['image']['name']);
		move_uploaded_file($_FILES['image']['tmp_name'], $image);
	}

	$query = "INSERT INTO products (product_name, description, price, image, stock_amount, status) VALUES ('$product_name','$description','$price','$image','$stock_amount','$status')";

	if($conn->query($query) === TRUE)
	{
		echo json_encode(["success"=>true]);
	}

	else
	{
		echo json_encode(["success"=>false, "error"=> $conn->error]);
	}

}

else
	{
		echo json_encode(["success"=>false, "error"=> "Invalid request method"]);
	}
$conn->close();
?>