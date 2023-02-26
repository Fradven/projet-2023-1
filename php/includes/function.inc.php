<?php

function login($username, $pwd, $rememberMe)
{
    $filename = ".." . DIRECTORY_SEPARATOR . "json" . DIRECTORY_SEPARATOR . "user.json";
    $contents = file_get_contents($filename);
    $liste = json_decode($contents, true);

    foreach ($liste as $user) {
        if ($user["username"] == $username && $user["password"] == $pwd) {
            $userID = $user["id"];
            $_SESSION["id_user"] = $userID;
            echo json_encode(array('user' => $user), true);

            if ($rememberMe == "true") {
                setcookie("id_user", $userID, time() + 60);
            }

            exit;
        }
    }

    echo json_encode(array("error" => "Wrong username or password!"), true);
}


function addToCart($itemId)
{
    include_once '../class/CartItem.class.php';

    $filename = ".." . DIRECTORY_SEPARATOR . "json" . DIRECTORY_SEPARATOR . "albums.json";
    $contents = file_get_contents($filename);
    $albums = json_decode($contents, true);
    $cart = unserialize($_COOKIE['shopping_cart']);

    $cartItem = new CartItem;

    foreach ($albums as $album) {
        if ($album["id"] == $itemId) {

            if (empty($cart)) {
                $cartItem->set_id($itemId);
                $cartItem->set_qtty(1);
                $cart[] = $cartItem;
            } else {
                foreach ($cart as $item) {
                    if ($item->get_id() == $itemId)
                        $item->set_qtty($item->get_qtty() + 1);
                    else {
                        $cartItem->set_id($itemId);
                        $cartItem->set_qtty(1);
                        $cart[] = $cartItem;
                    }
                }
            }

            setcookie('shopping_cart', serialize($cart), time() + (60));
        }
    }
}

function removeFromCart($itemId)
{
    include_once '../class/CartItem.class.php';

    $filename = ".." . DIRECTORY_SEPARATOR . "json" . DIRECTORY_SEPARATOR . "albums.json";
    $contents = file_get_contents($filename);
    $albums = json_decode($contents, true);
    $cart = unserialize($_COOKIE['shopping_cart']);

    $cartItem = new CartItem;

    foreach ($albums as $album) {
        if ($album["id"] == $itemId) {
            foreach ($cart as $item) {
                if ($item->get_id() == $itemId && $item->get_qtty() > 0)
                    $item->set_qtty($item->get_qtty() - 1);
            }

            setcookie('shopping_cart', serialize($cart), time() + (60));
        }
    }
}
