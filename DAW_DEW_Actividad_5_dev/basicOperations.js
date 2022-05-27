const OPERATORS = [
    {
        id: "btnSquare",
        numOperands: 1,
        symbol: "x²",
        calc: function (a) {
            return Math.pow(a, 2);
        }
    },
    {
        id: "btnSignChange",
        numOperands: 1,
        symbol: "+/-",
        calc: function (a) {
            return -a;
        }
    },
    {
        id: "btnSqrt",
        numOperands: 1,
        symbol: "√",
        calc: function (a) {
            return Math.sqrt(a);
        }
    },
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

    // Inicia los event listeners.
    
    const handleButtonClick = (evt) => {
        let btn = evt.target;
        let btnId = btn.id;
        let btnValue = btn.value;
        // let btnSymbol = btn.innerText;
        
        // console.log('btn', btn);
        // console.log(`btnId: ${btnId}`);
        // console.log(`btnValue: ${btnValue}`);
        // console.log(`btnSymbol: ${btnSymbol}`);
        
        lastButtonPressed = btnId;

        if(!isNaN(btnValue)) {
            console.log('btnValue is a number');
            console.log('lastButtonPressed antes', lastButtonPressed);
            console.log('lastButtonPressed despues', lastButtonPressed);
            console.log('currentContent antes', currentContent);
            if(!currentContent) {
                currentContent = btnValue;
            } else {
                currentContent += btnValue;
            }
            console.log('currentContent despues', currentContent);
            

            
        } else {
            console.log('btnValue is not a number');
            switch(btnValue) {
                case 'C':
                    currentContent = '';
                    historyContent = '';
                    break;
                case 'CE':
                    currentContent = '';
                    break;
                // case '+/-':
            }
            
        }
        $("#instantDisplay").val(currentContent);
            
    }
    
    const handleTitleDivMousedown = (evt) => {
        console.log('2');
        console.log('titleDivKeydown', evt);
        
    }

    const handleTitleDivMouseup = (evt) => {
        console.log('3');
        console.log('titleDivMouseup', evt);
        
    }
    
    $("#titleDiv").on("mousedown", (e) => {handleTitleDivMousedown(e)});
    $("#titleDiv").on("mouseup", (e) => {handleTitleDivMouseup(e)});
    $("button").click((e) => {handleButtonClick(e)});

