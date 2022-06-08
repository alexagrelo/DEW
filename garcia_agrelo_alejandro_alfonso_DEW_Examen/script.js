class Window {
    constructor(options, title, content) {
        if (options.width && options.height && options.x && options.y) {
            hideErrorMessage();
            this.width = options.width;
            this.height = options.height;
            this.x = options.x;
            this.y = options.y;
            this.title = title;
            this.content = content;            
        } else {
            showErrorMessage();
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

const showErrorMessage = (content) => {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.classList.remove("hidden");
    errorDiv.classList.add("visible");
    errorDiv.innerHTML = content;
}

const hideErrorMessage = () => {
    const errorDiv = document.getElementById("errorDiv");
    errorDiv.classList.remove("visible");
    errorDiv.classList.add("hidden");
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
            showErrorMessage(`No existe el archivo ${fileName}`);
            console.error(`No existe el archivo ${fileName}`);
        },
        success: () => {
            let container = document.getElementById("container");
            if (fileName !== "" && fileName !== undefined) {
                hideErrorMessage();
                if(container.hasChildNodes()) {

                }
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
                    console.log(fileName, 'existe');
                    console.log(imgWindow.getTitle(), 'titulo');
                    console.log(imgWindow.getContent(), 'contenido');
                } else {
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
                        console.log(fileName, 'existe');
                        console.log(imgWindow.getTitle(), 'titulo');
                        console.log(imgWindow.getContent(), 'contenido');
                    showErrorMessage(`No existe el archivo ${fileName}`);
            console.error(`No existe el archivo ${fileName}`);
                }

            }

        });
    
    }
    
    document.getElementById("btnSendForm").addEventListener("click", btnClickHandler);
    


