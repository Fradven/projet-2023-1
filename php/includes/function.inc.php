<?php

function login($username, $pwd, $rememberMe)
{
    $filename = ".." . DIRECTORY_SEPARATOR . "json" . DIRECTORY_SEPARATOR . "user.json";
    $contents = file_get_contents($filename);
    $liste = json_decode($contents, true);
    $userID = "";

    foreach ($liste as $user) {
        if ($user["username"] == $username && $user["password"] == $pwd) {
            $userID = $user["id"];
            $_SESSION["id_user"] = $userID;
            echo json_encode(array('user' => $user), true);

            if ($rememberMe) {
                setcookie("id_user", $userID, time() + 60);
            }

            exit;
        }
    }

    echo json_encode(array("error" => "Wrong username or password!"), true);
}
