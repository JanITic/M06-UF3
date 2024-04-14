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
    <div class="row">
        <div class="col">
            <h2 class="mb-3">Formulari</h2>

            <form id="productForm" method="POST">
                <div class="form-group mb-2">
                    <input type="text" class="form-control" id="nomProducte" name="nomProducte" placeholder="Nom" value="">
                </div>
                
                <input type="hidden" name="addEdit" id="addEdit" value="0"/>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form> 
        </div>
        <div class="col">
            <h2 class="mb-3">Llistat</h2>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Remove</th>
                    </tr>
                </thead>
                
                <tbody id="productList">
                <?php
                    include "bd2.php"; // Inclou el fitxer amb les definicions de les variables de connexió

                    $conn = new mysqli($servername, $username, $password, $dbname);
                    if ($conn->connect_error) {
                        die("Connection failed: " . $conn->connect_error);
                    }

                        $sql = "SELECT * FROM productes";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while($row = $result->fetch_assoc()) {
                                echo '<tr>
                                        <th scope="row">' . $row["id"] . '</th>
                                        <td>' . $row["nom"] . '</td>
                                        <td><p idProd="' . $row["id"] . '" class="btnEdit btn btn-outline-info">Edit</p></td>
                                        <td><a href="ex2Delete.php?id=' . $row["id"] . '" class="btn btn-outline-danger">Remove</a></td>
                                    </tr>';
                            }
                        } else {
                            echo "0 results";
                        }

                        $conn->close();
                    ?>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const btnEdit = document.querySelectorAll(".btnEdit");

            btnEdit.forEach(el => {
                el.addEventListener("click", function() {
                    const id = this.getAttribute("idProd");

                    fetch(`getProducte.php?id=${id}`)
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById("nomProducte").value = data.nom;
                            document.getElementById("addEdit").value = data.addEdit;
                        })
                        .catch(error => console.error('Error:', error));
                });
            });

            const productForm = document.getElementById('productForm');

            productForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const formData = new FormData(this);

                fetch('ex2AddEdit.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.text())
                .then(result => {
                    console.log(result);
                    // Handle success or error if needed
                    // Reload or update the product list
                    document.getElementById("nomProducte").value = '';
                    document.getElementById("addEdit").value = '0';
                    location.reload(); // Reload the page after submit
                })
                .catch(error => console.error('Error:', error));
            });
        });
    </script>
</body>
</html>
