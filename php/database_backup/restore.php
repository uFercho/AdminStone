<?php
	header("Content-Type: text/plain"); 
	include_once("../getFunction.php");

	$db = new ClassDB_Conex();
	
	$mysql	= '"D:\Mis Archivos\wamp\bin\mysql\mysql5.1.53\bin\mysql.exe"';
	$dir_backup	= '"D:\Mis Archivos\wamp\www\Proyec_Pichu\php\database_backup\backup_db_04-Jul-2011_08.23.04.sql"';
	
	$command = $mysql.' -h '.$db->getHost().' -u '.$db->getUser().' '.$db->getPass().' '.$db->getDB().' < '.$dir_backup.'';
	
	/*system($command, $return);*/$return = 0;
	
	$timeName = date('d-M-Y_H.i.s');
	sleep(2);
	
	if($return == 0)
		echo 'Restor Exitoso!. Archivo de Restauraci&oacute;n: backup_db_'.$timeName.'.sql';
	else
		echo 'ERROR! - Hubo un problema al Restaurar el Archivo: backup_db_'.$timeName.'.sql';
?>