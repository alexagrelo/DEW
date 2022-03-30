//write your JS code here:
const sum = (items) => {
    const divTarget = document.getElementById('sum');
    divTarget.innerHTML = items.reduce((a, b) => a + b, 0);
    
    // let result = 0;
    // items.forEach(element => {
    //     result += element;
    // });
    // return result;
}

const multiplication = (items) => {
    let result = 0;
    items.forEach(element => {
        result *= element;
    });
    return result;
}

const add = (items) => {
    let result = [];
    items.forEach(element => {
        (element.isArray) ? element.forEach(e => result.push(e)) : result.push(element);
    });
    return `[${result.join(', ')}]`;

}

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
    items.forEach(element => result = result.concat(element));
    return `[${result.join(', ')}]`;
}

const concat = (items) => {
    let result = '';
    items.forEach(element => result += element);
    return result;
}

const sort = (items) => {
    let result = items.sort((a, b) => a - b);
    return `[${result.join(', ')}]`;
}



const divResults = document.getElementById('results');


