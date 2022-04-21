
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
    // console.log('lastButtonPressed pre', lastButtonPressed);
    // console.log('btnId', btnId);
    // console.log('btnValue', btnValue);
    
    /*
     *****************************************
     ****** RESETEO CON BOTÓN C (CLEAR) ******
     *****************************************
    */
    if (btnId === 'btnClear') {
        currentContent = '';
        historyContent = '';
        lastButtonPressed = '';
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        // console.log('historyContent post', historyContent);
        // console.log('currentContent post', currentContent);
        return;
    }

    if ((currentContent === '0') && (btnId === 'btn0')) {
        // console.log('btn0 pulsado, no hace nada');
        return;
    }

    if (currentContent === '' && btnId === 'btn0') {
        // console.log('btn0 pulsado, fija 0 en current, añade 0 a history');
        currentContent = '0';
        historyContent += '0';
        lastButtonPressed = btnValue;
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        // console.log('historyContent post', historyContent);
        // console.log('currentContent post', currentContent);
        return;
    }

    if ((currentContent === '' || currentContent === '0' || lastButtonPressed === '=') && (btnValue === '.')) {
        // console.log('btnDot pulsado, fija 0. en current');
        currentContent = '0.';
        if (lastButtonPressed === '=') {
            // console.log('lastButtonPressed === "=" => historyContent = vacío ');
            historyContent = '';
        }

        (lastButtonPressed === '0') ? historyContent += '.' : historyContent += '0.';

        lastButtonPressed = btnValue;
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        // console.log('historyContent post', historyContent);
        // console.log('currentContent post', currentContent);
        return;
    }

    // console.log('pasa por punto 1');

    // if (lastButtonPressed === '=' && btnValue === '.') { return }
    if (lastButtonPressed === '.' && btnValue === '.') { return }

    if (lastButtonPressed === '=') {
        // console.log('pasa por pto 2');
        historyContent = currentContent;
        currentContent = '';
        if (!isNaN(btnValue)) {
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
        if (!isNaN(historyContent.substring(historyContent.length - 2)) || historyContent === '') {
            // console.log('entra en el if');
            switch (btnId) {
                case 'btnEqual':
                    currentContent = eval(historyContent);
                    currentContent = currentContent * 10 / 10;
                    break;
                case 'btnDot':
                    console.log('btnDot pulsado');
                    // if(btnValue === '.' && ) { break }
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

    while (historyContent.startsWith('00')) {
        historyContent = historyContent.substring(1);
    }

    if (historyContent.startsWith('0') && !isNaN(historyContent[1]) && historyContent[1] !== '.') {
        console.log('historyContent.startsWith(0)');
        console.log('historyContent[1]', historyContent[1]);
        console.log('!isNaN(historyContent[1])', !isNaN(historyContent[1]));
        historyContent = historyContent.substring(1);
    }

    if (OPERATION_BUTTONS_VALUES.includes(historyContent.substring(0, 2))) {
        // console.log('historyContent empieza por una operación');
        historyContent = historyContent.substring(3);
    }

    if(currentContent.length >= 18){
        let splittedHistory = historyContent.split(' ');
        let realCurrentValue = splittedHistory[splittedHistory.length - 1];
        // console.log('currentContent.length >= 18');
        // console.log('realCurrentValue', realCurrentValue);
        currentContent = currentContent.substring(0, 16).concat('e').concat(realCurrentValue.length - 15);
    }

    $("#instantDisplay").val(currentContent);
    $("#history").val(historyContent);

    console.log('historyContent post', historyContent);
    console.log('currentContent post', currentContent);
}


$("button").click((e) => { handleButtonClick(e) });

