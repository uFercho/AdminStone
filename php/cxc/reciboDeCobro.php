<?php
	header("Content-Type: text/plain"); 
	
	include('../R&OS_PDF_Class/class.ezpdf.php');
	include_once("../getFunction.php");
		
	$ciCont = isset($_GET['ciCont'])?$_GET['ciCont']:''; 
	$nomCont = isset($_GET['nomCont'])?$_GET['nomCont']:''; 
	$tipoCxc = isset($_GET['tipoCxc'])?$_GET['tipoCxc']:''; 
	$montoCxc = isset($_GET['montoCxc'])?$_GET['montoCxc']:'';
	$numLetrasCxc = isset($_GET['numLetrasCxc'])?$_GET['numLetrasCxc']:'';
	$idCxc = isset($_GET['idCxc'])?$_GET['idCxc']:''; 
	
	$pdf =& new Cezpdf('a4');
	$pdf->selectFont('../R&OS_PDF_Class/fonts/Helvetica.afm');
	$datacreator = array (
						'Title'=>'RECIBO DE PAGO',
						'Author'=>'GRANITMAR C.A.',
						'Subject'=>'Reportes',
						'Creator'=>'apbg19@gmail.com',
						'Producer'=>'http://fb.me/'
						);
	$pdf->addInfo($datacreator);
	
	$pdf->ezText("<b>Número: ".$idCxc."</b>",12,array('justification'=>'right'));
	
	$pdf->ezImage("../../images/logo.jpg", 0, 150, 'none', 'left');
	
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>RECIBO DE PAGO</b>\n",14,array('justification'=>'center'));
	$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"),10);
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>Contratista:</b> ".$nomCont,10,array('justification'=>'left'));
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>Cédula:</b> ".$ciCont."\n",10,array('justification'=>'left'));
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>He recibido la cantidad de:</b> ".$numLetrasCxc,10,array('justification'=>'left'));
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>Total: </b> ".$montoCxc."\n",10,array('justification'=>'left'));
	$pdf->ezText("\n",2);
	$pdf->ezText("<b>Por Concepto de:</b> ".$tipoCxc."\n\n",10,array('justification'=>'left'));
	$pdf->ezText("\n",2);
	$pdf->ezText("\n",2);

	$pdf->ezText("<b>Firma:</b> __________________________   Cédula: ________________________",10,array('justification'=>'left'));
	
	ob_end_clean();
	
	$pdf->ezStream();
	
?>