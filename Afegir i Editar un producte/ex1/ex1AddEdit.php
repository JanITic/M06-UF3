<?php
include "bd.php";

if(isset($_POST["nomProducte"]) && !empty($_POST["nomProducte"])){
    // Connexió a la base de dades
    $conn = new mysqli(servername, username, password, dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $nomProducte = $_POST["nomProducte"];
    $addEdit = $_POST["addEdit"];

    if($addEdit == 0) {
        // INSERT
        $sql = "INSERT INTO productes (nom) VALUES ('$nomProducte')";
    } else {
        // UPDATE
        $sql = "UPDATE productes SET nom='$nomProducte' WHERE id=$addEdit";
    }

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}

header('Location: ex1List.php');
exit;
?>
