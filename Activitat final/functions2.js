// Obtener elementos del DOM
const elements = {
    nom: document.querySelector("#nom"),
    preu: document.querySelector("#preu"),
    via: document.querySelector("#via"),
    nomVia: document.querySelector("#nomVia"),
    numeroVia: document.querySelector("#numeroVia"),
    pis: document.querySelector("#pis"),
    escala: document.querySelector("#escala"),
    porta: document.querySelector("#porta"),
    cp: document.querySelector("#cp"),
    districte: document.querySelector("#districte"),
    barri: document.querySelector("#barri"),
    poblacio: document.querySelector("#poblacio"),
    text: document.querySelector("#text"),
    registre: document.querySelector("#preview"),
    selectBarris: document.querySelectorAll(".select-barris"),
    selectDistricte: document.querySelectorAll(".select-districte")
};

// Deshabilitar select de barris
elements.selectBarris.forEach(select => select.disabled = true);

// selección de distrito
elements.selectDistricte.forEach(select => {
    select.addEventListener("change", function() {
        const selectedValue = this.value;
        alert("Seleccionado: " + selectedValue);

        const formData = new FormData();
        formData.append("idDistricte", selectedValue);

        const options = {
            method: 'POST',
            body: formData
        };

        fetch('consultaBarris.php', options)
            .then(response => response.json())
            .then(data => {
                let opcionesHTML = '';
                data.forEach(barris => {
                    opcionesHTML += `<option id='barri' value='${barris.id}'>${barris.name}</option>`;
                });
                console.log(opcionesHTML);
                elements.selectBarris.forEach(select => {
                    select.disabled = false;
                    select.innerHTML = opcionesHTML;
                });
            })
            .catch(error => console.error('Error:', error));
    });
});

// obtener coordenadas
function coordenades() {
    const geocoder = new google.maps.Geocoder();
    const address = `${elements.via.options[elements.via.selectedIndex].text} ${elements.nomVia.value}, ${elements.numeroVia.value}, ${elements.poblacio.options[elements.poblacio.selectedIndex].text}`;

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lon = results[0].geometry.location.lng();
            const latitud = document.querySelector("#latitud");
            const longitud = document.querySelector("#longitud");

            latitud.value = lat;
            longitud.value = lon;
        } else {
            alert(address);
        }
    });
}

// previsualizar
function preview() {
    const message = `<h4 id="nomPis">${elements.nom.value} + ${elements.barri.options[elements.barri.selectedIndex].text}, ${elements.districte.options[elements.districte.selectedIndex].text}</h4>
        <p id="dir">${elements.via.options[elements.via.selectedIndex].text} ${elements.nomVia.value} ${elements.numeroVia.value} ${elements.pis.value} ${elements.escala.value} ${elements.porta.value} · ${elements.cp.value} · ${elements.districte.options[elements.districte.selectedIndex].text} · ${elements.barri.options[elements.barri.selectedIndex].text} · ${elements.poblacio.options[elements.poblacio.selectedIndex].text}</p>
        <p id="preu">${elements.preu.value}€</p>
        <p>${elements.text.value}</p>`;

    const updatedMessage = message.replace("[object HTMLInputElement]", "").replace("Open this select menu", "");
    console.log(updatedMessage);
    elements.registre.innerHTML = updatedMessage;
}


