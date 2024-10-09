<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php'; // Include your database configuration

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    if (empty($email) || empty($password)) {
        echo json_encode(["success" => false, "message" => "Please fill all fields"]);
        exit();
    }

    // Prepare the SQL statement
    $sql = "SELECT password FROM sign_up WHERE email = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(["success" => false, "message" => "Error preparing statement: " . $conn->error]);
        exit();
    }

    // Bind parameters and execute the statement
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if user exists
    if ($stmt->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "User not found"]);
        exit();
    }

    // Bind result and fetch
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    // Verify the password
    if (password_verify($password, $hashedPassword)) {
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Incorrect password"]);
    }

    // Close statement and connection
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Required fields missing"]);
}

$conn->close();
?>
