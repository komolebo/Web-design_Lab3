<?php
$doc = new DOMDocument();
$doc->load('save/save.xml');

echo $doc->saveXML();
?>