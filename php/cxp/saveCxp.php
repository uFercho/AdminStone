<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$idCont = isset($_POST['idCont'])?$_POST['idCont']:''; // *
	$totalRel = isset($_POST['totalRel'])?$_POST['totalRel']:'';// *numFac
	$totalCxc = isset($_POST['totalCxc'])?$_POST['totalCxc']:'';// *
	$numFac = isset($_POST['numFac'])?$_POST['numFac']:'';// *
	$formaPago = isset($_POST['formaPago'])?$_POST['formaPago']:'';// *
	$banco = isset($_POST['banco'])?$_POST['banco']:'';// *
	$numeroItem = isset($_POST['numeroItem'])?$_POST['numeroItem']:'';// *
	
	$addRel = isset($_POST['recordsRel'])?$_POST['recordsRel']:'';
	$recordsRel = json_decode(stripslashes($addRel));
	
	$addCxc = isset($_POST['recordsCxc'])?$_POST['recordsCxc']:'';
	$recordsCxc = json_decode(stripslashes($addCxc));
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	$resultSql = '';
	$totalGen = 0;
	
	$sql = "INSERT INTO tm_cxp_cuentas_por_pagar (
				id ,
				id_con ,
				fecha ,
				total_rel ,
				total_cxc ,
				num_factura,
				forma_pago,
				banco,
				num_item
				)
			VALUES (
				NULL , ";
				
	$sql.="'".$idCont."' , ";
	$sql.="'".formatDateTime(date("d/m/Y"))."' , ";
	$sql.="'".$totalRel."' , ";
	$sql.="'".$totalCxc."' , ";
	$sql.="'".$numFac."' , ";
	$sql.="'".$formaPago."' , ";
	$sql.="'".$banco."' , ";
	$sql.="'".$numeroItem."' );";
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	$idCxp = $mysqli->insert_id;
	
	foreach($recordsRel as $recordRel){
		if($recordRel->tipo == 'Fabricaci&oacute;n'){
			$sql = "UPDATE tm_rfa_relacion_fabricacion SET ";
			
			$sql.= "estado = 'PROCESADO'";
			
			$sql.= " WHERE id = ".$recordRel->id.";";
		}
		
		if($recordRel->tipo == 'Instalaci&oacute;n'){
			$sql = "UPDATE tm_rin_relacion_instalacion SET ";
			
			$sql.= "estado = 'PROCESADO'";
			
			$sql.= " WHERE id = ".$recordRel->id.";";
		}
		$resultSql.='Sql Relaciones: '.$sql.' - ';
		$mysqli->query($sql) ? null : $all_query_ok = false;
	}	
	
	foreach($recordsCxc as $recordCxc){
		$sql = "UPDATE tm_cxc_cuentas_por_cobrar SET ";
		
		$totalGen = $recordCxc->pendiente-$recordCxc->monto;
		$sql.= "pendiente = '".$totalGen."'";
		
		if($totalGen == 0){	$sql.= ", estado = 'PROCESADO'"; }
		
		$sql.= " WHERE id = ".$recordCxc->id.";";
		
		$resultSql.='Sql CXC: '.$sql.' - ';
		$mysqli->query($sql) ? null : $all_query_ok = false;
	}
	
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$output = 'Se guard&oacute; correctamente-'.$idCxp;
		$mysqli->close(); 
	} else {
		$mysqli->rollback();		
		$output = 'No se pudo guardar. ERROR: '.$mysqli->error;
		$mysqli->close(); 
	}
	
	//echo $sql;
	echo $output;
?>