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
				DATE_FORMAT(fecha,'%d/%m/%Y') AS fecha,
				tipo,   
				pendiente AS deuda,
				total
			FROM
				tm_cxc_cuentas_por_cobrar
			WHERE 
				id_con = ".$idCont." AND
				estado = 'NO_PROCESADO'";
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			
			$data[] = array('fecha'=>$row->fecha, 'tipo'=>$row->tipo, 'deuda'=>round($row->deuda, 3, PHP_ROUND_HALF_UP), 'total'=>round($row->total, 3, PHP_ROUND_HALF_UP));
		} 
		// Free result 
		$result->close(); 
	}
	
	$titles = array(
					'fecha'=>'<b>Fecha</b>',
					'tipo'=>'<b>Tipo</b>',
					'deuda'=>'<b>Pendiente BsF</b>',
					'total'=>'<b>Total BsF</b>'
				);
	
	$options = array(
					'shadeCol'=>array(0.9,0.9,0.9),
					'xOrientation'=>'center',
					'width'=>500,
					'cols'=>array(
						'deuda'=>array('justification'=>'right'),
						'total'=>array('justification'=>'right')
					)
				);
	
	$pdf->ezImage("../../images/logo.jpg", 0, 150, 'none', 'left');
	
	$pdf->ezText("Reporte de Cuentas por Cobrar \n", 14,array('justification'=>'center'));
	$pdf->ezText("<b>Contratista: </b>".$nomCont."\n", 10);
	$pdf->ezTable($data, $titles, '', $options);
	$pdf->ezText("\n\n\n", 10);
	$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"), 10);
	$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n", 10);
	
	ob_end_clean();
	
	$pdf->ezStream();
?>