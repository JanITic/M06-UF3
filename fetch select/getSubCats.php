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

// Obtenemos la categoria seleccionada
$cat = $_POST['cat1']; 

// Consulta para obtener las subcategorias de la categoria seleccionada
$sql = "SELECT id, nombre FROM subcategorias WHERE id_categoria = $cat"; 
$result = $conn->query($sql);

// Creamos array para almacenar las subcategorias
$subcategorias = array();

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    // Creamos array para cada subcategoria y lo añadimos al array de subcategorias
    $subcategoria = array(
      "id" => $row["id"],
      "nombre" => $row["nombre"]
    );
    $subcategorias[] = $subcategoria;
  }
}

// Devolvemos subcategorias como JSON
echo json_encode($subcategorias);

$conn->close();
?>
