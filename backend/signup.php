<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php'; // Include your database configuration

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// Debugging output
error_log("Request Data: " . print_r($data, true));

if (isset($data->fullname) && isset($data->username) && isset($data->email) && isset($data->password)) {
    $fullname = $data->fullname;
    $username = $data->username;
    $email = $data->email;
    $password = $data->password;

    if (empty($fullname) || empty($username) || empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please fill all fields"]);
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare the SQL statement
    $sql = "INSERT INTO sign_up (fullname, username, email, password, status) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Error preparing statement: " . $conn->error]);
        exit();
    }

    // Bind parameters
    $status = 'active'; // Default status
    $stmt->bind_param("sssss", $fullname, $username, $email, $hashedPassword, $status);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error executing statement: " . $stmt->error]);
    }

    // Close statement and connection
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
}

$conn->close();
?>
