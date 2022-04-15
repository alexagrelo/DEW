
const NUMBER_BUTTONS_ID = ['btn0', 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8', 'btn9'];
const OPERATION_BUTTONS_IDS = ['btnSum', 'btnSub', 'btnMul', 'btnDiv'];

let currentContentDiv = $("#instantDisplay");
currentContent = currentContentDiv.text();
let historyContentDiv = $("#history");


let zeroFlag = false;


// Event Handlers.

const handleButtonClick = (evt) => {
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
        console.log('btn0 pulsado, no hace nada');
        return;
    }

    if (currentContent === '' && btnId === 'btn0') {
        console.log('btn0 pulsado, fija 0 en current, añade 0 a history');
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
        // lastButtonPressed = btnValue;
        // console.log('lastButtonPressed is =');
        // console.log('currentContent', currentContent);
        // console.log('historyContent antes', historyContent);
        historyContent = currentContent;
        currentContent = '';
        // console.log('currentContent después', currentContent);
        // console.log('historyContent después', historyContent);
        if(!isNaN(btnValue)){
            historyContent = '';
        }
    }
    
    // if (isNaN(lastButtonPressed) &&  isNaN(btnValue) && lastButtonPressed !== '=') {
    //     console.log('lastButtonPressed is NaN, es ', lastButtonPressed);
    //     return ;
    // }

    lastButtonPressed = btnValue;

    if (!isNaN(btnValue)) {

        if (!currentContent || currentContent === '0' || currentContent === '') {
            currentContent = btnValue;
        } else {
            currentContent += btnValue;
        }
        historyContent += btnValue;

    } else {
        console.log('btnValue is not a number');
        console.log('historyContent typeOf', typeof historyContent);
        historyContent = String(historyContent);
        if(!isNaN(historyContent.substring(historyContent.length - 2)) || historyContent === ''){
            console.log('entra en el if');
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

    $("#instantDisplay").val(currentContent);
    $("#history").val(historyContent);
    console.log('historyContent', historyContent);
    console.log('currentContent', currentContent);
}

// const handleTitleDivMousedown = (evt) => {
//     console.log('2');
//     console.log('titleDivKeydown', evt);

// }

// const handleTitleDivMouseup = (evt) => {
//     console.log('3');
//     console.log('titleDivMouseup', evt);

// }


// $("#titleDiv").on("mousedown", (e) => { handleTitleDivMousedown(e) });
// $("#titleDiv").on("mouseup", (e) => { handleTitleDivMouseup(e) });
$("button").click((e) => { handleButtonClick(e) });

