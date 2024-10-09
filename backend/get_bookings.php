

<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

// Include database configuration
include 'config.php'; // Ensure this file correctly sets up $conn

// Get pagination parameters
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 5;
$offset = ($page - 1) * $limit;

// Function to fetch bookings from the database with pagination and sorting
function fetchBookings($conn, $limit, $offset) {
    $query = "SELECT * FROM bookings ORDER BY id DESC LIMIT ? OFFSET ?";
    if ($stmt = $conn->prepare($query)) {
        $stmt->bind_param('ii', $limit, $offset);
        $stmt->execute();
        $result = $stmt->get_result();
        return $result->fetch_all(MYSQLI_ASSOC);
    }
    return [];
}

// Fetch paginated bookings
$bookings = fetchBookings($conn, $limit, $offset);

// Fetch total count of bookings for pagination controls
$query = "SELECT COUNT(*) as count FROM bookings";
$result = $conn->query($query);
$totalCount = $result->fetch_assoc()['count'];

// Return bookings and pagination data
echo json_encode([
    'bookings' => $bookings,
    'totalCount' => $totalCount,
    'page' => $page,
    'limit' => $limit
]);

// Close the database connection
$conn->close();
?>
