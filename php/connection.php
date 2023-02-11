<?php
if (isset($_POST["login"])) {
        
    $username = $_POST["username"];
    $pwd = $_POST["pwd"];
    $rememberMe = $_POST["rememberMe"];

    require_once 'function.inc.php';

    if ($username !== filterdName($username)){
        exit();
    }

    if ($pwd !== filterdName($pwd)){
        exit();
    }

    //send input to the database
    login($username, $pwd, $rememberMe);

} else {
    exit();
}