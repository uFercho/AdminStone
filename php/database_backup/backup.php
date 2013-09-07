<?php
	include_once("../getFunction.php");

	$db = new ClassDB_Conex();
	
	$mysqldump	= '"C:\wamp\bin\mysql\mysql5.5.8\bin\mysqldump.exe"';
	$timeName = date('d-M-Y_H.i.s');
	$dir_backup	= '"C:\wamp\www\Proyec_Pichu\php\database_backup\backup_db_'.$timeName.'.sql"';
	
	$command = $mysqldump.' -h '.$db->getHost().' -u '.$db->getUser().' '.$db->getPass().' '.$db->getDB().' > '.$dir_backup.'';
	
	system($command, $return);
	
	if($return == 0)
		echo 'Respaldo Exitoso!. Archivo generado: backup_db_'.$timeName.'.sql';
	else
		echo 'No se pudo realizar el respaldo de la BD. Contacte al administrador del Sistema';
?>