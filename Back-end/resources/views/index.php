<?php 

include "../connection.php";


if (isset($_GET['rfid'])) {
	
	$rfid = $_GET['rfid'];
	echo $rfid;

	$query1 = "insert into rfid (tag) values('$rfid')";
	$query2 = "update employees set status = CASE WHEN status = 'X' THEN 'O' ELSE 'X' END where tagID = '$rfid'";
	if($connection->query($query1))	{
		echo "\ninserted";
		$connection->query($query2);
	}
	else {
		echo "\nerror";
	}
}
?>