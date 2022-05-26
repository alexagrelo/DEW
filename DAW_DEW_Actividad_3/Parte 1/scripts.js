// Función que recoge el evento submit, crea la tabla, la pinta y resetea los campos del formulario
const submitForm = (evt) => {

    // Prevenir recarga de página completa
    evt.preventDefault();

    // Recoger valores de los inputs
    // const rowsNumber = parseInt(form[0].value);
    // const columnsNumber = parseInt(form[1].value);
    let data = Object.fromEntries(new FormData(evt.target));
    let rowsNumber = Number(data.rows);
    let columnsNumber = Number(data.columns);

    // Eliminar Tabla con id 'generated' si existe
    const tablaAEliminar = document.getElementById('generated');
    if (tablaAEliminar) {
        const parent = tablaAEliminar.parentNode;
        parent.removeChild(tablaAEliminar);
        console.log('Tabla anterior eliminada');
    }

    // Rellenar tabla
    const divTable = document.getElementById('table_container');
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
    divTable.innerHTML = content;

    divTable.focus();

}

const form = document.getElementById('tableForm');
form.addEventListener('submit', submitForm);