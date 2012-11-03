<?php

include_once("db_connect.php");

$index = $_GET["index"];
$seed = $_GET["seed"];

// Sanitize index
if (!isset($index) || !is_numeric($index) || $index < 0) {
	echo "Error : index should be an int >= 0";
	return;
}

// Sanitize seed
if (!isset($seed) || !is_numeric($seed) || $seed < 0) {
	echo "Error : seed should be an int >= 0";
	return;
}

// Connect to db
opendb();

// Perfrom query
$query = "SELECT `url` FROM `sounds` ORDER BY RAND(".$seed.") LIMIT 1 OFFSET ".$index;
$result = mysql_query($query);

// Check result
if (!$result) {
	$response["success"] = false;
	$response["error"] = 'Invalid query: ' . mysql_error() . "\n";
    $response["error"] .= 'Whole query: ' . $query ."\n";
    echo json_encode($response);
    die();
}

// Use result
if ($row = mysql_fetch_assoc($result)) {
	$response["success"] = true;
	$response["url"] = "/sounds/" . $row["url"];
    echo json_encode($response);
} else {
	$response["success"] = false;
	$response["error"] = "No more sounds";
    echo json_encode($response);
    die();
}

?>
