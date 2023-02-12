<?php
    $filename = "..".DIRECTORY_SEPARATOR."json".DIRECTORY_SEPARATOR."albums.json";
    $contents = file_get_contents($filename);
    $liste = json_decode($contents,true);

    switch($_POST["action"]) {
        case "liste":
            echo $contents;
            break;
    }
