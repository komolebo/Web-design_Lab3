<?php

$data = json_decode($_POST['data']); // get argument

$doc = new DOMDocument('1.0');
$doc->formatOutput = true;
$root = $doc->createElement('root');
$doc->appendChild($root);

foreach($data as $record){	// analyze each record
	$message = $doc->createElement('message');
	$message = $root->appendChild($message);
	
	$datetime = $doc->createElement('date');
	$message->appendChild($datetime);
	$date_value = $doc->createTextNode($record[0]);
	$datetime->appendChild($date_value);
	echo "record[0]=" . $record[0];	

	$name = $doc->createElement('name');
	$message->appendChild($name);
	$name_value = $doc->createTextNode($record[1]);
	$name->appendChild($name_value);
	echo "record[1]=" . $record[1];
	
	$text = $doc->createElement('text');
	$message->appendChild($text);
	$text_value = $doc->createTextNode($record[2]);
	$text->appendChild($text_value);
	echo "record[2]=" . $record[2];	
}	
$doc->save("save/save.xml")
?>