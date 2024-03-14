//user
function validarUsuari(input) {
  var valor = input.value.trim();
  var error = document.getElementById('error-nom');
  
  if (valor === '') {
      input.classList.add('error-input');
      input.classList.remove('valid-input'); // Assegura que no es quedi la classe de color verd
      error.textContent = 'Aquest camp és obligatori';
  } else {
      input.classList.remove('error-input');
      input.classList.add('valid-input'); // Afegeix la classe de color verd quan el camp és omplert
      error.textContent = '';
  }
}

//mail
function validarCorreu(input) {
  var correu = input.value.trim();
  var error = document.getElementById('error-correu');
  
  if (correu === '') {
      input.classList.add('error-input');
      input.classList.remove('valid-input');
      error.textContent = 'Aquest camp és obligatori';
  } else if (!validateEmail(correu)) {
      input.classList.add('error-input');
      input.classList.remove('valid-input');
      error.textContent = 'El correu electrònic no és vàlid';
  } else {
      input.classList.remove('error-input');
      input.classList.add('valid-input');
      error.textContent = '';
  }
}

function validateEmail(correu) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correu);
}

//passwd
function validarContrasenya(input) {
  var contrasenya = input.value;
  var errorList = document.getElementById('error-list');
  errorList.innerHTML = ''; // Limpiar la lista de errores

  var valid = true;

  // Comprobación de longitud
  if (contrasenya.length < 8 || contrasenya.length > 15) {
      valid = false;
      agregarError("La contrasenya ha de tenir entre 8 i 15 caràcters.");
  } else {
      agregarValid("La contrasenya té la longitud correcta.");
  }

  // Comprobación de minúsculas
  if (!/[a-z]/.test(contrasenya)) {
      valid = false;
      agregarError("La contrasenya ha de contenir almenys una lletra minúscula.");
  } else {
      agregarValid("La contrasenya conté una lletra minúscula.");
  }

  // Comprobación de mayúsculas
  if (!/[A-Z]/.test(contrasenya)) {
      valid = false;
      agregarError("La contrasenya ha de contenir almenys una lletra majúscula.");
  } else {
      agregarValid("La contrasenya conté una lletra majúscula.");
  }

  // Comprobación de números
  if (!/[0-9]/.test(contrasenya)) {
      valid = false;
      agregarError("La contrasenya ha de contenir almenys un número.");
  } else {
      agregarValid("La contrasenya conté almenys un número.");
  }

  // Comprobación de caracteres especiales
  if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(contrasenya)) {
      valid = false;
      agregarError("La contrasenya ha de contenir almenys un caràcter especial.");
  } else {
      agregarValid("La contrasenya conté almenys un caràcter especial.");
  }

  if (valid) {
      input.classList.remove('error-input');
      input.classList.add('valid-input');
      errorList.classList.remove('error');
      errorList.classList.add('valid');
  } else {
      input.classList.add('error-input');
      errorList.classList.remove('valid');
      errorList.classList.add('error');
  }
}

function agregarError(mensaje) {
  var errorList = document.getElementById('error-list');
  var errorItem = document.createElement('li');
  errorItem.textContent = mensaje;
  errorItem.classList.add('error-message'); // Añadir una clase para estilizar el mensaje
  errorList.appendChild(errorItem);
}

function agregarValid(mensaje) {
  var errorList = document.getElementById('error-list');
  var validItem = document.createElement('li');
  validItem.textContent = mensaje;
  validItem.classList.add('valid-message'); // Añadir una clase para estilizar el mensaje
  errorList.appendChild(validItem);
}

function validarFormulario(event) {
  var adreça = document.getElementById('adreça').value;
  var adreçaError = document.getElementById('adreça-error');

  if (adreça.trim() === "") {
      adreçaError.textContent = "L'adreça postal és obligatòria.";
      event.preventDefault(); // Evita el envío del formulario
  } else {
      adreçaError.textContent = "";
  }
}

document.getElementById("myForm").addEventListener("submit", validarFormulario);

function validarFormulario() {
  // Realizar validaciones de todos los campos aquí
  var nom = document.getElementById('nom').value;
  var email = document.getElementById('email').value;
  var contrasenya = document.getElementById('contrasenya').value;
  var adreça = document.getElementById('adreça').value;

  if (nom.trim() === "" || email.trim() === "" || contrasenya.trim() === "" || adreça.trim() === "") {
      alert("Tots els camps són obligatoris.");
      return false; // Evita el envío del formulario si algún campo está vacío
  }

  return true; // Envía el formulario si todas las validaciones son exitosas
}
