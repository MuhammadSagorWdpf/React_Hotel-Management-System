<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
	header("HTTP/1.1 200 OK");
	exit;
}

if($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$data = json_decode( file_get_contents("php://input"), true);

	if(isset($data['id']))
	{
		$messageId = (int)$data['id'];

		//$messageId = 3;
		if($messageId > 0)
		{
			$stmt = $conn->prepare("UPDATE contacts SET status = 'read' WHERE id = ?");
			$stmt->bind_param("i",$messageId);

			if($stmt->execute())
			{
				echo json_encode(['success'=>true]);
			}

			else
			{
				echo json_encode(['success'=>false, 'message'=>'Error updating status']);
			}

			/*print_r($stmt);
			die();*/

			$stmt->close();
		}

		else
		{
			echo json_encode(['success'=>false, 'message'=>'Invalid Message Id']);
		}
	}

	else
	{
		echo json_encode(['success'=>false, 'message'=>'No ID Provided']);
	}
}

else
{
	echo json_encode(['success'=>false, 'message'=>'Invalid request']);
}

$conn->close();
?>