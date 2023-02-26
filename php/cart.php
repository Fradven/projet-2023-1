<?php
$itemId = $_POST["itemId"];

require_once './includes/function.inc.php';

switch ("quantity") {
    case "add":
        addToCart($itemId);
        break;
    case "remove":
        removeFromCart($itemId);
        break;
}
