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
		array("name" => "monto","type"=>"float")
	);
	
	$data = array();
	
	$sql = "SELECT 
				rfa.id,
				'Fabricaci&oacute;n' AS tipo,
				DATE_FORMAT(rfa.fecha,'%d/%m/%Y') AS fecha,
				rfa.gastos_especiales+SUM(drf.cantidad*drf.costo) AS monto 
			FROM
				tm_rfa_relacion_fabricacion rfa inner join 
				td_drf_detalle_relacion_fab drf on rfa.id = drf.id_rfa
			WHERE 
				rfa.estado = 'NO_PROCESADO' and
				rfa.con_id = ".$query."
			GROUP BY 
				rfa.id
			UNION ALL 
			SELECT 
				rin.id,
				'Instalaci&oacute;n' AS tipo,
				DATE_FORMAT(rin.fecha,'%d/%m/%Y') AS fecha,
				rin.gastos_especiales+SUM(dri.cantidad*dri.costo) AS monto 
			FROM
				tm_rin_relacion_instalacion rin inner join 
				td_dri_detalle_relacion_ins dri on rin.id = dri.id_rin
			WHERE 
				rin.estado = 'NO_PROCESADO' and
				rin.con_id = ".$query."
			GROUP BY 
				rin.id";
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		$rowNum = 0;
		while($row = $result->fetch_object()) {
			$data[$rowNum]['id']  	= $row->id;
			$data[$rowNum]['tipo']  = $row->tipo;
			$data[$rowNum]['fecha'] = $row->fecha;
			$data[$rowNum]['monto'] = round($row->monto, 3, PHP_ROUND_HALF_UP);
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