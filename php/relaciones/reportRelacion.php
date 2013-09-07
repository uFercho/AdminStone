<?php
	include_once("../getFunction.php");
	require_once('../R&OS_PDF_Class/class.ezpdf.php');

	$idCont = isset($_GET['idCont'])?$_GET['idCont']:''; // *
	$nomCont = isset($_GET['nomCont'])?$_GET['nomCont']:''; // *
	
	$pdf =& new Cezpdf('a4');
	$pdf->selectFont('../R&OS_PDF_Class/fonts/Helvetica.afm');
	
	//$pdf->ezSetCmMargins(1,1,1.5,1.5);
	
	$datacreator = array (
                    'Title'=>'Ejemplo PDF',
                    'Author'=>'unijimpe',
                    'Subject'=>'PDF con Tablas',
                    'Creator'=>'unijimpe@hotmail.com',
                    'Producer'=>'http://blog.unijimpe.net'
                    );
	
	$pdf->addInfo($datacreator);

	$data = array();
	
	$sql = "SELECT 
				DATE_FORMAT(rfa.fecha,'%d/%m/%Y') AS fecha,
				'Fabricación' AS tipo,
				rfa.gastos_especiales AS gesp,
				SUM(drf.cantidad*drf.costo) AS rela,
				rfa.gastos_especiales+SUM(drf.cantidad*drf.costo) AS total,
				rfa.estado
			FROM
				tm_rfa_relacion_fabricacion rfa INNER JOIN
				td_drf_detalle_relacion_fab drf on rfa.id = drf.id_rfa
			WHERE
				rfa.con_id = '".$idCont."' 
			GROUP BY
				drf.id_rfa 
			UNION ALL
			SELECT
				DATE_FORMAT(rin.fecha,'%d/%m/%Y') AS fecha,
				'Instalación' AS tipo,
				rin.gastos_especiales AS gesp,
				sum(dri.cantidad*dri.costo) AS rela,
				rin.gastos_especiales+sum(dri.cantidad*dri.costo) AS total,
				rin.estado
			FROM
				tm_rin_relacion_instalacion rin INNER JOIN
				td_dri_detalle_relacion_ins dri on rin.id = dri.id_rin    
			WHERE
				rin.con_id = '".$idCont."' 
			GROUP BY
				dri.id_rin";
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			
			$data[] = array('fecha'=>$row->fecha, 'tipo'=>$row->tipo, 'gEsp'=>round($row->gesp, 3, PHP_ROUND_HALF_UP), 'rela'=>round($row->rela, 3, PHP_ROUND_HALF_UP), 'total'=>round($row->total, 3, PHP_ROUND_HALF_UP), 'estado'=>$row->estado);
		} 
		// Free result 
		$result->close(); 
	}
	
	$titles = array(
					'fecha'=>'<b>Fecha</b>',
					'tipo'=>'<b>Tipo</b>',
					'gEsp'=>'<b>Otros Serv.</b>',
					'rela'=>'<b>Relación</b>',
					'total'=>'<b>Total BsF.</b>',
					'estado'=>'<b>Estado</b>'
				);
	
	$options = array(
					'shadeCol'=>array(0.9,0.9,0.9),
					'xOrientation'=>'center',
					'width'=>500,
					'cols'=>array(
						'gEsp'=>array('justification'=>'right'),
						'rela'=>array('justification'=>'right'),
						'total'=>array('justification'=>'right')
					)
				);
	
	$pdf->ezImage("../../images/logo.jpg", 0, 150, 'none', 'left');
	
	$pdf->ezText("Reporte de Relaciones \n", 16,array('justification'=>'center'));
	$pdf->ezText("<b>Contratista: </b>".$nomCont."\n", 10);
	$pdf->ezTable($data, $titles, '', $options);
	$pdf->ezText("\n\n\n", 10);
	$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"), 10);
	$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n", 10);
	
	ob_end_clean();
	
	$pdf->ezStream();
?>