<?php
if (!isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
    header('HTTP/1.0 403 Forbidden');
    die('You are not allowed to access this file.');     
}
header('Content-type: application/json');
echo "We are inside the script";
$url=$_GET['url'];
echo $url;
$response=$_GET['response'];
echo $response;
$secret = "[6LeVDb4ZAAAAAHfdWoXtd3HzkHE0JXjfcMVPd4yX]"; 
echo $secret;
$params = array('secret'=> $secret, 'response'=> $response);
$json=file_get_contents( $url  . '?secret=' . $secret . '&amp;response=' . $response);
echo $json; 
?>