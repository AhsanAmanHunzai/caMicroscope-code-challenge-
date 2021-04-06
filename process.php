<?php
// $logFile = "view.log";
// $id = $_POST['id'];
$imgData = str_replace(' ','+',$_POST['id']);
$imgData =  substr($imgData,strpos($imgData,",")+1);
$imgData = base64_decode($imgData);
// Path where the image is going to be saved
$filePath = $_SERVER['DOCUMENT_ROOT']. '/Gsoc/test_cropped.png';
// Write $imgData into the image file
$file = fopen($filePath, 'w');
fwrite($file, $imgData);
fclose($file);



$command = escapeshellcmd('python image.py');
$output = shell_exec($command);
echo $output;

// file_put_contents($logFile, $id);
// echo $id;
?>