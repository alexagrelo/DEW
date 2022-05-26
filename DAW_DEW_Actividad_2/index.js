// Variables
const divTable = $("#table-container");

// Creating an XMLHttpRequest object
const xhttp = new XMLHttpRequest();

// Defining a callback function
xhttp.onload = function() {
  if(this.readyState == 4 && this.status == 200) {
    // Convertir textResponse en un objeto JS
    const EMPLOYEES = JSON.parse(this.responseText);

    // Cargo el html como texto en una variable
    let contenido = '';

    // Table Head
    contenido = ` 
      <table class="table text-center table-success table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th class="text-left pl-5">Name</th>
            <th>Department</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>`
    ;

    // Table Body
    EMPLOYEES.forEach( ({ id, name, department, control }) => {

      contenido += (control=== 0) ?
        `
        <tr class="text-danger font-italic">
          <td class="fw-bold">${id}</td>
          <td class="text-left pl-5">${name}</td>
          <td>${department}</td>
          <td>${control}</td>
        </tr>
        `
        :           
        
        `
          <tr >
            <td class="fw-bold">${id}</td>
            <td class="text-left pl-5">${name}</td>
            <td>${department}</td>
            <td>${control}</td>
          </tr>
        `
        ;
    });

    contenido += `</tbody></table>`;
    
    // Table Show
    divTable.html(contenido)

  } 
}

// Sending a request
xhttp.open("GET", "./employees.json");
xhttp.send();