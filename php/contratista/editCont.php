<?php
	
	include_once("../getFunction.php");
	
	// * = obligatorio en bd
	$id = isset($_POST['txt-id'])?$_POST['txt-id']:''; // *
	$nombre = isset($_POST['txt-nombre'])?$_POST['txt-nombre']:''; // *
	$apellido = isset($_POST['txt-apellido'])?$_POST['txt-apellido']:'';// *
	$cedula = isset($_POST['txt-cedula'])?$_POST['txt-cedula']:'';// *
	$sexo = isset($_POST['cmb-sexo'])?$_POST['cmb-sexo']:'';// *
	$civil = isset($_POST['cmb-civil'])?$_POST['cmb-civil']:'';
	$fnacimiento = isset($_POST['dat-fnacimiento'])?$_POST['dat-fnacimiento']:'';// *
	$lnacimiento = isset($_POST['txt-lnacimiento'])?$_POST['txt-lnacimiento']:'';
	$fijo = isset($_POST['txt-fijo'])?$_POST['txt-fijo']:'';
	$movil = isset($_POST['txt-movil'])?$_POST['txt-movil']:'';// *
	$direc = isset($_POST['txt-direc'])?$_POST['txt-direc']:'';
	$email = isset($_POST['txt-email'])?$_POST['txt-email']:'';// *
	$ingreso = isset($_POST['dat-ingreso'])?$_POST['dat-ingreso']:'';// *
	
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	
	$sql = "UPDATE tm_con_contratista SET  
				
				nombre = '".$nombre."',
				apellido =  '".$apellido."',
				cedula =  '".$cedula."',
				sexo =  '".$sexo."',
				e_civil =  '".$civil."',
				f_nacimiento =  '".formatDateTime($fnacimiento)."',
				l_nacimiento =  '".$lnacimiento."',
				tlf_fijo =  '".$fijo."',
				tlf_movil = '".$movil."' ,
				direccion = '".$direc."',
				email =  '".$email."',
				f_ingreso = '".formatDateTime($ingreso)."'  
				
			WHERE id = '".$id."'";
	
	
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$mysqli->close(); 
		$output = msgReturn(true,'Se edit&oacute correctamente');
	} else {
		$mysqli->rollback();
		$mysqli->close(); 
		
		$output = msgReturn(false,'No se pudo editar');
	}
	
	//echo $sql;
	echo $output;
?>