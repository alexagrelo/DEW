
// const NUMBER_BUTTONS_ID = ['btn0', 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8', 'btn9'];
const OPERATION_BUTTONS_VALUES = [' *', ' /'];

let currentContentDiv = $("#instantDisplay");
currentContent = currentContentDiv.text();
let historyContentDiv = $("#history");

// Event Handlers.

const handleButtonClick = (evt) => {
    console.log('historyContent pre', historyContent);
    console.log('currentContent pre', currentContent);
    let btn = evt.target;
    let btnId = btn.id;
    let btnValue = btn.value;
    // console.log('lastButtonPressed', lastButtonPressed);
    // console.log('btnId', btnId);

    if (btnId === 'btnClear') {
        // console.log('btnClear entra en el if');
        currentContent = '';
        historyContent = '';
        lastButtonPressed = '';
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        return;
    }

    if((currentContent === '0') && (btnId === 'btn0')) {
        // console.log('btn0 pulsado, no hace nada');
        return;
    }

    if (currentContent === '' && btnId === 'btn0') {
        // console.log('btn0 pulsado, fija 0 en current, añade 0 a history');
        currentContent = '0';
        historyContent += '0';
        return;
    }

    if((currentContent === '' || currentContent === '0' || lastButtonPressed === '=') && (btnValue === '.')) {
        currentContent = '0.';
        (lastButtonPressed === '0') ? historyContent += '.' : historyContent += '0.';
        return;
    }

    if (lastButtonPressed === '=' && btnValue === '.') { return }

    if(lastButtonPressed === '='){
        historyContent = currentContent;
        currentContent = '';
        if(!isNaN(btnValue)){
            historyContent = '';
        }
    }

    lastButtonPressed = btnValue;

    if (!isNaN(btnValue)) {

        if (!currentContent || currentContent === '0' || currentContent === '') {
            currentContent = btnValue;
        } else {
            currentContent += btnValue;
        }
        historyContent += btnValue;

    } else {
        // console.log('btnValue is not a number');
        // console.log('historyContent typeOf', typeof historyContent);
        historyContent = String(historyContent);
        if(!isNaN(historyContent.substring(historyContent.length - 2)) || historyContent === ''){
            // console.log('entra en el if');
            switch (btnId) {
                case 'btnEqual':
                    currentContent = eval(historyContent);
                    currentContent = currentContent * 10 / 10;
                    break;
                case 'btnDot':
                    console.log('btnDot pulsado');
                    currentContent += '.';
                    historyContent += '.';
                    break;
                default:
                    currentContent = '';
                    historyContent += btnValue;
                    break;
            }
        } 
    }

    while(historyContent.startsWith('00')){
        historyContent = historyContent.substring(1);
    }

    if (OPERATION_BUTTONS_VALUES.includes(historyContent.substring(0, 2))) {
        console.log('historyContent empieza por una operación');
        historyContent = historyContent.substring(3);
    }

    $("#instantDisplay").val(currentContent);
    $("#history").val(historyContent);

    console.log('historyContent post', historyContent);
    console.log('currentContent post', currentContent);
}


$("button").click((e) => { handleButtonClick(e) });

