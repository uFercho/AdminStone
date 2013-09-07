<?php
	include_once("../getFunction.php");
		
	$id = isset($_POST['id'])?$_POST['id']:''; 
	
	$sql = "SELECT 
				login,
				tipo,
				estado
			FROM 
				tm_usu_usuario 
			WHERE
				id = '".$id."'";
				
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {/*exit();*/}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			$out = $id.';';
			$out.= $row->login.';';
			$out.= $row->tipo.';';
			$out.= $row->estado; 
		} 
		// Free result 
		$result->close(); 
	}
    unset($row); 
    unset($sql);
	echo $out;
	
?>  