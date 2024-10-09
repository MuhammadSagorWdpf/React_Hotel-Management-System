<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
include 'config.php'; // Ensure this file correctly sets up $conn

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data (form data)
    $name = $_POST['name'] ?? '';
    $address = $_POST['address'] ?? '';
    $cnic = $_POST['cnic'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $persons = $_POST['persons'] ?? 0;
    $roomType = $_POST['roomType'] ?? '';
    $startDate = $_POST['startDate'] ?? '';
    $endDate = $_POST['endDate'] ?? '';
    $totalPrice = $_POST['totalPrice'] ?? 0.00;
    $days = $_POST['days'] ?? 0;
    $capacity = $_POST['capacity'] ?? 0;
    $status = $_POST['status'] ?? 'Pending';

    // Validate data
    $requiredFields = ['name', 'address', 'cnic', 'email', 'phone', 'persons', 'roomType', 'startDate', 'endDate', 'totalPrice', 'days', 'capacity'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            echo json_encode(["success" => false, "error" => "Missing field: $field"]);
            exit;
        }
    }

    // Prepare SQL query using prepared statements
    $query = "INSERT INTO bookings (name, address, cnic, email, phone, persons, roomType, startDate, endDate, totalPrice, days, capacity, status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($query)) {
        // Bind parameters (types: s = string, i = integer, d = decimal)
        $stmt->bind_param(
            'sssssisssdiis',
            $name,
            $address,
            $cnic,
            $email,
            $phone,
            $persons,
            $roomType,
            $startDate,
            $endDate,
            $totalPrice,
            $days,
            $capacity,
            $status
        );

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Booking saved successfully"]);
        } else {
            // Detailed error information
            $error = $stmt->error ? $stmt->error : "Unknown error";
            echo json_encode(["success" => false, "error" => "Failed to save booking: " . $error]);
            error_log('Execute Error: ' . $error); // Log error for debugging
        }

        // Close the statement
        $stmt->close();
    } else {
        // Detailed error information
        $error = $conn->error ? $conn->error : "Unknown error";
        echo json_encode(["success" => false, "error" => "Failed to prepare statement: " . $error]);
        error_log('Prepare Error: ' . $error); // Log error for debugging
    }

    // Close the database connection
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
