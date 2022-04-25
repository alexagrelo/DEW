
const OPERATION_BUTTONS_VALUES = [' *', ' /'];

let currentContentDiv = $("#instantDisplay");
currentContent = currentContentDiv.text();
let historyContentDiv = $("#history");

// Event Handler.
const handleButtonClick = (evt) => {
    let btn = evt.target;
    let btnValue = btn.value;

    if (btnValue === ' C ') {
        currentContent = '0';
        historyContent = '';
        lastButtonPressed = '';
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        return;
    }

    if ((currentContent === '0') && (btnValue === 0)) { return }

    if (currentContent === '' && btnValue === 0) {
        currentContent = '0';
        historyContent += '0';
        lastButtonPressed = btnValue;
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        return;
    }

    if ((currentContent === '' || currentContent === '0' || lastButtonPressed === '=') && (btnValue === '.')) {
        currentContent = '0.';
        if (lastButtonPressed === '=') {
            historyContent = '';
        }

        (lastButtonPressed === '0') ? historyContent += '.' : historyContent += '0.';

        lastButtonPressed = btnValue;
        $("#instantDisplay").val(currentContent);
        $("#history").val(historyContent);
        return;
    }

    if (lastButtonPressed === '.' && btnValue === '.') { return }

    if (lastButtonPressed === '=') {
        historyContent = currentContent;
        currentContent = '';
        if (!isNaN(btnValue)) {
            historyContent = '';
        }
    }

    if (btnValue === '.' && currentContent.includes('.')) { return }

    lastButtonPressed = btnValue;

    if (!isNaN(btnValue)) {

        if (!currentContent || currentContent === '0' || currentContent === '') {
            currentContent = btnValue;
        } else {
            currentContent += btnValue;
        }
        historyContent += btnValue;

    } else {
        historyContent = String(historyContent);
        if (!isNaN(historyContent.substring(historyContent.length - 2)) || historyContent === '') {
            switch (btnValue) {
                case '=':
                    currentContent = eval(historyContent);
                    currentContent = currentContent * 10 / 10;
                    break;
                case '.':
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

    while (historyContent.startsWith('00')) {
        historyContent = historyContent.substring(1);
    }

    if (historyContent.startsWith('0') && !isNaN(historyContent[1]) && historyContent[1] !== '.') {
        historyContent = historyContent.substring(1);
    }

    if (OPERATION_BUTTONS_VALUES.includes(historyContent.substring(0, 2))) {
        historyContent = historyContent.substring(3);
    }

    if (currentContent.length >= 18) {
        let splittedHistory = historyContent.split(' ');
        let realCurrentValue = splittedHistory[splittedHistory.length - 1];
        currentContent = currentContent.substring(0, 16).concat('e').concat(realCurrentValue.length - 15);
    }

    $("#instantDisplay").val(currentContent);
    $("#history").val(historyContent);
}

// Eventos de ratón
$("button").click((e) => { handleButtonClick(e) });
// Eventos de teclado
document.onkeydown = (e) => {
    switch (e.key) {
        case '0':
            handleButtonClick({ target: { value: '0' } });
            break;
        case '1':
            handleButtonClick({ target: { value: '1' } });
            break;
        case '2':
            handleButtonClick({ target: { value: '2' } });
            break;
        case '3':
            handleButtonClick({ target: { value: '3' } });
            break;
        case '4':
            handleButtonClick({ target: { value: '4' } });
            break;
        case '5':
            handleButtonClick({ target: { value: '5' } });
            break;
        case '6':
            handleButtonClick({ target: { value: '6' } });
            break;
        case '7':
            handleButtonClick({ target: { value: '7' } });
            break;
        case '8':
            handleButtonClick({ target: { value: '8' } });
            break;
        case '9':
            handleButtonClick({ target: { value: '9' } });
            break;
        case '+':
            handleButtonClick({ target: { value: ' + ' } });
            break;
        case '-':
            handleButtonClick({ target: { value: ' - ' } });
            break;
        case '*':
            handleButtonClick({ target: { value: ' * ' } });
            break;
        case '/':
            handleButtonClick({ target: { value: ' / ' } });
            break;
        case '.':
            handleButtonClick({ target: { value: '.' } });
            break;
        case 'Enter':
            handleButtonClick({ target: { value: '=' } });
            break;
        case 'Backspace':
            handleButtonClick({ target: { value: ' C ' } });
            break;
        default:
            break;
    }
}
