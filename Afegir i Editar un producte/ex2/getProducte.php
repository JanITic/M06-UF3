<?php
include "bd2.php";

if(isset($_GET["id"]) && !empty($_GET["id"])) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM productes WHERE id=" . $_GET["id"];
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $object = new stdClass();
        $object->nom = $row["nom"];
        $object->addEdit = $row["id"];
       
        echo json_encode($object);
    } else {
        echo "0 results";
    }

    $conn->close();
}
?>
