const OPERATORS = [
    {
        id: "op-power",
        numOperands: 2,
        symbol: " ^ ",
        calc: function (a, b) {
            return Math.pow(a, b);
        }
    },
    {
        id: "op-negate",
        numOperands: 1,
        symbol: " -",
        calc: function (a) {
            return -a;
        }
    },
    {
        id: "op-square-root",
        numOperands: 1,
        symbol: " √",
        calc: function (a) {
            return Math.sqrt(a);
        }
    },
    {
        id: "op-multiply",
        numOperands: 2,
        symbol: " x ",
        calc: function (a, b) {
            return a * b;
        }
    },
    {
        id: "op-divide",
        numOperands: 2,
        symbol: " ÷ ",
        calc: function (a, b) {
            return a / b;
        }
    },
    {
        id: "op-add",
        numOperands: 2,
        symbol: " + ",
        calc: function (a, b) {
            return a + b;
        }
    },
    {
        id: "op-subtract",
        numOperands: 2,
        symbol: " - ",
        calc: function (a, b) {
            return a - b;
        }
    }
];

// The number of places to round to
const roundPlaces = 15;

// Get the operator object for a given operator ID
const getOperator = (opID) => {
    OPERATORS.forEach((op) => {
        if (op.id === opID) return op;

    });
    return undefined;
}

// Get the precedence of an operator given its ID
const getOpPrecedence = (opID) => {
    OPERATORS.forEach((index, op) => {
        if (op.id === opID) return index;
    });

    // If the given ID does not return an operator, then return a large value that will always lose in precedence
    return 1000;
}

// Returns true if op1 ID has equal or higher precedence than op2 ID, false otherwise
const hasPrecedence = (op1, op2) => {
    if (getOperator(op1) != undefined) {
        return getOpPrecedence(op1) <= getOpPrecedence(op2);
    }
}

// A list of every token (number or operator) currently in the expression
let tokenList = [];

// A list of previous results and expressions in the form {out: output, expression: expression string, tokens: list of tokens in the expression}
let calcHistory = [];

// Evaluates the expression and outputs the result
const calculate = () => {

    // Evaluate the expression using a modified version of the shunting yard algorithm
    var valStack = [];
    var opStack = [];

    tokenList.forEach((token) => {
        if (!isNaN(token)) {
            valStack.push(token);
        } else {
            while (opStack.length > 0 && hasPrecedence(opStack[opStack.length - 1], token)) {
                var operator = getOperator(opStack.pop());
                if (operator.numOperands === 1)
                    valStack.push(applyOperator(operator, [valStack.pop()]));
                else
                    valStack.push(applyOperator(operator, [valStack.pop(), valStack.pop()]));
            }
            opStack.push(token);
        }
    })

    while (opStack.length > 0) {
        var operator = getOperator(opStack.pop());
        if (operator.numOperands === 1)
            valStack.push(applyOperator(operator, [valStack.pop()]));
        else
            valStack.push(applyOperator(operator, [valStack.pop(), valStack.pop()]));
    }

    // Output the calculated result and the original expression
    output(valStack[0], $("#expression").html(), tokenList);
}

// Returns the result of applying the given unary or binary operator on the top values of the value stack
function applyOperator(operator, vals) {
    let valA = vals[0];
    let result;

    if (vals.length === 1) {
        result = operator.calc(parseFloat(valA));
    } else {
        let valB = vals[1];
        result = operator.calc(parseFloat(valB), parseFloat(valA));
    }

    return result;
}

// Updates the equation and calc history with the given output
function output(out, expression, tokens) {
    out = +out.toFixed(roundPlaces);
    $("#expression").html(out.toString());

    calcHistory.push({ out: out, expression: expression, tokens: tokens });
    $("#calc-history-box").html("");
    for (var i = calcHistory.length - 1; i >= 0; i--) {
        $("#calc-history-box").append("<p style='color: #B0B0B0; ' class='calc-history-eq' id='eq" + i + "'>" + calcHistory[i].expression + "</p><p style='text-align: right; margin-top: -10px;'>= " + calcHistory[i].out + "</p>");
    }
}
