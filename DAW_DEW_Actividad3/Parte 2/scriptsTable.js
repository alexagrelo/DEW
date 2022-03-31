const titulo = $("#titulo");
const btnBack = $("#btn_back");
const divTable = $("#table_container");

// Recojo los valores de filas y columnas de la URI
const urlParams = new URLSearchParams(window.location.search);
const rowsNumber = Number(urlParams.get('rows'));
const columnsNumber = Number(urlParams.get('columns'));

// Elimino la tabla anterior si existe
const tablaAEliminar = $("#generated");
if (tablaAEliminar) {
    tablaAEliminar.remove();
    // console.log('Tabla anterior eliminada');
}

// Relleno y pinto el título
titulo.html(`<h3>Tabla de ${rowsNumber} filas y ${columnsNumber} columnas</h3>`);

// Rellenar tabla
let content = `<table id="generated" class="table table-striped table-bordered border-success">`;
for (let r = 1; r < (rowsNumber + 1); r++) {
    content += `<tr>`;
    for (let c = 1; c < (columnsNumber + 1); c++) {
        content += `<td>Row: ${r}, Col: ${c}</td>`
    }
    content += `</tr>`;
}
content += `</table>`;

// Pintar tabla
divTable.html(content);
