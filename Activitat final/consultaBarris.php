<?php
include ("db.php");

$conn = mysqli_connect($servername, $username, $password, $database);

if (isset($_POST['idDistricte'])) {
    $id = $_POST['idDistricte'];

    $response = array();

    $consulta_barris = "SELECT name, id
                        FROM barris
                        WHERE id_districte = $id
                        ORDER BY name ASC";

    $resultat_barris = mysqli_query($conn, $consulta_barris);

    if ($resultat_barris) {
        while ($fila = mysqli_fetch_assoc($resultat_barris)) {
            $response[] = $fila; 
        }

        $response_json = json_encode($response);

        echo $response_json;
    } else {
        echo "Error en la consulta: " . mysqli_error($conn);
    }
} else {
    echo "No se ha enviado la idDistricte";
}

