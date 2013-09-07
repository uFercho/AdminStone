<?php
	include_once("../getFunction.php");
		
	$id = isset($_POST['id'])?$_POST['id']:"32"; 
	
	$sql = "SELECT 
				nombre ,
				apellido ,
				cedula ,
				sexo ,
				e_civil ,
				DATE_FORMAT(f_nacimiento,'%d/%m/%Y') AS f_nacimiento,
				l_nacimiento ,
				tlf_fijo ,
				tlf_movil ,
				direccion ,
				email ,
				DATE_FORMAT(f_ingreso,'%d/%m/%Y') AS f_ingreso 
			FROM 
				tm_con_contratista 
			WHERE
				id = '".$id."'";
				
	$mysqli = newMySQLi();
	
	
	
	if (mysqli_connect_errno()) {/*exit();*/}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			$out = $id.';';
			$out.= $row->nombre.';';
			$out.= $row->apellido.';';
			$out.= $row->cedula.';';
			$out.= $row->sexo.';';
			$out.= $row->e_civil.';'; 
			$out.= $row->f_nacimiento.';'; 
			$out.= $row->l_nacimiento.';'; 
			$out.= $row->tlf_fijo.';'; 
			$out.= $row->tlf_movil.';'; 
			$out.= $row->direccion.';'; 
			$out.= $row->email.';'; 
			$out.= $row->f_ingreso; 
		} 
		// Free result 
		$result->close(); 
	}
    unset($row); 
    unset($sql);
	echo $out;
	
?>  