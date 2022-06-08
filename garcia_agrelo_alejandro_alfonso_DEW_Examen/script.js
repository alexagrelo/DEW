class Window {
    constructor(options, content, title) {
        if (options.width && options.height && options.posX && options.posY) {
            console.log(`Window created at ${options.posX}, ${options.posY} with ${options.width}x${options.height}`);
            this.width = options.width;
            this.height = options.height;
            this.posX = options.posX;
            this.posY = options.posY;
            this.title = title;
            this.content = content;            
        } else {
            console.error(`Window NOT created at ${options.posX}, ${options.posY} with ${options.width}x${options.height}`);
            console.error('Error: Window constructor: invalid options');
        }

    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setContent(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

}

class Image extends Window {
    constructor(options, content, title) {
        super(options, content, title);
    }
}

const showErrorMessage = (message) => {
    // console.log('message ->', message);
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.classList.remove("oculto");
    errorDiv.classList.add("visible");
    errorDiv.innerHTML = message;
}

const hideErrorMessage = () => {
    // console.log('entra por hideErrorMessage');
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.classList.remove("visible");
    errorDiv.classList.add("oculto");
}

const buildImage = (title, src) => {
    // Añado elementos al contenido del elemento HTML
    // Ventana: contenedor principal
    imgWindowContent = `<div id="imageDiv">`;

    imgWindowContent += `<div class="row" id="titleDiv">
                            <div class="col" id="titleCol">
                                <div id="titleText">${title}</div>
                            </div>
                        </div>`;

    imgWindowContent += `<div class="row" id="imageRow">
                            <div class="col" id="imageCol">
                                <img id="imageShowed" src="${src}">
                            </div>
                        </div>
                    </div>`;
    return imgWindowContent;
}


const btnClickHandler = (event) => {
    event.preventDefault();
    let fileName = document.getElementById("fileName").value;
    $.ajax({
        url: 'img/' + fileName,
        type: 'HEAD',
        error: () => {
            // console.log('entra por error');
            showErrorMessage(`No existe el archivo ${fileName}`);
            console.error(`No existe el archivo ${fileName}`);
            let imgWindow = new Image(
                {
                    width: "400",
                    height: "520",
                    posX: "200",
                    posY: "50"
                }, "", "");
            imgWindow.setTitle('noimage.png');
            imgWindow.setContent(buildImage(imgWindow.getTitle(), 'img/noimage.png'));
            let contenedor = document.getElementById("container");
            contenedor.innerHTML = imgWindow.getContent();
        },
        success: () => {
            // console.log('entra por success');
            if (fileName !== "" && fileName !== undefined) {
                hideErrorMessage();
                let imgWindow = new Image(
                    {
                        width: "400",
                        height: "520",
                        posX: "200",
                        posY: "50"
                    }, "", "");
                imgWindow.setTitle(fileName);
                imgWindow.setContent(buildImage(imgWindow.getTitle(), 'img/' + fileName));
                let contenedor = document.getElementById("container");
                contenedor.innerHTML = imgWindow.getContent();
                // console.log(fileName, 'existe');
                // console.log(imgWindow.getTitle(), 'titulo');
                // console.log(imgWindow.getContent(), 'contenido');
            } else {
                // console.log('entra por else del success');
                let imgWindow = new Image(
                    {
                        width: "400",
                        height: "520",
                        posX: "200",
                        posY: "50"
                    }, "", "");
                imgWindow.setTitle('noimage.png');
                imgWindow.setContent(buildImage(imgWindow.getTitle(), 'img/noimage.png'));
                let contenedor = document.getElementById("container");
                contenedor.innerHTML = imgWindow.getContent();
                // console.log(fileName, 'existe');
                // console.log(imgWindow.getTitle(), 'titulo');
                // console.log(imgWindow.getContent(), 'contenido');
                showErrorMessage(`No existe el archivo ${fileName}`);
                console.error(`No existe el archivo ${fileName}`);
            }

        }

    });

}

document.getElementById("btnSendForm").addEventListener("click", btnClickHandler);
    