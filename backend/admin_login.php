<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'config.php';

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// Debugging output
error_log("Request Data: " . print_r($data, true));

if (isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    // Check if the user exists and is active
    $sql = "SELECT * FROM admins WHERE email = ? AND status = 'active'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    // Debugging output
    error_log("SQL Query: " . $sql);
    error_log("Number of Rows: " . $result->num_rows);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify admin password
        if (password_verify($password, $user['password'])) {
            echo json_encode(["success" => true, "message" => "Login Successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid Password"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found or inactive"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email and Password Required"]);
}

$conn->close();
?>
