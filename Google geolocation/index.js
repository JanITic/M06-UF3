let map;

//Declarar el mapa en el punto inicial
function initMap() {
  const myLatLng = { lat: 41.40244879999999, lng: 2.1943175 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: myLatLng,
  });

  const marker = new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });

  // obtenir la latitud y longitud de una direcció
  function obtenerLatitudLongitud(direccion) {
    let geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ 'address': direccion }, function(results, status) {
      if (status === 'OK') {
        let latitud = results[0].geometry.location.lat();
        let longitud = results[0].geometry.location.lng();
        
        // Mostrar la latitud y longitud
        document.getElementById("latitude").value = latitud;
        document.getElementById("longitude").value = longitud;

        // Centrar mapa en la ubi
        map.setCenter({ lat: latitud, lng: longitud });
        map.setZoom(16);

        // New Marker
        const newMarker = new google.maps.Marker({
          position: { lat: latitud, lng: longitud },
          map,
          title: "Nueva ubicación",
        });
      } else {
        // Mensaje de error si no se encuentra
        alert("La dirección no se ha encontrado.");
      }
    });
  }

  // botón "Buscar adreça"
  document.getElementById("findLoc").addEventListener("click", function() {
    let direccion = document.getElementById("adreca").value;
    obtenerLatitudLongitud(direccion);
  });
}
