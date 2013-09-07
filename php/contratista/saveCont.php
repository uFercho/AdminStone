<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$nombre = isset($_POST['txt-nombre'])?$_POST['txt-nombre']:''; // *
	$apellido = isset($_POST['txt-apellido'])?$_POST['txt-apellido']:'';// *
	$cedula = isset($_POST['txt-cedula'])?$_POST['txt-cedula']:'';// *
	$sexo = isset($_POST['cmb-sexo'])?$_POST['cmb-sexo']:'';// *
	$civil = isset($_POST['cmb-civil'])?$_POST['cmb-civil']:'';
	$fnacimiento = isset($_POST['dat-fnacimiento'])?$_POST['dat-fnacimiento']:'05/05/2011';// *
	$lnacimiento = isset($_POST['txt-lnacimiento'])?$_POST['txt-lnacimiento']:'';
	$fijo = isset($_POST['txt-fijo'])?$_POST['txt-fijo']:'';
	$movil = isset($_POST['txt-movil'])?$_POST['txt-movil']:'';// *
	$direc = isset($_POST['txt-direc'])?$_POST['txt-direc']:'';
	$email = isset($_POST['txt-email'])?$_POST['txt-email']:'';// *
	$ingreso = isset($_POST['dat-ingreso'])?$_POST['dat-ingreso']:'05/05/2011';// *
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	$sql = "INSERT INTO tm_con_contratista (
				id ,
				nombre ,
				apellido ,
				cedula ,
				sexo ,
				e_civil ,
				f_nacimiento ,
				l_nacimiento ,
				tlf_fijo ,
				tlf_movil ,
				direccion ,
				email ,
				f_ingreso
				)
			VALUES (
				NULL , ";
				
	$sql.="'".$nombre."' , ";
	$sql.="'".$apellido."' , ";
	$sql.="'".$cedula."' , ";
	$sql.="'".$sexo."' , ";
	$sql.="'".$civil."' , ";
	$sql.="'".formatDateTime($fnacimiento)."' , ";
	$sql.="'".$lnacimiento."' , ";
	$sql.="'".$fijo."' , ";
	$sql.="'".$movil."' , ";
	$sql.="'".$direc."' , ";
	$sql.="'".$email."' , ";
	$sql.="'".formatDateTime($ingreso)."' );";
				
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