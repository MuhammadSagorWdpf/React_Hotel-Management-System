<?php
include('config.php');

$mypass = 123456;
$pass = password_hash($mypass,PASSWORD_DEFAULT);

$query = "INSERT INTO admins(id,email,username,password,status) VALUES ('','sagor@gmail.com','sagor','$pass','active')";

if($conn->query($query))
{
	echo "Admin Created";
}

else
{
	echo "Error Occured";
}
?>