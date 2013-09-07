<?php
	
	include_once("../../getFunction.php");
	
	// * = obligatorio en bd
	$con_id = isset($_POST['con_id'])?$_POST['con_id']:''; // *
	$num_orden = isset($_POST['num_orden'])?$_POST['num_orden']:'';// *
	$cli_nombre = isset($_POST['cli_nombre'])?$_POST['cli_nombre']:'';// *
	$cli_dir = isset($_POST['cli_dir'])?$_POST['cli_dir']:'';
	$cli_mat = isset($_POST['cli_mat'])?$_POST['cli_mat']:'05/05/2011';// *
	$gastos_esp = isset($_POST['gastos_esp'])?$_POST['gastos_esp']:'';
	
	$add = isset($_POST['records'])?$_POST['records']:'';
	
	$records = json_decode(stripslashes($add));
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	$sql = "INSERT INTO tm_rin_relacion_instalacion (
			id,
			con_id,
			num_orden,
			fecha,
			cli_nombre,
			cli_direccion,
			cli_material,
			gastos_especiales ,
			estado
				)
			VALUES (
				NULL , ";
				
	$sql.="'".$con_id."' , ";
	$sql.="'".$num_orden."' , ";
	$sql.="'".formatDateTime(date("d/m/Y"))."' , ";
	$sql.="'".$cli_nombre."' , ";
	$sql.="'".$cli_dir."' , ";
	$sql.="'".$cli_mat."' , ";
	$sql.="'".$gastos_esp."' , ";
	$sql.="'NO_PROCESADO' );";
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	
	$sql = "INSERT INTO td_dri_detalle_relacion_ins (
			id,
			id_rin,
			descripcion,
			cantidad,
			costo 
				)
			VALUES ";
	
	foreach($records as $record){
		$sql.="( NULL , ";				
		$sql.="'".$mysqli->insert_id."' , ";
		$sql.="'".$record->instala."' , ";
		$sql.="'".$record->cantidad."' , ";
		$sql.="'".$record->costo."' ), ";
	}
	
	$sql = substr($sql, 0, -2).';';
	
	$mysqli->query($sql) ? null : $all_query_ok = false;
	
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$output = 'Se guard&oacute; correctamente';
		$mysqli->close(); 
	} else {
		$mysqli->rollback();		
		$output = 'No se pudo guardar. ERROR: '.$mysqli->error;
		$mysqli->close(); 
	}
	
	//echo $sql;
	echo $output;
?>