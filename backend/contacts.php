<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
include('config.php');

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the form data is set
    if (!empty($_POST['full_name']) && !empty($_POST['email']) && !empty($_POST['message'])) {
        // Retrieve and sanitize input data
        $full_name = htmlspecialchars(trim($_POST['full_name']));
        $email = htmlspecialchars(trim($_POST['email']));
        $message = htmlspecialchars(trim($_POST['message']));

        // Prepare SQL query
        $stmt = $conn->prepare("INSERT INTO contacts (full_name, email, message, status) VALUES (?, ?, ?, 'unread')");
        if ($stmt) {
            $stmt->bind_param("sss", $full_name, $email, $message);

            // Execute query and check for success
            if ($stmt->execute()) {
                echo "Your message has been sent successfully!";
            } else {
                echo "Error executing query: " . $stmt->error;
            }

            // Close statement
            $stmt->close();
        } else {
            echo "Error preparing statement: " . $conn->error;
        }
    } else {
        echo "Form data is empty or missing.";
        var_dump($_POST); // Debugging output
    }
} else {
    echo "Invalid request method.";
}

// Close connection
$conn->close();
?>
