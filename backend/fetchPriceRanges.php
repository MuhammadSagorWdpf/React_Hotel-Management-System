<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include './config.php';


// Query to get distinct price ranges
$sql = "
    SELECT
        MIN(price) AS min_price,
        MAX(price) AS max_price
    FROM
        roomes
";

$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    $minPrice = $row['min_price'];
    $maxPrice = $row['max_price'];

    // Define price ranges dynamically based on min and max prices
    $priceRanges = [];
    $rangeStep = 500; // Define the step for price ranges

    for ($i = $minPrice; $i <= $maxPrice; $i += $rangeStep) {
        $rangeMin = $i;
        $rangeMax = $i + $rangeStep - 1;

        if ($rangeMax > $maxPrice) {
            $rangeMax = $maxPrice;
        }

        $priceRanges[] = [
            'label' => "{$rangeMin}-{$rangeMax}",
            'value' => "{$rangeMin}-{$rangeMax}"
        ];
    }

    echo json_encode(['success' => true, 'data' => $priceRanges]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch price ranges']);
}

$conn->close();
?>
