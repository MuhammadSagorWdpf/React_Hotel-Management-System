<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
include 'config.php'; // Ensure this file correctly sets up $conn

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Define the upload directory
    $uploadDir = 'uploads/';
    // Create the directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Initialize file paths array
    $filePaths = [];
    
    // Loop to handle two files
    for ($i = 1; $i <= 3; $i++) {
        $fileKey = "image$i";
        if (isset($_FILES[$fileKey]) && $_FILES[$fileKey]['error'] === UPLOAD_ERR_OK) {
            // Get the file details
            $fileTmpPath = $_FILES[$fileKey]['tmp_name'];
            $fileName = basename($_FILES[$fileKey]['name']);
            $filePath = $uploadDir . $fileName;

            // Move the file to the uploads directory
            if (move_uploaded_file($fileTmpPath, $filePath)) {
                $filePaths[$fileKey] = $filePath;
            } else {
                echo json_encode(["success" => false, "error" => "Failed to move uploaded file: $fileKey"]);
                exit;
            }
        } elseif (isset($_FILES[$fileKey]['error']) && $_FILES[$fileKey]['error'] !== UPLOAD_ERR_NO_FILE) {
            echo json_encode(["success" => false, "error" => "File upload error: $fileKey"]);
            exit;
        } else {
            $filePaths[$fileKey] = null; // No file uploaded
        }
    }

    // Get POST data (form data)
    $details = $_POST['details'] ?? '';
    $price = $_POST['price'] ?? '';
    $size = $_POST['size'] ?? '';
    $capacity = $_POST['capacity'] ?? '';
    $pets = isset($_POST['pets']) && strtolower($_POST['pets']) === 'yes' ? 1 : 0;
    $breakfast = isset($_POST['breakfast']) && strtolower($_POST['breakfast']) === 'yes' ? 1 : 0;
    $extrac_1 = $_POST['extrac_1'] ?? '';
    $extrac_2 = $_POST['extrac_2'] ?? '';
    $extrac_3 = $_POST['extrac_3'] ?? '';
    $roomType = $_POST['roomType'] ?? '';

    // Validate data
    $requiredFields = ['details', 'price', 'size', 'capacity', 'roomType'];
    foreach ($requiredFields as $field) {
        if (empty(${$field})) {
            echo json_encode(["success" => false, "error" => "Missing field: $field"]);
            exit;
        }
    }

    // Prepare SQL query using prepared statements
    $query = "INSERT INTO roomes (details, price, size, capacity, pets, breakfast, extrac_1, extrac_2, extrac_3, roomType, image1, image2,image3) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    if ($stmt = $conn->prepare($query)) {
        // Bind parameters (types: s = string, i = integer)
        $stmt->bind_param('sissiiissssss', $details, $price, $size, $capacity, $pets, $breakfast, $extrac_1, $extrac_2, $extrac_3, $roomType, $filePaths['image1'], $filePaths['image2'], $filePaths['image3']);

        // Execute statement
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Data inserted successfully"]);
        } else {
            echo json_encode(["success" => false, "error" => "Execute failed: " . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Prepare failed: " . $conn->error]);
    }

    // Close the database connection
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
