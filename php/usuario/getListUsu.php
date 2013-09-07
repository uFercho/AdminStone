<?php
	include_once("../getFunction.php");
		
	$start = isset($_POST['start'])?$_POST['start']:0; //posición a iniciar
	$limit = isset($_POST['limit'])?$_POST['limit']:25; //número de registros a mostrar
	$query = isset($_POST['query'])?$_POST['query']:'ufer'; 
	
	
	
	$fields = array(
		array("name" => "id","type"=>"string"),
		array("name" => "login","type"=>"string"),
		array("name" => "pass","type"=>"string"),
		array("name" => "tipo","type"=>"string"),
		array("name" => "estado","type"=>"string"),
		array("name" => "url","type"=>"string")
	);
	
	$data = array();
	
	$sql = "SELECT 
				id,
				login,
				pass,
				tipo,
				estado
			FROM 
				tm_usu_usuario 
			WHERE
				login LIKE  CONCAT('"./*Valida_root(*/$query/*)*/."','%')";
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		$rowNum = 0;
		while($row = $result->fetch_object()) {
			$data[$rowNum]['id']  	= $row->id;
			$data[$rowNum]['login'] = $row->login;
			$data[$rowNum]['pass'] 	= $row->pass;
			$data[$rowNum]['tipo']	= $row->tipo;
			$data[$rowNum]['estado']= $row->estado;
			$data[$rowNum]['url']= $row->estado == 'Activo'?'http://localhost/Proyec_Pichu/images/main-menu/accept.png':'http://localhost/Proyec_Pichu/images/main-menu/delete.png';
			$rowNum++;
		} 
		// Free result 
		$result->close(); 
	}
	
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