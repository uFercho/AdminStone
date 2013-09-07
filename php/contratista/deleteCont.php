<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$id = isset($_POST['txt-id'])?$_POST['txt-id']:''; // *
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	
	$sql = "DELETE FROM tm_con_contratista WHERE id = '".$id."'";
	
	
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$mysqli->close(); 
		$output = msgReturn(true,'Se elimin&oacute; correctamente');
	} else {
		$mysqli->rollback();
		$mysqli->close(); 
		
		$output = msgReturn(false,'No se pudo eliminar');
	}
	
	//echo $sql;
	echo $output;
?>