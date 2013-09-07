<?php
	header("Content-Type: text/plain"); 
	
	$data = array(  
        'success'=>true,  
        'total'=>11,  
        'data'=>array(  
            array('instala'=>'Rodapi&eacute;',			   		'cantidad'=>0,	'costo'=>70,	'subtotal'=>0,	'id'=>1),  
			array('instala'=>'Rodapi&eacute; Facetado',			'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>2),  
			array('instala'=>'Fald&oacute;n Facetado',			'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>3),  
			array('instala'=>'Ponchera',			   	    	'cantidad'=>0,	'costo'=>70,	'subtotal'=>0,	'id'=>4),  
			array('instala'=>'Instalaci&oacute;n de Tope',	    'cantidad'=>0,	'costo'=>100,	'subtotal'=>0,	'id'=>5),
			array('instala'=>'Instalaci&oacute;n de Tope >90cm',  'cantidad'=>0,	'costo'=>150,	'subtotal'=>0,	'id'=>6),
			array('instala'=>'Contra Huella',					'cantidad'=>0,	'costo'=>115,	'subtotal'=>0,	'id'=>7),  
			array('instala'=>'Huella',				        	'cantidad'=>0,	'costo'=>140,	'subtotal'=>0,	'id'=>8),  
			array('instala'=>'Descansos',	                	'cantidad'=>0,	'costo'=>125,	'subtotal'=>0,	'id'=>9),  
			array('instala'=>'Hueco de Cajet&iacute;n',			'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>10),  
			array('instala'=>'Hueco de Grifer&iacute;a',		'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>11),  
			array('instala'=>'Hueco de Cocina y Fregadero',		'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>12),  
			array('instala'=>'Salpicadero',			        	'cantidad'=>0,	'costo'=>50,	'subtotal'=>0,	'id'=>13),  
			array('instala'=>'Fald&oacute;n Pegado en el Sitio','cantidad'=>0,	'costo'=>65,	'subtotal'=>0,	'id'=>14),  
			array('instala'=>'Pared',				        	'cantidad'=>0,	'costo'=>100,	'subtotal'=>0,	'id'=>15), 
			array('instala'=>'Solera',				        	'cantidad'=>0,	'costo'=>110,	'subtotal'=>0,	'id'=>16),  
			array('instala'=>'Instalaci&oacute;n de Base',		'cantidad'=>0,	'costo'=>190,	'subtotal'=>0,	'id'=>17), 
			array('instala'=>'Rodapi&eacute; Pulido',	     	'cantidad'=>0,	'costo'=>75,	'subtotal'=>0,	'id'=>18),
                        array('instala'=>'Borde Sencillo',	     	        'cantidad'=>0,	'costo'=>75,	'subtotal'=>0,	'id'=>19),
                        array('instala'=>'Frente de Asensor 1',	     	        'cantidad'=>0,	'costo'=>2300,	'subtotal'=>0,	'id'=>20),
                        array('instala'=>'Frente de Asensor 2',	     	        'cantidad'=>0,	'costo'=>3300,	'subtotal'=>0,	'id'=>21),
                        array('instala'=>'Demolici&oacute;n',	     	        'cantidad'=>0,	'costo'=>500,	'subtotal'=>0,	'id'=>22),
                        array('instala'=>'Jacuzzi',	     	                'cantidad'=>0,	'costo'=>100,	'subtotal'=>0,	'id'=>23),
                        array('instala'=>'Pie de Amigo',	     	        'cantidad'=>0,	'costo'=>165,	'subtotal'=>0,	'id'=>24)
        )  
    );  
	
	//print_r($paging);
	echo json_encode($data);
?>