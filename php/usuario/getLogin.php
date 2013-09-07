<?php
	include_once("../getFunction.php");

	$login = isset($_POST['login'])?$_POST['login']:'';
	$password = isset($_POST['password'])?$_POST['password']:'';

	$mysqli = newMySQLi(); 
	// chequeo de coneccion
	if (mysqli_connect_errno()) {exit();}
	
	$sql = "SELECT
				COUNT(*) AS usuario,
                id,
				tipo,
				estado
			FROM
				tm_usu_usuario
			WHERE
				login = '".$login."' AND
				pass  = '".$password."'";
				
    if ($result = $mysqli->query($sql)) { 
        $row = $result->fetch_object();
		if($row->usuario == 1){
			if($row->estado == 'Activo')
				$output = msgReturn(true,'¡Bienvenido!;'.$row->id.';'.$row->tipo); // msj cuando el usuario es valido
			else
				$output = msgReturn(false,'El Usuario '.$login.' esta Inactivo!.'); // msj cuando el usuario no es valido	
		}else
			$output = msgReturn(false,'El Login y Password no son v&aacute;lidos.'); // msj cuando el usuario no es valido
    } else {$output = msgReturn(false,'Error de conexi&oacute;n. No se puedo validar el Login y Password.');} //msj cuando la coneccion da error
	
    $result->close(); 
    unset($obj); 
    unset($sql);
	echo $output;
?>