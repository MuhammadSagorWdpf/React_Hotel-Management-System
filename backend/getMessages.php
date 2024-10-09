<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$data = json_decode(file_get_contents("php://input"), true);

	if(isset($data['id']))
	{
		$messageId = $data['id'];

		$sql = "UPDATE contacts SET status = 'read' WHERE id = ?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('i', $messageId);

		if($stmt->execute())
		{
			echo json_encode(['success'=> true]);
		}

		else
		{
			echo json_encode(['success'=> false, 'error'=>$stmt->error]);
		}

		$stmt->close();
	}

	else
	{
		echo json_encode(['success'=> false, 'error'=>'No ID provided']);
	}
}

else
{
	$sql = "SELECT id, name, email, message, status FROM contacts ORDER BY id DESC";
	$result = $conn->query($sql);

	$messages = [];

	while($row = $result->fetch_assoc())
	{
		$messages[] = $row;
	}

	echo json_encode($messages);
}

$conn->close();


?>