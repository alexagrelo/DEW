let currentContent = '';
let historyContent = '';
let lastButtonPressed = '';

let existsOperator = false;

let options = {
    title: '',
    width: '400px',
    height: '520px',
    x: '200px',
    y: '50px',
    content : ''
}

class Window {
    constructor({title, width, height, x, y, content}) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.content = content;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setContent(element) {
        this.content = element;
    }

    getContent() {
        return this.content;
    }
}

class Calculator extends Window {
    constructor(title, width, height, x, y, content) {
        super(title, width, height, x, y, content);
    }

}

class Button {
    constructor(show, value, id) {
        this.show = show;
        this.value = value;
        this.id = id;
    }

    getButton() {
        return `<div class="col">
                    <button type="button" id="${this.id}" value="${this.value}">${this.show}</button>
                </div>`;
    }

}

const buildCalculator = () => {
    // Creo el display
    let displayLineHist = `<input class="display form-control" type="text" name="history" id="history" value="" readonly aria-describedby="Historial"/>`;
    let displayLineInstant = `<input class="display form-control" type="text" name="instantDisplay" id="instantDisplay" value="0" readonly aria-describedby="Display"/>`;

    // Creo botones por filas

    let btnClear = new Button("C", " C ", "btnClear");

    let btn7 = new Button("7", 7, "btn7");
    let btn8 = new Button("8", 8, "btn8");
    let btn9 = new Button("9", 9, "btn9");
    let btnSum = new Button("+", " + ", "btnSum");


    let btn4 = new Button("4", 4, "btn4");
    let btn5 = new Button("5", 5, "btn5");
    let btn6 = new Button("6", 6, "btn6");
    let btnSub = new Button("-", " - ", "btnSub");


    let btn1 = new Button("1", 1, "btn1");
    let btn2 = new Button("2", 2, "btn2");
    let btn3 = new Button("3", 3, "btn3");
    let btnMul = new Button("x", " * ", "btnMul");

    let btn0 = new Button("0", 0, "btn0");
    let btnDot = new Button(".", ".", "btnDot");
    let btnEqual = new Button("=", "=", "btnEqual");
    let btnDiv = new Button("÷", " / ", "btnDiv");

    // Añado elementos al contenido del elemento HTML
    // Ventana: contenedor principal
    calcContent = `<div id="calculator" class="draggable">`;

    calcContent += `<div class="row" id="titleDiv">
                        <div class="col" id="titleCol">
                            <div id="titleText">${newCalculator.title}</div>
                        </div>
                    </div>`;

    calcContent += `<div id="display">
                        <div class="row">
                            <div class="col" id="lineHistory">${displayLineHist}</div>
                        </div>
                        <div class="row">
                            <div class="col" id="lineInstant">${displayLineInstant}</div>
                        </div>
                    </div>`;

    calcContent += `<div class="row buttonsLine">
                        ${btnClear.getButton()}
                    </div>`;

    calcContent += `<div class="row buttonsLine">
                        ${btn7.getButton()}
                        ${btn8.getButton()}
                        ${btn9.getButton()}
                        ${btnSum.getButton()}
                    </div>`;

    calcContent += `<div class="row buttonsLine">
                        ${btn4.getButton()}
                        ${btn5.getButton()}
                        ${btn6.getButton()}
                        ${btnSub.getButton()}
                    </div>`;

    calcContent += `<div class="row buttonsLine">
                        ${btn1.getButton()}
                        ${btn2.getButton()}
                        ${btn3.getButton()}
                        ${btnMul.getButton()}
                    </div>`;

    calcContent += `<div class="row buttonsLine">
                        ${btn0.getButton()}
                        ${btnDot.getButton()}
                        ${btnEqual.getButton()}
                        ${btnDiv.getButton()}
                    </div>`;
    return calcContent;
}

// Instancio el objeto calculadora y le asigno los valores indicados en el enunciado
let newCalculator = new Calculator(options);
newCalculator.setTitle("Calculadora");
newCalculator.setContent(buildCalculator());

document.body.innerHTML = newCalculator.getContent();
let calculatorDiv = document.getElementById("calculator");
calculatorDiv.style.width = newCalculator.width;
calculatorDiv.style.height = newCalculator.height;
calculatorDiv.style.marginLeft = newCalculator.x;
calculatorDiv.style.marginTop = newCalculator.y;
calculatorDiv.title = newCalculator.title;
