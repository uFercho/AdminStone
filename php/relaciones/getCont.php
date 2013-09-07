<?php
	header("Content-Type: text/plain"); 
	
	include_once("../getFunction.php");
		
	$id = isset($_POST['id'])?$_POST['id']:'22'; 
	
	$fields=array(
		array("name" => "nombres","header"=>"Nombres"),
		array("name" => "cedula","header"=>"Cedula"),
		array("name" => "tlf_movil","header"=>"Tlf_movil"),
		array("name" => "email","header"=>"Email")
	);
	
	$sql = "SELECT 
				CONCAT(nombre,' ',apellido) AS nombres,
				cedula ,
				tlf_movil ,
				email 
			FROM 
				tm_con_contratista 
			WHERE
				id = '".$id."'";
				
	$mysqli = newMySQLi();
	if (mysqli_connect_errno()) {/*exit();*/}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			$data[0]['nombres'] = $row->nombres;
			$data[0]['cedula'] = $row->cedula;
			$data[0]['tlf_movil'] = $row->tlf_movil;
			$data[0]['email'] = $row->email;
		} 
		// Free result 
		$result->close(); 
	}
    unset($row); 
    unset($sql);	
	
	$metadata = array(
		"totalProperty"		=> "total",
		"successProperty"	=> "success",
		"fields"			=> $fields,
		"root"				=> "data"
	);
	
	$paging = array(
		'success'	=>true,
		'metaData'	=> $metadata,
		'total'		=>count($data), //<--- total de registros a paginar
		'data'		=> array_splice($data,0,count($data))
	);
	
	echo json_encode($paging);
	//print_r($paging);

?>