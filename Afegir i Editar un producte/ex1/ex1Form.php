<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulari</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body class="container mt-5 w-80">
    <h2 class="mb-3">Formulari</h2>
    <?php 
        include "bd.php";

        $nom = "";
        $addEdit = 0;

        if(isset($_GET["id"]) && !empty($_GET["id"])) {
            // Connexió a la base de dades
            $conn = new mysqli(servername, username, password, dbname);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            // Obtenció de dades del producte
            $id = $_GET["id"];
            $sql = "SELECT * FROM productes WHERE id=$id";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $nom = $row["nom"];
                $addEdit = $row["id"];
            }

            $conn->close();
        }
    ?>

    <form action="ex1AddEdit.php" method="POST">
        <div class="form-group mb-2">
            <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="<?php echo $nom;?>">
        </div>
        
        <input type="hidden" name="addEdit" value="<?php echo $addEdit;?>"/>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form> 
</body>
</html>
