<?php
	include_once("../getFunction.php");
	
	header("Content-Type: text/plain"); 
		
	$start = isset($_POST['start'])?$_POST['start']:0; //posición a iniciar
	$limit = isset($_POST['limit'])?$_POST['limit']:25; //número de registros a mostrar
	$query = isset($_POST['query'])?$_POST['query']:20; 
	
	
	
	$fields = array(
		array("name" => "id","type"=>"int"),
		array("name" => "tipo","type"=>"string"),
		array("name" => "fecha","type"=>"string"),
		array("name" => "pendiente","type"=>"float"),
		array("name" => "monto","type"=>"float"),
		array("name" => "total","type"=>"float")
	);
	
	$data = array();
	
	$sql = "SELECT    
					id,
					tipo,
					DATE_FORMAT(fecha,'%d/%m/%Y') AS fecha,
					pendiente,
					total  
			FROM
					tm_cxc_cuentas_por_cobrar
			WHERE 
					estado = 'NO_PROCESADO' and
					id_con = ".$query;
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		$rowNum = 0;
		while($row = $result->fetch_object()) {
			$data[$rowNum]['id']  		= $row->id;
			$data[$rowNum]['tipo'] 		= $row->tipo;
			$data[$rowNum]['fecha'] 	= $row->fecha;
			$data[$rowNum]['pendiente'] = $row->pendiente;
			$data[$rowNum]['monto'] 	= $row->pendiente;
			$data[$rowNum]['total'] 	= $row->total;
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
	
	echo json_encode($paging)
	//print_r($paging);
?>