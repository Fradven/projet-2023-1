<?php
//filter for different page to see if there are no code injection
function filterdName($name)
{
    $newstr = filter_var($name, FILTER_SANITIZE_STRING);
    return $newstr;
}

function login($username, $pwd, $rememberMe) {
    $filename = "..".DIRECTORY_SEPARATOR."json".DIRECTORY_SEPARATOR."user.json";
    
    $contents = file_get_contents($filename);
    
    $liste = json_decode($contents,true);
    
    foreach($liste as $user) {
        if ($user["username"] == $username && $user["password"] == $pwd) {
            session_start();
            $_SESSION["id_user"] = $_POST["id"];
            echo json_encode(array("user" => $user),true);
        }
        else 
            echo json_encode(array("error" => "Action impossible"), true);

        if ($rememberMe) {
            setcookie("id_user",$_POST["id"], time()+(60*60));
            echo json_encode(array("user" => $user),true);
        }
    }

}