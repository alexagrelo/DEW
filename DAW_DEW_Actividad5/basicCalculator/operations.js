const OPERATORS = [
    {
        id: "btnMul",
        numOperands: 2,
        symbol: "x",
        calc: function (a, b) {
            return a * b;
        }
    },
    {
        id: "btnDiv",
        numOperands: 2,
        symbol: "÷",
        calc: function (a, b) {
            return a / b;
        }
    },
    {
        id: "btnSum",
        numOperands: 2,
        symbol: "+",
        calc: function (a, b) {
            return a + b;
        }
    },
    {
        id: "btnSub",
        numOperands: 2,
        symbol: "-",
        calc: function (a, b) {
            return a - b;
        }
    }
];

let currentContentDiv = $("#instantDisplay");
currentContent = currentContentDiv.text();
let historyContentDiv = $("#history");


// Event Handlers.

const handleButtonClick = (evt) => {
    let btn = evt.target;
    let btnId = btn.id;
    let btnValue = btn.value;
    // console.log('lastButtonPressed', lastButtonPressed);
    // console.log('btnId', btnId);

    if (btnId === 'btnClear') {
        console.log('btnClear entra en el if');
        currentContent = '';
        historyContent = '';
        lastButtonPressed = '';
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        // console.log('currentContent', currentContent);
        // console.log('historyContent', historyContent);
        // console.log('lastButtonPressed', lastButtonPressed);
        return;
    }

    if((currentContent === '' || currentContent === '0') && (btnValue === '0')) {
        return;
    }

    if((currentContent === '' || currentContent === '0') && (btnValue === '.')) {
        currentContent = '0.';
        historyContent += '0.';
        return;
    }


    if (lastButtonPressed === '=' && btnValue === '.') { return}

    if(lastButtonPressed === '='){
        // lastButtonPressed = btnValue;
        console.log('lastButtonPressed is =');
        console.log('currentContent', currentContent);
        console.log('historyContent antes', historyContent);
        historyContent = currentContent;
        currentContent = '';
        console.log('currentContent después', currentContent);
        console.log('historyContent después', historyContent);
        if(!isNaN(btnValue)){
            historyContent = '';
        }
    }
    
    if (isNaN(lastButtonPressed) &&  isNaN(btnValue) && lastButtonPressed !== '=') {
        console.log('lastButtonPressed is NaN, es ', lastButtonPressed);
        return ;
    }

    lastButtonPressed = btnValue;

    if (!isNaN(btnValue)) {
        console.log('btnValue is a number');
        console.log('lastButtonPressed ->', lastButtonPressed);

        if (!currentContent || currentContent === '0' || currentContent === '') {
            currentContent = btnValue;
        } else {
            currentContent += btnValue;
        }
        historyContent += btnValue;
        // console.log('currentContent despues', currentContent);

    } else {
        console.log('btnValue is not a number');
        switch (btnId) {
            case 'btnClear':
                currentContent = '';
                historyContent = '';
                break;
            case 'btnEqual':
                currentContent = eval(historyContent);
                currentContent = currentContent * 10 / 10;
                // historyContent = currentContent;
                break;
            case 'btnDot':
                currentContent += btnValue;
                historyContent += btnValue;
                // if (currentContent.indexOf('.') === -1) {}
                break;
            default:
                currentContent = '';
                historyContent += btnValue;
                break;
        }
        console.log('historyContent', historyContent);
    }

    $("#instantDisplay").val(currentContent);
    $("#history").val(historyContent);
    console.log('historyContent', historyContent);
}

const handleTitleDivMousedown = (evt) => {
    console.log('2');
    console.log('titleDivKeydown', evt);

}

const handleTitleDivMouseup = (evt) => {
    console.log('3');
    console.log('titleDivMouseup', evt);

}

$("#titleDiv").on("mousedown", (e) => { handleTitleDivMousedown(e) });
$("#titleDiv").on("mouseup", (e) => { handleTitleDivMouseup(e) });
$("button").click((e) => { handleButtonClick(e) });

