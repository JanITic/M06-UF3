// obtener elementos del DOM
const elements = {
  nom: document.querySelector("#validationNom"),
  cognoms: document.querySelector("#validationCognoms"),
  dni: document.querySelector("#validationDNI"),
  username: document.querySelector("#validationUsername"),
  email: document.querySelector("#validationEmail"),
  telefon: document.querySelector("#validationTelf"),
  feedbackNom: document.querySelector("#feedbackNom"),
  feedbackCognoms: document.querySelector("#feedbackCognoms"),
  feedbackDNI: document.querySelector("#feedbackDNI"),
  feedbackEmail: document.querySelector("#feedbackEmail"),
  feedbackTelf: document.querySelector("#feedbackTelf"),
  form: document.querySelector("#form-user-register")
};

// Validar NIF/NIE
function validateNIF_NIE(value) {
  const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  const str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  const nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8)) % 23;

  return validChars.charAt(charIndex) === letter;
}

// Validar mail
function validateEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

//  validar entrada
function validateInput(input, feedbackElement, validationFunction, errorMessage) {
  const value = input.value.trim();
  if (value === "") {
      $(input).removeClass("is-valid").addClass("is-invalid");
      $(feedbackElement).html(errorMessage);
  } else {
      if (validationFunction(value)) {
          $(input).removeClass("is-invalid").addClass("is-valid");
          $(feedbackElement).html("");
      } else {
          $(input).removeClass("is-valid").addClass("is-invalid");
          $(feedbackElement).html(errorMessage);
      }
  }
}

// Validar teléfono
function validateTelefon(telefon) {
  return /^\d{9}$/.test(telefon);
}

// Crear nombre de usuario
function createUsername(nom, cognoms, dni) {
  let username = "";
  cognoms = cognoms.replace(" ", "");
  username += nom.slice(0, 1).toLowerCase();
  username += cognoms.slice(0, 1).toUpperCase();
  username += cognoms.slice(1, 4).toLowerCase();
  for (let n = 0; n < 8; n += 2) {
      username += dni.slice(n, n + 1).toLowerCase();
  }
  elements.username.value = username;
}

elements.form.addEventListener('submit', function (e) {
  e.preventDefault();
});

// validar DNI/NIE si se pierde el foco
elements.dni.addEventListener('focusout', function () {
  validateInput(
      elements.dni,
      elements.feedbackDNI,
      function (value) { return validateNIF_NIE(value); },
      "DNI/NIE incorrecte"
  );
});

// validar correo electrónico si se pierde el foco
elements.email.addEventListener('focusout', function () {
  validateInput(
      elements.email,
      elements.feedbackEmail,
      function (value) { return validateEmail(value); },
      "Email incorrecte"
  );
});

// validar nombre si se pierde el foco
elements.nom.addEventListener('focusout', function () {
  validateInput(
      elements.nom,
      elements.feedbackNom,
      function (value) { return value !== ""; },
      "Aquest camp no pot estar buit"
  );
});

// validar apellidos si se pierden el foco
elements.cognoms.addEventListener('focusout', function () {
  validateInput(
      elements.cognoms,
      elements.feedbackCognoms,
      function (value) { return value !== ""; },
      "Aquest camp no pot estar buit"
  );
});

// validar número de teléfono si se pierde el foco
elements.telefon.addEventListener('focusout', function () {
  validateInput(
      elements.telefon,
      elements.feedbackTelf,
      function (value) { return validateTelefon(value); },
      "Telefon incorrecte"
  );
});