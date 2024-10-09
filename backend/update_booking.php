<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Include database configuration
include 'config.php';

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Function to send email using PHPMailer
function sendEmail($to, $subject, $message) {
    $mail = new PHPMailer(true); // Enable exceptions for detailed error tracking
    try {
        // SMTP configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Your SMTP host (Gmail)
        $mail->SMTPAuth = true;
        $mail->Username = 'sagorwdpf@gmail.com'; // Your Gmail address
        $mail->Password = 'vgeghjczltpvrmnl'; // Gmail App Password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Email setup
        $mail->setFrom('sagorwdpf@gmail.com', 'Your Hotel'); // Sender's email and name
        $mail->addAddress($to); // Recipient's email

        // Email content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Send email and return success
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo); // Log the error
        return false;
    }
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id']) && isset($data['status'])) {
        $id = intval($data['id']);
        $status = $data['status'];

        // Update booking status in the database
        $query = "UPDATE bookings SET status = ? WHERE id = ?";
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param('si', $status, $id);
            if ($stmt->execute()) {
                $stmt->close();

                // Optionally, send an email notification
                $to = 'sagorwdpf@gmail.com'; // Email recipient
                $subject = 'Booking Status Updated';
                $message = "<p>Your booking status has been updated to: $status.</p>
                <p>Your Booking Date: $startDate</p>";
                if (sendEmail($to, $subject, $message)) {
                    echo json_encode(["success" => true, "message" => "Booking updated and email sent"]);
                } else {
                    echo json_encode(["success" => false, "error" => "Booking updated but failed to send email"]);
                }
            } else {
                error_log("Execute Error: " . $stmt->error);
                echo json_encode(["success" => false, "error" => "Failed to execute statement"]);
            }
        } else {
            error_log("Prepare Statement Error: " . $conn->error);
            echo json_encode(["success" => false, "error" => "Failed to prepare statement"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Invalid data"]);
    }
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
