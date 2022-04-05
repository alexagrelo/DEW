
class Window {
    constructor(title, width, height, x, y, content) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.content = content;
    }

    setTitle(title) {
        this.title = title;
        document.title = this.title;
    }

    setContent(element) {
        
        document.body.appendChild = element;
    }


}

class Calculator extends Window {
    constructor(title, width, height, x, y, content) {
        super(title, width, height, x, y, content);
        // Creo el display
        let displayLineHist = `<input type="number" name="history" id="history" value="0" readonly aria-describedby="Historial"/>`;
        let displayLineInstant = `<input type="number" name="instantDisplay" id="instantDisplay" value="0" readonly aria-describedby="Display"/>`;

        // Creo botones por filas
        let btnMemoryClear = new Button("MC", "MC", "btnMemoryClear");
        let btnMemoryRecall = new Button("MR", "MR", "btnMemoryRecall");
        let btnMemorySum = new Button("M+", "M+", "btnMemorySum");
        let btnMemorySub = new Button("M-", "M-", "btnMemorySub");
        // let btnMemoryStore = new Button("MS", "MS", "btnMemoryStore");

        let btnPercent = new Button("%", "%", "btnPercent");
        let btnPartialClear = new Button("CE", "CE", "btnPartialClear");
        let btnClear = new Button("C", "C", "btnClear");
        let btnBack = new Button("<-", "<-", "btnBack");

        let btnInverse = new Button("1/x", "1/x", "btnInverse");
        let btnSquare = new Button("x²", "x²", "btnSquare");
        let btnSqrt = new Button("√", "√", "btnSqrt");
        let btnDiv = new Button("/", "/", "btnDiv");

        let btn7 = new Button("7", 7, "btn7");
        let btn8 = new Button("8", 8, "btn8");
        let btn9 = new Button("9", 9, "btn9");
        let btnMul = new Button("x", "x", "btnMul");

        let btn4 = new Button("4", 4, "btn4");
        let btn5 = new Button("5", 5, "btn5");
        let btn6 = new Button("6", 6, "btn6");
        let btnSub = new Button("-", "-", "btnSub");

        let btn1 = new Button("1", 1, "btn1");
        let btn2 = new Button("2", 2, "btn2");
        let btn3 = new Button("3", 3, "btn3");
        let btnSum = new Button("+", "+", "btnSum");

        let btnSignChange = new Button("+/-", "+/-", "btnSignChange");
        let btn0 = new Button("0", 0, "btn0");
        let btnDot = new Button(".", ".", "btnDot");
        let btnEqual = new Button("=", "=", "btnEqual");

        // Añado elementos
        content = `<div id="calculator">`;
        //  Display
        content += `<div class="row" id="lineHist"> ${displayLineHist} </div>`;
        content += `<div class="row" id="lineInstant"> ${displayLineInstant} </div>`;

        content += `<div class="row">
                        ${btnMemoryClear.getButton()}
                        ${btnMemoryRecall.getButton()}
                        ${btnMemorySum.getButton()}
                        ${btnMemorySub.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btnPercent.getButton()}
                        ${btnPartialClear.getButton()}
                        ${btnClear.getButton()}
                        ${btnBack.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btnInverse.getButton()}
                        ${btnSquare.getButton()}
                        ${btnSqrt.getButton()}
                        ${btnDiv.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btn7.getButton()}
                        ${btn8.getButton()}
                        ${btn9.getButton()}
                        ${btnMul.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btn4.getButton()}
                        ${btn5.getButton()}
                        ${btn6.getButton()}
                        ${btnSub.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btn1.getButton()}
                        ${btn2.getButton()}
                        ${btn3.getButton()}
                        ${btnSum.getButton()}
                    </div>`;

        content += `<div class="row">
                        ${btnSignChange.getButton()}
                        ${btn0.getButton()}
                        ${btnDot.getButton()}
                        ${btnEqual.getButton()}
                    </div>`;

        content += `</div>`;
        console.log('content: ', content);

        let calcElement = document.createElement("div");
        calcElement.innerHTML = content;
        this.setContent(calcElement);
        console.log('this.content = ', this.content);
        console.log('calcElement = ', calcElement);
    }
}

class Button {
    constructor(show, value, id) {
        this.show = show;
        this.value = value;
        this.id = id;
        // this.addEventListener("click", function() {

        // });
    }

    getButton() {
        return `<div class="col">
                    <button type="button" id="${this.id}" value="${this.value}">${this.show}</button>
                <div/>`;
    }

}

let calc = new Calculator("Calculadora", "500px", "500px", "0px", "0px", "content");
