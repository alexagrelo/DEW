// Imagen que queremos comprobar si está en el servidor:
const urlmagenAComprobar = 'changed2.png';

// Usando XMLHttpRequest y jQuery
// Documentación XMLHttpRequest:
// https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest
// https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
// Documentación jQuery:
// https://www.anerbarrena.com/jquery-selectors-selectores-4768/

$(document).ready(() => {
    let req = new XMLHttpRequest();
    // let changedPngExists = false;
    req.open('GET', 'img/' + urlmagenAComprobar, true);
    // req.open('GET', 'img/404_img.png', true);
    req.onreadystatechange = (aEvt) => {
        if (req.readyState == 4) {
            if (req.status == 200) {
                $('#img-changed').attr('src', 'img/changed.png');
                console.log('changed.png existe');
            } else {
                $(".modal").modal("show");
                console.warn('changed.png no existe en el servidor');
            }
        }
    };
    req.send(null);
});

// USANDO AJAX
/* $(document).ready(() => {
    $.ajax({
        url: 'img/' + urlmagenAComprobar,
        type: 'HEAD',
        error: () => {
            $(".modal").modal("show");
            console.warn(urlmagenAComprobar, 'no existe en el servidor');
        },
        success: () => {
            $('#img-changed').attr('src', 'img/changed.png');
            console.log(urlmagenAComprobar, 'existe');
        }
    });
}); */


