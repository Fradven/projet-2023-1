<?php
session_start();
    switch($_POST["action"]) {
        case "kill":
            session_destroy();
            echo json_encode(array("kill" => "session killed"), true);
            break;
    }