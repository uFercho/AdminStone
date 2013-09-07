<?php
	header("Content-Type: text/plain"); 
	
	//ob_start(); // al inicio
	
	include('../R&OS_PDF_Class/class.ezpdf.php');
	include_once("../getFunction.php");
		
	$mysqli = newMySQLi(); //$mysqli = new mysqli('localhost', 'my_user', 'my_password', 'my_db');
	// chequeo de coneccion
	if (mysqli_connect_errno()) {
		$output = msgReturn(false,'Conexión fallida. '.mysqli_connect_error());
		break;
	}
	// se desabilita el autocommit
	$mysqli->autocommit(FALSE);	
	
	$all_query_ok=true; // variable de control
	
	$sql = "INSERT INTO tm_nor_numero_orden (
				id,
				fecha
				)
			VALUES (
				NULL , ";
	$sql.="'".formatDateTime(date("d/m/Y"))."' );";
				
	$mysqli->query($sql) ? null : $all_query_ok = false;
	
	$numOrden = $mysqli->insert_id;
	
	// si los query no dan errores se hace el commit sino se hace el rollback
	if ($all_query_ok) {
		$mysqli->commit();
		$output = msgReturn(true,'Se guard&oacute; correctamente');
		$mysqli->close(); 
	} else {
		$output = msgReturn(false,'No se pudo guardar. ERROR: '.$mysqli->error);
		$mysqli->rollback();		
		$mysqli->close(); 
	}
	
	$pdf =& new Cezpdf('a4');
	$pdf->selectFont('../R&OS_PDF_Class/fonts/Helvetica.afm');
	$datacreator = array (
						'Title'=>'NUMERO DE ORDEN DE CORTE',
						'Author'=>'GRANITMAR C.A.',
						'Subject'=>'Reportes',
						'Creator'=>'apbg19@gmail.com',
						'Producer'=>'http://fb.me/'
						);
	$pdf->addInfo($datacreator);
	
	$options = array(
				'showHeadings'=>0,
				'fontSize' => 8,
                'shadeCol'=>array(0.9,0.9,0.9),
				'xPos'=>'left',
                'xOrientation'=>'right',
                //'width'=>250,
				'cols'=>array(
					'cantidad'=>array('justification'=>'right','width'=>50),
					'fabrica'=>array('justification'=>'center','width'=>130),
					'instala'=>array('justification'=>'center','width'=>130),
					'field1'=>array('justification'=>'left','width'=>210),
					'field2'=>array('justification'=>'left','width'=>210),
					'field3'=>array('justification'=>'left','width'=>420),
					'field4'=>array('justification'=>'left','width'=>420)
				)
            );
	$pdf->ezText("<b>NÚMERO DE ORDEN: ".$numOrden."</b>",10,array('justification'=>'right','right'=>10));
	
	$pdf->ezImage("../../images/logo.jpg", 0, 150, 'none', 'left');
	//$pdf->ezImage("http://localhost/Proyec_Pichu/images/logo.png", 0, 150, 'none', 'left');
	
	$data[] = array('field1'=>'Instalador:','field2'=>'Vendedor:');
	$pdf->ezTable($data,array('field1'=>'','field2'=>''),'',$options );
	unset($data);
	
	$data[] = array('field1'=>'Fecha:','field2'=>'Cliente:');
	$pdf->ezTable($data,array('field1'=>'','field2'=>''),'',$options );
	unset($data);
	
	$data[] = array('field1'=>'Teléfono:','field2'=>'Material:');
	$pdf->ezTable($data,array('field1'=>'','field2'=>''),'',$options );
	unset($data);
	
	$data[] = array('field3'=>'Dirección:');
	$pdf->ezTable($data,array('field3'=>''),'',$options );
	unset($data);
	
	$data[] = array('field1'=>'Pego:','field2'=>'Masilla:');
	$pdf->ezTable($data,array('field1'=>'','field2'=>''),'',$options );
	unset($data);
	
	$data[] = array('field4'=>'Observación:');
	$pdf->ezTable($data,array('field4'=>''),'',$options );
	unset($data);
	
	$pdf->ezText("\n",5);
	
	$titles = array('cantidad'=>'<b>Cantidad</b>', 'fabrica'=>'<b>Tipo</b>');
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Borde Sencillo');  
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data); 
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'DB. Semi-redondo');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'DB. Redondo');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	  
	$data[] = array('cantidad'=>'', 'fabrica'=>'DB. Cuadrado');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	  
	$data[] = array('cantidad'=>'', 'fabrica'=>'DB. Chaflaneado');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	   
	$data[] = array('cantidad'=>'', 'fabrica'=>'Corte Recto');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	 
	$data[] = array('cantidad'=>'', 'fabrica'=>'Faldón Pegado en el Taller'); 
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	 
	$data[] = array('cantidad'=>'', 'fabrica'=>'Fab. Salpicadero');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	  
	$data[] = array('cantidad'=>'', 'fabrica'=>'Hueco Pulido');  
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Bisel Mínimo');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	 
	$data[] = array('cantidad'=>'', 'fabrica'=>'Pie de Amigo'); 
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	 
	$data[] = array('cantidad'=>'', 'fabrica'=>'Base Triangular');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	  
	$data[] = array('cantidad'=>'', 'fabrica'=>'Base Cuadrada');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Base Hexagonal');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	 
	$data[] = array('cantidad'=>'', 'fabrica'=>'Fab. Faldón Facetado');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Fab. Rodapié Facetado');
	$pdf->ezTable($data,$titles,'',$options );
	$pdf->ezText("\n",1);
	unset($data);	
	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Fab. Rodapié'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
		
	$titles = array('cantidad'=>'<b>Cantidad</b>', 'instala'=>'<b>Tipo</b>');
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Rodapié'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Rodapié Facetado'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Faldón Facetado'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ponchera'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. de Tope'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Contra Huella'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Huella'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Descansos'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Hueco de Cajetín'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Hueco de Grifería'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Hueco de Cocina y Fregadero'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Salpicadero'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Faldón Pegado en el Sitio'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Pared'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Solera'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. de Base'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	$data[] = array('cantidad'=>'', 'instala'=>'Ins. Rodapié Pulido'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);
	
	/*$pdf->ezTable($data,$titles,'',$options );	
	$data[] = array('cantidad'=>'', 'fabrica'=>'Fab. Rodapi3'); 
	$pdf->ezTable($data,$titles,'',$options );	
	$pdf->ezText("\n",1);
	unset($data);*/
	
	
	$pdf->ezText("\n",4);
	$pdf->ezText("<b><i>Entregar:</i>  Lunes  |  Martes  |  Miércoles  |  Jueves  |  Viernes  |  Sábado</b>\n",10,array('justification'=>'center'));
	
	ob_end_clean();
	
	$pdf->ezStream();
	
	
?>