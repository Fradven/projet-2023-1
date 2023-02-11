<?php
        
    $username = $_POST["username"];
    $pwd = $_POST["pwd"];
    $rememberMe = $_POST["rememberMe"];

    require_once './includes/function.inc.php';

    //send input to the database
    login($username, $pwd, $rememberMe);