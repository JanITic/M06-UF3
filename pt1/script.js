// Declarar una array buida donde irán todos los archivos
const files = [];

// Declarar los objetos que utilizaremos
const dropArea = document.querySelector(".drop-area");
const dragDropText = document.querySelector("h2");
const button = document.querySelector("button");
const input = document.getElementById("input-file");
const preview = document.getElementById("preview");

// Invalidar la acción por defecto para los eventos de drag & drop
const preventDefault = (e) => {
  e.preventDefault();
};

["dragover", "dragleave", "drop"].forEach((evt) => {
  dropArea.addEventListener(evt, preventDefault);
});

dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("active");
  dragDropText.textContent = "Drop files here";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
});

dropArea.addEventListener("drop", (event) => {
  // Evitar el comportamiento por defecto
  event.preventDefault();

  // Recoger los archivos soltados
  const droppedFiles = event.dataTransfer.files;

  // Convertir FileList a Array y agregarlos a la lista de archivos
  files.push(...Array.from(droppedFiles));

  // Mostrar la previsualización de las imágenes
  showFiles();

  // Devolver la apariencia de la zona de soltar a su estado original
  dropArea.classList.remove("active");
  dragDropText.textContent = "Drag & Drop files";
});

//punt 7
function showFiles() {
  // Limpiar el contenido actual del div de previsualización
  preview.innerHTML = "";

  // Verificar si hay archivos en la lista
  if (files.length > 0) {
    // Iterar sobre cada archivo y llamar a la función processFile
    files.forEach(processFile);
  }
}

//punt 8
function processFile(file) {
  // Verificar si el archivo es una imagen válida
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  const docType = file.type;
  if (!validExtensions.includes(docType)) {
    // Mostrar un mensaje de error y eliminar el archivo de la lista
    console.error("Archivo no válido:", file.name);
    return;
  }

  // Leer el archivo como URL de datos
  let reader = new FileReader();
  reader.readAsDataURL(file);

  // Callback cuando se complete la lectura del archivo
  reader.onload = () => {
    // Crear un div para la previsualización del archivo
    let prev = `<div class="previewImage">
        <img src="${reader.result}" />
        <span>${file.name}</span>
        <span onclick="removeBtn(${files.indexOf(file)})" class="material-symbols-outlined removeBtn">c</span>
    </div>`;

    // Agregar el div al div de previsualización
    preview.insertAdjacentHTML("beforeend", prev);
  };
}

//punt 9
function removeBtn(index) {
  // Eliminar el archivo de la lista
  files.splice(index, 1);

  // Volver a mostrar los archivos actualizados
  showFiles();
}

//punt 10
button.addEventListener("click", (e) => {
  e.preventDefault();
  input.click();
});

//punt 11
input.addEventListener("change", () => {
  // Recoger los archivos seleccionados
  const selectedFiles = input.files;

  // Convertir FileList a Array y agregarlos a la lista de archivos
  files.push(...Array.from(selectedFiles));

  // Mostrar la previsualización de las imágenes
  showFiles();

  // Limpiar el valor del input para permitir seleccionar los mismos archivos
  input.value = null;
});
