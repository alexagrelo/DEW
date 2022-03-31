const submitForm = (evt) => {
    // Prevenir recarga de página completa
    evt.preventDefault();
    
    // Recoger valores de los inputs del formulario que genera el evento
    const datos = Object.fromEntries(new FormData(evt.target));
    const AGE = datos.age;
    const HEIGHT = datos.height;

    // Eliminar Listado con id 'routeList' si existe
    const divRoute = document.getElementById('routeList');
    if (divRoute) {
        divRoute.innerHTML = '';
    }

    // Llamamos al método que filtra las atracciones según los valores de edad y altura
    const filteredRoute = routeFilter(AGE, HEIGHT);

    // ***************************************
    // **************  HTML ******************
    // ***************************************

    // Cargo el html como texto en una variable
    let content = '';

    // Comienzo del listado
    content = 
    ` 
    <h1 class="mt-3 text-success text-center">Virtual Guide:</h1>
    <p>
        <ul>
    `;

    // Atracciones a mostrar
    filteredRoute.forEach((attraction) => {

        content +=
        `
            <li>${ attraction.name }
                <ul>
                    <li>
                        Description: ${ attraction.description }
                    </li>
        `;

        if(attraction.min_age_years) content += `<li>Minimum age: ${ attraction.min_age_years } years.</li>`
        if(attraction.max_age_years) content += `<li>Maximum age: ${ attraction.max_age_years } years.</li>`
        if(attraction.min_height_cm) content += `<li>Minimum height: ${ attraction.min_height_cm } cm.</li>`
        if(attraction.max_height_cm) content += `<li>Maximum height: ${ attraction.max_height_cm } cm.</li>`

        content += `</ul></li>`
    });
    
    content += `</ul></p>`;

    if (filteredRoute.length === 0) content = '<h3 class="text-danger">There isn\'t any attraction with this requirements</h3>';
    // ***************************************
    // **********  MOSTRAR LISTADO  **********
    // ***************************************

    divRoute.innerHTML = content;
}

// Recojo el evento al presionar el botón de crear ruta
// y llamo a la función que filtra, crea y muestra la misma
const form = document.getElementById('visitorForm');
form.addEventListener('submit', submitForm);