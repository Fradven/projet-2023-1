<?php
session_start();

switch ($_POST["action"]) {
    case "login":
        include 'connection.php';
        break;
    case "session":
        if (!isset($_SESSION["id_user"])) {
            echo json_encode(array("session" => "none"), true);
        } else
            echo json_encode(array("session" => $_SESSION["id_user"]), true);
}
include 'store.php';
