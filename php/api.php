<?php
    session_start();
    $filename = "..".DIRECTORY_SEPARATOR."json".DIRECTORY_SEPARATOR."utilisateurs.json";
    
    $contents = file_get_contents($filename);
    
    $liste = json_decode($contents,true);
        
    switch($_POST["action"]) {
        case "liste":
            echo $contents;
        break;
        case "afficher":
            $id = $_POST["id"];
            foreach($liste as $u) {
                if($u["id"] == $id) {
                    echo json_encode(array("user" => $u),true);
                    exit;
                }
            }
            echo json_encode(array("error" => "Utilisateur introuvable"), true);
        break;
        case "modifier":
            foreach($liste as $k => $u) {
                if($u["id"] == $_POST["id"]) {
                    $liste[$k]["description"] = $_POST["description"];
                    file_put_contents($filename,json_encode($liste));
                    echo json_encode(array("success" => "L'utilisateur ".$u["id"]." a été modifié"),true);
                    exit;
                }
            }
            echo json_encode(array("error" => "Utilisateur introuvable"), true);
        break;
        case "ajouter":
            $last_id = 1;
            foreach($liste as $k => $u) {
                if($last_id <= $u["id"]) $last_id = $u["id"]+1;
            }
            
            $nouveau = array(
                "id" => $last_id,
                "nom" => $_POST["nom"],
                "prenom" => $_POST["prenom"],
                "description" => $_POST["description"]
            );

            $liste[] = $nouveau;
            file_put_contents($filename,json_encode($liste));
            
            echo json_encode(array("success" => "L'utilisateur ".$last_id." a bien été ajouté"), true);
        break;
        case "load_cookie":
            if(isset($_COOKIE["id_user"])) {
                $id = $_COOKIE["id_user"];
                foreach($liste as $u) {
                    if($u["id"] == $id) {
                        echo json_encode(array("user" => $u),true);
                        exit;
                    }
                }
                echo json_encode(array("error" => "Cookie : Utilisateur $id introuvable"), true);
            }
            else echo json_encode(array("error" => "Cookie invalide"), true);
        break;
        case "load_session":
            if(isset($_SESSION["id_user"])) {
                $id = $_SESSION["id_user"];
                foreach($liste as $u) {
                    if($u["id"] == $id) {
                        echo json_encode(array("user" => $u),true);
                        exit;
                    }
                }
                echo json_encode(array("error" => "Session : Utilisateur $id introuvable"), true);
            }
            else echo json_encode(array("error" => "Session invalide"), true);
        break;
        case "save_cookie":
            setcookie("id_user",$_POST["id"], time()+(60*60));
            echo json_encode(array("success" => "Le cookie a bien été enregistré"), true);
        break;
        case "save_session":
            $_SESSION["id_user"] = $_POST["id"];
            echo json_encode(array("success" => "La session a bien été enregistrée"), true);
        break;
        case "kill":
            session_destroy();
            setcookie("id_user","", time());
            echo json_encode(array("success" => "Les données ont été supprimées"), true);
        break;
        default:
            echo json_encode(array("error" => "Action impossible"), true);
        break;
    }

    
    
    
    
?>