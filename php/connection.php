<?php
$username = $_POST["username"];
$pwd = $_POST["pwd"];
$rememberMe = $_POST["rememberMe"];

require_once './includes/function.inc.php';

login($username, $pwd, $rememberMe);
