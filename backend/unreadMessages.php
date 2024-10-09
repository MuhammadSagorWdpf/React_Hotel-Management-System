<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php';

$sql = "SELECT COUNT(*) as unreadCount FROM contacts WHERE status = 'unread'";

$result = $conn->query($sql);

if($result->num_rows > 0)
{
	$row = $result->fetch_assoc();
	echo json_encode(['unreadCount'=>$row['unreadCount']]);
}

else
{
	echo json_encode(['unreadCount'=> 0]);
}

$conn->close();


?>