<?php
	header("Content-Type: text/plain"); 
	
	include('../../R&OS_PDF_Class/class.ezpdf.php');
	include_once("../../getFunction.php");
		
	$nomCont = isset($_GET['nomCont'])?$_GET['nomCont']:''; 
	//$dateCli = isset($_POST['dateCli'])?$_POST['dateCli']:'22'; 
	$ordCli = isset($_GET['ordCli'])?$_GET['ordCli']:''; 
	$nomCli = isset($_GET['nomCli'])?$_GET['nomCli']:''; 
	$dirCli = isset($_GET['dirCli'])?$_GET['dirCli']:''; 
	$matCli = isset($_GET['matCli'])?$_GET['matCli']:'';
	$sub = isset($_GET['subtotal'])?$_GET['subtotal']:0; 
	$serEsp = isset($_GET['serEsp'])?$_GET['serEsp']:0; 
	$total = isset($_GET['total'])?$_GET['total']:0; 
	 
	$add = isset($_GET['records'])?$_GET['records']:'';
	
	$records = json_decode(stripslashes($add));
	
	$pdf =& new Cezpdf('a4');
	$pdf->selectFont('../../R&OS_PDF_Class/fonts/Helvetica.afm');
	$datacreator = array (
						'Title'=>'RELACION DE TRABAJO DE LOS INSTALADORES',
						'Author'=>'GRANITMAR C.A.',
						'Subject'=>'Reportes',
						'Creator'=>'apbg19@gmail.com',
						'Producer'=>'http://fb.me/'
						);
	$pdf->addInfo($datacreator);
	
	$options = array(
                'shadeCol'=>array(0.9,0.9,0.9),
                'xOrientation'=>'center',
                'width'=>500,
				'cols'=>array(
					'cantidad'=>array('justification'=>'right','width'=>100),
					'costo'=>array('justification'=>'right'),
					'subtotal'=>array('justification'=>'right')
				)
            );
	
	$data[] = array('instala'=>'Rodapié',		        'cantidad'=>0,	'costo'=>70,	'subtotal'=>0, 'id'=>1);  
	$data[] = array('instala'=>'Rodapié Facetado',		'cantidad'=>0,	'costo'=>80,	'subtotal'=>0, 'id'=>2);  
	$data[] = array('instala'=>'Faldón Facetado',		'cantidad'=>0,	'costo'=>80,	'subtotal'=>0, 'id'=>3);  
	$data[] = array('instala'=>'Ponchera',		        'cantidad'=>0,	'costo'=>70,	'subtotal'=>0, 'id'=>4);  
	$data[] = array('instala'=>'Instalación de Tope',   'cantidad'=>0,	'costo'=>100,	'subtotal'=>0, 'id'=>5);
	$data[] = array('instala'=>'Instalación de Tope >90cm',   'cantidad'=>0,	'costo'=>150,	'subtotal'=>0, 'id'=>6);
	$data[] = array('instala'=>'Contra Huella',			'cantidad'=>0,	'costo'=>115,	'subtotal'=>0, 'id'=>7);  
	$data[] = array('instala'=>'Huella',		        'cantidad'=>0,	'costo'=>140,	'subtotal'=>0, 'id'=>8);  
	$data[] = array('instala'=>'Descansos',	            'cantidad'=>0,	'costo'=>125,	'subtotal'=>0, 'id'=>9);  
	$data[] = array('instala'=>'Hueco de Cajetín',	    'cantidad'=>0,	'costo'=>80,	'subtotal'=>0, 'id'=>10);  
	$data[] = array('instala'=>'Hueco de Grifería',		'cantidad'=>0,	'costo'=>80,	'subtotal'=>0, 'id'=>11);  
	$data[] = array('instala'=>'Hueco de Cocina y Fregadero',		'cantidad'=>0,	'costo'=>80,		'subtotal'=>0, 'id'=>12);  
	$data[] = array('instala'=>'Salpicadero',		    'cantidad'=>0,	'costo'=>50,	'subtotal'=>0, 'id'=>13);  
	$data[] = array('instala'=>'Faldón Pegado en el Sitio',		'cantidad'=>0,	'costo'=>65,	'subtotal'=>0, 'id'=>14);  
	$data[] = array('instala'=>'Pared',			        'cantidad'=>0,	'costo'=>100,	'subtotal'=>0, 'id'=>15); 
	$data[] = array('instala'=>'Solera',		        'cantidad'=>0,	'costo'=>110,	'subtotal'=>0, 'id'=>16);  
	$data[] = array('instala'=>'Instalación de Base',	'cantidad'=>0,	'costo'=>190,	'subtotal'=>0, 'id'=>17);
	$data[] = array('instala'=>'Rodapié Pulido',		'cantidad'=>0,	'costo'=>75,	'subtotal'=>0, 'id'=>18);
        $data[] = array('instala'=>'Borde Sencillo',		'cantidad'=>0,	'costo'=>75,	'subtotal'=>0, 'id'=>19);
        $data[] = array('instala'=>'Frente de Asensor 1',	'cantidad'=>0,	'costo'=>2300,	'subtotal'=>0, 'id'=>20);
        $data[] = array('instala'=>'Frente de Asensor 2',	'cantidad'=>0,	'costo'=>3300,	'subtotal'=>0, 'id'=>21);
        $data[] = array('instala'=>'Demolición',		'cantidad'=>0,	'costo'=>500,	'subtotal'=>0, 'id'=>22);
        $data[] = array('instala'=>'Jacuzzi',		        'cantidad'=>0,	'costo'=>100,	'subtotal'=>0, 'id'=>23);
        $data[] = array('instala'=>'Pie de Amigo',		'cantidad'=>0,	'costo'=>165,	'subtotal'=>0, 'id'=>24);
	
	foreach($records as $record){
		foreach($data as $indice => $valor){
			if($record->id == $valor['id']){
				$record->instala = Sustituto_Acento($record->instala);
				$data[$indice] = objectToArray($record);
			}
		}
	}
	
	$titles = array('instala'=>'<b>Descripción</b>', 'cantidad'=>'<b>Cantidad</b>', 'costo'=>'<b>Costo BsF.</b>', 'subtotal'=>'<b>Sub-Total BsF.</b>');
	
	$pdf->ezImage("../../../images/logo.jpg", 0, 150, 'none', 'left');
	
	$pdf->ezText("<b>RELACIÓN DE TRABAJO DE LOS INSTALADORES</b>\n",16,array('justification'=>'center'));	
	$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y")."\n",10);
	$pdf->ezText("<b>Número de Orden:</b> ".$ordCli,10,array('justification'=>'left'));
	$pdf->ezText("<b>Cliente:</b> ".$nomCli,10,array('justification'=>'left'));
	$pdf->ezText("<b>Dirección:</b> ".$dirCli,10,array('justification'=>'left'));
	$pdf->ezText("<b>Material:</b> ".$matCli,10,array('justification'=>'left'));
	$pdf->ezText("<b>Contratista:</b> ".$nomCont."\n",10,array('justification'=>'right','right'=>10));
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",5);
	$pdf->ezText("<b>Sub-Total:</b> ".$sub,10,array('justification'=>'right','right'=>30));
	$pdf->ezText("\n",3);
	$pdf->ezText("<b>Otros Servicios:</b> ".$serEsp,10,array('justification'=>'right','right'=>30));
	$pdf->ezText("\n",3);
	$pdf->ezText("<b>Total:</b> ".$total,10,array('justification'=>'right','right'=>30));
	
	
	//$pdf->ezText("\n\n\n",10);
	//$pdf->ezText("<b>Fecha:</b> ".date("d/m/Y"),10);
	//$pdf->ezText("<b>Hora:</b> ".date("H:i:s")."\n\n",10);
	
	ob_end_clean();
	
	$pdf->ezStream();
	
	//echo $out;
	//print_r($records);
	//echo json_encode($paging);
	//print_r($paging);
	
?>