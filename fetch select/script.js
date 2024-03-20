document.addEventListener("DOMContentLoaded", function () {
    const categoriaSelect = document.getElementById('categoriaSelect');
    const subcategoriaSelect = document.getElementById('subcategoriaSelect');
  
    cargarCategorias();
  
    // cargar categorias desde el server
    function cargarCategorias() {
      fetch('categorias.php')
        .then(response => response.json())
        .then(data => {
          data.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.textContent = categoria.nombre;
            categoriaSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error al obtener categorías:', error));
    }
  
    // obtener y cargar las subcategorias cuando cambie la categoria seleccionada
    categoriaSelect.addEventListener('change', obtenerSubcategorias);
  
    // obtener y cargar las subcategorias
    function obtenerSubcategorias() {
      const categoriaSeleccionada = categoriaSelect.value;
      subcategoriaSelect.innerHTML = "<option value=''>Selecciona una subcategoría</option>";
  
      if (categoriaSeleccionada !== "") {
        const formData = new FormData();
        formData.append("cat1", categoriaSeleccionada);
  
        fetch('getSubCats.php', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(data => {
            data.forEach(subcategoria => {
              const option = document.createElement('option');
              option.value = subcategoria.id;
              option.textContent = subcategoria.nombre;
              subcategoriaSelect.appendChild(option);
            });
          })
          .catch(error => console.error('Error al obtener subcategorías:', error));
      }
    }
});
