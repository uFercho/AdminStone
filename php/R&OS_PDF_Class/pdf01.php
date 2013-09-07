<?php
include('class.ezpdf.php');
$pdf = new Cezpdf();
$pdf->selectFont('fonts/Helvetica.afm');
$pdf->ezText('Mi primer pdf en PHP', 30);
$pdf->ezStream();
?>