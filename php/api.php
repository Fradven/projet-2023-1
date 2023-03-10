<?php
session_start();

switch ($_POST["action"]) {
    case "login":
        include 'connection.php';
        break;

    case "session":
        if (!isset($_SESSION["id_user"]) && !isset($_COOKIE["id_user"]))
            echo json_encode(array("session" => "none"), true);
        else {
            if (isset($_SESSION["id_user"]))
                echo json_encode(array("session" => $_SESSION["id_user"]), true);
            else if (isset($_COOKIE["id_user"]))
                echo json_encode(array("session" => $_COOKIE["id_user"]), true);
        }
        break;

    case "cart":
        if (isset($_COOKIE["shopping_cart"])) {
            $cart = json_encode(array());
            setcookie("shopping_cart", $cart, time() + 60);
        }
        include 'cart.php';
        break;
}
include 'store.php';
