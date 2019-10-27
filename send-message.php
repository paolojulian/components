<?php
include_once 'db.php';

$_POST = json_decode(file_get_contents('php://input'));
if ( ! isset($_POST->message)) {
    return;
}

$message = $_POST->message;
$query = "INSERT INTO notifications (`message`) VALUES ('$message')";
$mysqli->query($query);

$ch = curl_init('http://localhost:8080');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");

$jsonData = json_encode([
	'name' => 'paolo',
	'message' => $message
]);

$query = http_build_query(['data' => $jsonData]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);