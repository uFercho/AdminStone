<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$login = isset($_POST['txt-login'])?$_POST['txt-login']:''; // *
	$password = isset($_POST['password'])?$_POST['password']:'';// *
	$tipo = isset($_POST['cmb-tipo'])?$_POST['cmb-tipo']:'';// *
	$estado = isset($_POST['cmb-estado'])?$_POST['cmb-estado']:'';// *
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	$sql = "INSERT INTO tm_usu_usuario (
				id,
				login,
				pass,
				tipo,
				estado 
				)
			VALUES (
				NULL , ";
				
	$sql.="'".$login."' , ";
	$sql.="'".$password."' , ";
	$sql.="'".$tipo."' , ";
	$sql.="'".$estado."' );";
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$output = msgReturn(true,'Se guard&oacute; correctamente');
		$mysqli->close(); 
	} else {
		$output = msgReturn(false,'No se pudo guardar. ERROR: '.$mysqli->error);
		$mysqli->rollback();		
		$mysqli->close(); 
	}
	
	//echo $sql;
	echo $output;
?>