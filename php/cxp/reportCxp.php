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
				num_factura, 
				TRIM(CONCAT(banco, ' ', forma_pago, ' ', num_item)) AS forma_pago,
				total_rel,
				total_cxc,
				total_rel - total_cxc AS total_cxp   
			FROM 
				tm_cxp_cuentas_por_pagar 
			WHERE 
				id_con = ".$idCont;
	
	$mysqli = newMySQLi();
	
	if (mysqli_connect_errno()) {}
	
	if ($result = $mysqli->query($sql)) {
		while($row = $result->fetch_object()) {
			
			$data[] = array('fecha'=>$row->fecha, 'num_factura'=>$row->num_factura, 'forma_pago'=>$row->forma_pago, 'total_rel'=>round($row->total_rel, 3, PHP_ROUND_HALF_UP), 'total_cxc'=>round($row->total_cxc, 3, PHP_ROUND_HALF_UP), 'total_cxp'=>round($row->total_cxp, 3, PHP_ROUND_HALF_UP));
		}
		// Free result 
		$result->close(); 
	}
	
	$titles = array(
					'fecha'=>'<b>Fecha</b>',
					'num_factura'=>'<b>Num. Factura</b>',
					'forma_pago'=>'<b>Forma de Pago</b>',
					'total_rel'=>'<b>Relación BsF.</b>',
					'total_cxc'=>'<b>Deducciones BsF.</b>',
					'total_cxp'=>'<b>Total BsF.</b>'
				);
	
	$options = array(
					'shadeCol'=>array(0.9,0.9,0.9),
					'xOrientation'=>'center',
					'width'=>500,
					'cols'=>array(
						'total_rel'=>array('justification'=>'right'),
						'total_cxc'=>array('justification'=>'right'),
						'total_cxp'=>array('justification'=>'right')
					)
				);
	
	$pdf->ezImage("../../images/logo.jpg", 0, 150, 'none', 'left');
	
	$pdf->ezText("Reporte de Pagos Realizados \n", 14,array('justification'=>'center'));
	$pdf->ezText("<b>Contratista: </b>".$nomCont."\n", 10);
	$pdf->ezTable($data, $titles, '', $options);
	$pdf->ezText("\n\n\n", 10);
	$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"), 10);
	$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n", 10);
	
	ob_end_clean();
	
	$pdf->ezStream();
?>