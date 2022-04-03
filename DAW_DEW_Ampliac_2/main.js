const divResults = $("#results");
let output = '<div class="results">';
const OPERATIONS = [
    {operation: "push", data: [[1, 2, 3], 4]},
    {operation: "+", data: [1, 2, 3]},
    {operation: "+", data: [3]},
    {operation: "*", data: [2, 3]},
    {operation: "filter", data: [[1, 2, 3], 3]},
    {operation: "merge", data: [[1, 2, 3], [4, 5], [6], [7]]},
];

// FUNCIONES MATEMÁTICAS
// operation: "+"
const sum = (items) => {
    return (items.reduce((a, b) => a + b, 0)).toString();
}

// operation: "*"
const multiplication = (items) => {
    return (items.reduce((a, b) => a * b, 0)).toString();
}

// FUNCIONES DE ARRAYS
// operation: "push"
const add = function(items) {
    let result = [];
    items.forEach(element => {
        (Array.isArray(element)) ?
            element.forEach(e => result.push(e)) : 
            result.push(element);
    });
    return `[${result.join(', ')}]`;
    // return JSON.stringify(result);

}

// operation: "filter"
const extract = (items, term) => {
    let income = [];
    items.forEach(element => {
        (element.isArray) ? element.forEach(e => income.push(e)) : income.push(element);
    });
    result = income.filter( element => element !== term );
    return `[${result.join(', ')}]`;
}

const merge = (items) => {
    let result = [];
    items.forEach(element => 
        result = result.concat(element));
    return `[${result.join(', ')}]`;
}

// operation: "merge"
const concat = (items) => {
    let result = '';
    items.forEach(element => result += element);
    return result;
}

// output builder
const outputBuilder = (ops) => {ops.forEach(({operation, data}) => {
    switch (operation) {
        case 'push':
            console.log('entra en push');
            return output += `<p>${add(data)}</p>`;
        case '+':
            console.log('entra en sum');
            return output += `<p>${sum(data)}</p>`;
        case '*':
            console.log('entra en multiplication');
            return output += `<p>${multiplication(data)}</p>`;
        case 'filter':
            console.log('entra en extract');
            return output += `<p>${extract(data[0], data[1])}</p>`;
        case 'merge':
            console.log('entra en merge');
            return output += `<p>${merge(data)}</p>`;

    }
});
}

// Build output
outputBuilder(OPERATIONS);
output += '</div>';

// Show output
divResults.html(`<p>Resultados:</p>${output}`);
