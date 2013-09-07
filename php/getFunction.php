<?php

	class ClassDB_Conex{
		private $localhost 	= 'localhost';
		private $mysql_db 	= 'admins_db';
		private $mysql_user = 'root';
		private $mysql_pass = ''; 
	
		public function getHost(){return $this->localhost;}
		public function getDB(){return $this->mysql_db;}
		public function getUser(){return $this->mysql_user;}
		public function getPass(){return $this->mysql_pass;}
	}

	
	function newMySQLi()
	{
		$db = new ClassDB_Conex();
		
		return new mysqli($db->getHost(), $db->getUser(), $db->getPass(), $db->getDB());
	}

	function formatDateTime($date/*, $time*/) // Convierte una fecha en formato DateTime
	{
		$dateTime = trim($date)!='' ? substr(trim($date),6,4).'-'.substr(trim($date),3,2).'-'.substr(trim($date),0,2) : '';
		/*$dateTime.= trim($time)!='' ? ' '.trim($time) : '';*/
		return $dateTime;		
	}
	
	
	function msgReturn($success,$msg)
	{
		if($success) 
			return '{success:true, msg:'.json_encode(utf8_encode($msg)).'}';
		else 
			return '{"success":false, msg:'.json_encode(utf8_encode($msg)).'}';
	}
	
	function Valida_root($root){
		$root = str_replace("-", "", $root);
        $root = str_replace(" ", "", $root);
		return $root;
	}
	
	function Sustituto_Cadena($rb){ 
        ## Sustituyo caracteres en la cadena final
        $rb = str_replace("รก", "แ", $rb);
        $rb = str_replace("รฉ", "้", $rb);
        //$rb = str_replace("ยฎ", "&reg;", $rb);
        $rb = str_replace("รญ", "ํ", $rb);
        $rb = str_replace("๏ฟฝ", "อ", $rb);
        $rb = str_replace("รณ", "๓", $rb);
        $rb = str_replace("รบ", "๚", $rb);
        //$rb = str_replace("n~", "&ntilde;", $rb);
        //$rb = str_replace("ยบ", "&ordm;", $rb);
        //$rb = str_replace("ยช", "&ordf;", $rb);
        $rb = str_replace("รยก", "ม", $rb);
        $rb = str_replace("รฑ", "๑", $rb);
        $rb = str_replace("ร‘", "ั", $rb);
        //$rb = str_replace("รยฑ", "&ntilde;", $rb);
        //$rb = str_replace("n~", "&ntilde;", $rb);
        $rb = str_replace("ร", "ฺ", $rb);
        return $rb;
	}
	
	function Sustituto_Acento($rb){ 	
        $rb = str_replace("&aacute;", "แ", $rb);
        $rb = str_replace("&eacute;", "้", $rb);
        $rb = str_replace("&iacute;", "ํ", $rb);
        $rb = str_replace("&oacute;", "๓", $rb);
        $rb = str_replace("&uacute;", "๚", $rb);
        $rb = str_replace("&Aacute;", "ม", $rb);
        $rb = str_replace("&Eacute;", "ษ", $rb);
        $rb = str_replace("&Iacute;", "อ", $rb);
        $rb = str_replace("&Oacute;", "ำ", $rb);
        $rb = str_replace("&Uacute;", "ฺ", $rb);
        return $rb;
	}
	
	function intToWeek($i) // Convierte una fecha en formato DateTime
	{
		switch($i) {
			case '0': return 'Domingo'; break;
			case '1': return 'Lunes'; break;
			case '2': return 'Martes'; break;
			case '3': return 'Miercoles'; break;
			case '4': return 'Jueves'; break;
			case '5': return 'Viernes'; break;
			case '6': return 'Sabado'; break;
		}
	}
	
	function objectToArray($d) {
		if (is_object($d)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$d = get_object_vars($d);
		}
 
		if (is_array($d)) {
			/*
			* Return array converted to object
			* Using __FUNCTION__ (Magic constant)
			* for recursive call
			*/
			return array_map(__FUNCTION__, $d);
		}
		else {
			// Return array
			return $d;
		}
	}

?>