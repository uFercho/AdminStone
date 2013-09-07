<?php
	header("Content-Type: text/plain"); 
	
	$data = array(  
        'success'=>true,  
        'total'=>11,  
        'data'=>array(  
                        array('fabrica'=>'Borde Sencillo',			    		'cantidad'=>0,	'costo'=>90,	'subtotal'=>0,	'id'=>1),  
			array('fabrica'=>'Doble Borde Semi-redondo',			        'cantidad'=>0,	'costo'=>200,	'subtotal'=>0,	'id'=>2),  
			array('fabrica'=>'Doble Borde Redondo',					'cantidad'=>0,	'costo'=>200,	'subtotal'=>0,	'id'=>3),  
			array('fabrica'=>'Doble Borde Cuadrado',				'cantidad'=>0,	'costo'=>200,	'subtotal'=>0,	'id'=>4),  
			array('fabrica'=>'Doble Borde Chaflaneado',				'cantidad'=>0,	'costo'=>200,	'subtotal'=>0,	'id'=>5),    
			array('fabrica'=>'Corte Recto',				    		'cantidad'=>0,	'costo'=>65,	'subtotal'=>0,	'id'=>6),  
			array('fabrica'=>'Fald&oacute;n Pegado en el Taller',	                'cantidad'=>0,	'costo'=>100,	'subtotal'=>0,	'id'=>7),  
			array('fabrica'=>'Salpicadero',			        		'cantidad'=>0,	'costo'=>90,	'subtotal'=>0,	'id'=>8),  
			array('fabrica'=>'Hueco Pulido',					'cantidad'=>0,	'costo'=>300,	'subtotal'=>0,	'id'=>9),  
			array('fabrica'=>'Bisel M&iacute;nimo',		    		        'cantidad'=>0,	'costo'=>10,	'subtotal'=>0,	'id'=>10),  
			array('fabrica'=>'Pie de Amigo',					'cantidad'=>0,	'costo'=>160,	'subtotal'=>0,	'id'=>11),  
			array('fabrica'=>'Base Triangular',					'cantidad'=>0,	'costo'=>300,	'subtotal'=>0,	'id'=>12),  
			array('fabrica'=>'Base Cuadrada',					'cantidad'=>0,	'costo'=>300,	'subtotal'=>0,	'id'=>13), 
			array('fabrica'=>'Base Hexagonal',					'cantidad'=>0,	'costo'=>450,	'subtotal'=>0,	'id'=>14),  
			array('fabrica'=>'Fald&oacute;n Facetado',	    		        'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>15),
			array('fabrica'=>'Rodapi&eacute; Facetado',	   		 	'cantidad'=>0,	'costo'=>80,	'subtotal'=>0,	'id'=>16),
			array('fabrica'=>'Rodapi&eacute;',					'cantidad'=>0,	'costo'=>65,	'subtotal'=>0,	'id'=>17),
                        array('fabrica'=>'Fald&oacute;n',					'cantidad'=>0,	'costo'=>65,	'subtotal'=>0,	'id'=>18),
                        array('fabrica'=>'Lavamanos',					        'cantidad'=>0,	'costo'=>3000,	'subtotal'=>0,	'id'=>19) 
        )  
    );  
	
	//print_r($data);
	echo json_encode($data);
?>