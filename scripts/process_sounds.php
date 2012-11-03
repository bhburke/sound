<?php

// Add all new sounds to the database

include_once("db_connect.php");
opendb();

function process_file($filename) {
	$query = "SELECT id FROM `sounds` WHERE `url` = '".$filename."'";
	$result = mysql_query($query);

	if (!$result) {
		die('Invalid query: ' . mysql_error());
	}

	if (mysql_num_rows($result) > 0) {
		// Already added this
		return;
	}

	$query = "INSERT INTO `sounds` (`url`) VALUES ('".$filename."')";
	$result = mysql_query($query);
	
	if ($result) {
		echo "Processed : ".$filename."<br>\n";
	} else {
		echo "ERROR : Could not insert item into database : ".$path."<br>\n";
		echo "Full Query : ".$query."<br>\n";
		die('Invalid query: ' . mysql_error());
	}
}

function process_directory($path) {
	echo "Processing directory : " . $path . "<br>\n";
	$dir = opendir($path);

	if (!$dir) {
		echo "Could not open directory : " . $path . "<br>\n";
		return;
	}
	
	while(($file = readdir($dir)) !== false) {

		$new_path = $path."/".$file;
		if (is_file($new_path))
			process_file($file);
		if (is_dir($new_path) && $file!="." && $file !="..")
			process_directory($new_path);
	}
}

process_directory("/var/www/sounds");

?>
