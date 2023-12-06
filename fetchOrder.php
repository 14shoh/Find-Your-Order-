<?php
header('Content-Type: application/json');
$input = json_decode(file_get_contents('php://input'), true);
$trackingCode = $input['trackingCode'];

function checkOrderInFile($fileName, $trackingCode) {
    if (($handle = fopen($fileName, "r")) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            if ($data[0] == $trackingCode) {
                fclose($handle);
                return ['arrivalDate' => $data[1], 'status' => $data[2]];
            }
        }
        fclose($handle);
    }
    return false;
}

$firstFileDetails = checkOrderInFile("orderschina.csv", $trackingCode);
$secondFileDetails = checkOrderInFile("ordersdushanbe.csv", $trackingCode);

if ($firstFileDetails) {
    $response = $firstFileDetails;

    if (!$secondFileDetails) {
        $response['additionalInfo'] = ['error' => 'Товар еще не прибыл в Душанбе'];
    } else {

        $response['additionalInfo'] = $secondFileDetails;
    }
} elseif ($secondFileDetails) {
 
    $response = ['error' => 'Товар прибыл в Душанбе', 'additionalInfo' => $secondFileDetails];
} else {

    $response = ['error' => 'Ошибочный заказ'];
}

echo json_encode($response);
?>
