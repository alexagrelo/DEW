let titleDiv = document.getElementById("titleDiv");

function onDrag({ movementX, movementY }) {
    // Chrome 100 fixes the movement gap issue.
    // Use minCoeficient for previous versions
    // and for other browsers.
    let minCoeficient = 1.0;
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
