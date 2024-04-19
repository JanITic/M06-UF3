<!DOCTYPE html>
<html>

<head>
	<title></title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
		integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
		integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
		crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
		integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
		crossorigin="anonymous"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAwEQr8flR0CtMZ-jSs9hK8lscYUMOtVPk&callback=initMap"
		async defer></script>
	<link rel="stylesheet" href="style.css">

</head>

<?php
include ("db.php");

$conn = mysqli_connect($servername, $username, $password, $database);
?>

<body>
	<div class="container pt-5 pb-5">
		<h4>Formulari de registre de pisos</h4>

		<div class="row">
			<div class="col-6">
				<form id="form-user-register">
					<div class="form-row mt-5 mb-4">
						<div class="col-8">
							<label for="nom">Nom*</label>
							<input type="text" class="form-control" id="nom" value="" name="nom">
						</div>

						<div class="col-4">
							<label for="preu">Preu*</label>
							<input type="number" class="form-control" id="preu" value="" name="preu">
						</div>
					</div>

					<div class="form-row mb-4">
						<div class="col-4">
							<label for="via">Via</label>
							<select class="custom-select" id="via">
								<option selected>Open this select menu</option>
								<option value="1">Carrer</option>
								<option value="2">Torrent</option>
								<option value="3">Avinguda</option>
							</select>
						</div>

						<div class="col-4">
							<label for="nomVia">Nom</label>
							<input type="text" class="form-control" id="nomVia">
						</div>

						<div class="col-4">
							<label for="numeroVia">Número</label>
							<input type="number" class="form-control" id="numeroVia">
						</div>
					</div>

					<div class="form-row mb-4">
						<div class="col-4">
							<label for="pis">Pis</label>
							<input type="number" class="form-control" id="pis">
						</div>

						<div class="col-4">
							<label for="escala">Escala</label>
							<input type="number" class="form-control" id="escala">
						</div>

						<div class="col-4">
							<label for="porta">Porta</label>
							<input type="number" class="form-control" id="porta">
						</div>
					</div>

					<div class="form-row mb-4" id="map">
					</div>

					<div class="form-row mb-4">
						<div class="col-4">
							<label for="cp">CP</label>
							<input type="number" class="form-control" id="cp">
						</div>

						<div class="col-4">
							<label for="districte">Districte</label>
							<select class="custom-select select-districte" id="districte">
								<option selected>Open this select menu</option>
								<?php
								$consulta_districte = "SELECT * FROM districtes;";
								$output_districte = mysqli_query($conn, $consulta_districte);

								if (!$output_districte) {
									die("Error en la consulta: " . mysqli_error($conn));
								} else {
									while ($fila = mysqli_fetch_assoc($output_districte)) {
										$object = new stdClass();
										echo '<option value="' . $object->id = $fila["id"] . '">' . $object->name = $fila["name"] . '</option>';
									}
								}
								?>
							</select>
						</div>

						<div class="col-4">
							<label for="barri">Barri</label>
							<select class="custom-select select-barris" id="barri">
		
							</select>
						</div>
					</div>

					<div class="form-row mb-4">
						<div class="col-4">
							<label for="poblacio">Població</label>
							<select class="custom-select" id="poblacio">
								<option selected>Open this select menu</option>
								<option value="1">Barcelona</option>
							</select>
						</div>

						<div class="col-4">
							<label for="latitud">Latitud</label>
							<input type="number" class="form-control" id="latitud">
						</div>

						<div class="col-4">
							<label for="longitud">Longitud</label>
							<input type="number" class="form-control" id="longitud">
						</div>
					</div>

					<div class="form-row mb-4" id="text">
						<textarea>

						</textarea>
					</div>


				</form>
				<button class="btn btn-primary" onclick="coordenades()">Registrar</button>
				<button class=" btn btn-info" onclick="preview()">Visualitzar</button>
			</div>

			<div class=" col-6 pt-5" id="preview">
				<h4 id="nomPis">Nom + barri, districte</h4>
				<p id="dir">Via Nom Número Pis Escala Porta · CP · Districte · Barri · Pobliacio</p>
				<p id="preu">300€</p>
				<p>Text</p>

			</div>
		</div>
	</div>
	<script src="functions2.js"></script>
</body>


</html>