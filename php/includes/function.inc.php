<?php

function login($username, $pwd, $rememberMe) {
    $filename = "..".DIRECTORY_SEPARATOR."json".DIRECTORY_SEPARATOR."user.json";
    
    $contents = file_get_contents($filename);
    
    $liste = json_decode($contents,true);
    
    foreach($liste as $user) {
        if ($user["username"] == $username && $user["password"] == $pwd) {
            echo json_encode(array('user' => $user), true);
            exit;
        }

        if ($rememberMe) {
        }
        
    }
    echo json_encode(array("error" => "Action impossible"), true);

}