<?php
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "practicaJS"; 

// Crear conexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexion
if ($conn->connect_error) {
  die("La conexión falló: " . $conn->connect_error);
}

// obtener todas las categorias
$sql = "SELECT id, nombre FROM categorias";
$result = $conn->query($sql);

// array para almacenar las categorias
$categorias = array();

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    // array para cada categoría y lo añadimos al array de categorias
    $categoria = array(
      "id" => $row["id"],
      "nombre" => $row["nombre"]
    );
    $categorias[] = $categoria;
  }
}

// categorías como JSON
echo json_encode($categorias);

$conn->close();
?>
