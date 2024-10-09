<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$data = json_decode( file_get_contents("php://input"), true);

if(isset($data['id']) && isset($data['replyText']))
{
	$messageId = $data['id'];
	$replyText = $data['replyText'];

	$sql = "UPDATE contacts SET status = 'read', reply = ? WHERE id = ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("si", $replyText, $messageId);

	if($stmt->execute())
	{
		echo json_encode(["success"=>true, "message"=>"Reply sent and status updated"]);
	}

	else
	{
		echo json_encode(["success"=>false, "message"=>"Failed to update the message"]);
	}

	$stmt->close();
}

else
{
	echo json_encode(["success"=>false, "message"=>"Invalid Input"]);
}

$conn->close();
?>