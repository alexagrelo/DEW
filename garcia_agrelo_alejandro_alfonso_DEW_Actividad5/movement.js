let titleDiv = document.getElementById("titleDiv");

function onDrag({ movementX, movementY }) {
    // minCoeficient variará según el navegador donde se ejecute la calculadora.
    let minCoeficient = .8;
    // TODO Detectar el navegador y ajustar el coeficiente.
    let getStyle = window.getComputedStyle(calculatorDiv);
    let leftValue = Number(getStyle.left.replace('px', ''));
    let topValue = Number(getStyle.top.replace('px', ''));
    calculatorDiv.style.left = (leftValue + (movementX * minCoeficient)) + "px";
    calculatorDiv.style.top = (topValue + (movementY * minCoeficient)) + "px";
}

titleDiv.addEventListener("mousedown", () => {
    titleDiv.classList.add("active");
    titleDiv.addEventListener("mousemove", onDrag);
});

document.addEventListener("mouseup", () => {
    titleDiv.classList.remove("active");
    titleDiv.removeEventListener("mousemove", onDrag);
});
