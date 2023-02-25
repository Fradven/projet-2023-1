<?php
session_start();
    switch($_POST["action"]) {
        case "kill":
            session_destroy();
            //setcookie("id_user","", time());
            echo json_encode(array("kill" => "session killed"), true);
            break;
    }