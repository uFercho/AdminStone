<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$idCont = isset($_POST['idCont'])?$_POST['idCont']:''; // *
	$datFecha = isset($_POST['dat-fecha'])?$_POST['dat-fecha']:'';// *
	$cmbTipo = isset($_POST['cmb-tipo'])?$_POST['cmb-tipo']:'';// *
	$numMonto = isset($_POST['num-monto'])?$_POST['num-monto']:'';
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	$sql = "INSERT INTO tm_cxc_cuentas_por_cobrar (
				id,
				id_con,
				fecha,
				tipo,
				pendiente,
				estado,
				total
				)
			VALUES (
				NULL , ";
				
	$sql.="'".$idCont."' , ";
	$sql.="'".formatDateTime($datFecha)."' , ";
	$sql.="'".$cmbTipo."' , ";
	$sql.="'".$numMonto."' , ";
	$sql.="'NO_PROCESADO' , ";
	$sql.="'".$numMonto."' );";
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	$idCxc = $mysqli->insert_id;
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$output = msgReturn(true,'Se guard&oacute; correctamente-'.$idCxc);
		$mysqli->close(); 
	} else {
		$output = msgReturn(false,'No se pudo guardar. ERROR: '.$mysqli->error);
		$mysqli->rollback();		
		$mysqli->close(); 
	}
	
	//echo $sql;
	echo $output;
?>