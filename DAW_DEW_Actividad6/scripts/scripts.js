const headerDiv = $("#header");
const mainDiv = $("#main");
const footerDiv = $("#footer");

const urlParams = new URLSearchParams(window.location.search);
const content = urlParams.get("content");

headerDiv.load("../components/header.html", function (responseText, statusText, xhr) {
    if (statusText === "success") {
        // console.log('responseText', responseText);
        console.log("Header loaded");
        const page_1 = $("#page_1");
        const page_2 = $("#page_2");
        const page_3 = $("#page_3");
        switch (content) {
            case "page_1":
                page_1.addClass("active disabled");
                page_1.attr("disabled", true);
                mainDiv.load("pages/content_1.html", function (responseText, statusText, xhr) {
                    if (statusText === "success") {
                        console.log('Page 1 loaded');
                    } else if (statusText === "error") {
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    } else {
                        console.log("Unknown error");
                    }
                });
                break;
            case "page_2":
                page_2.addClass("active disabled");
                page_2.attr("disabled", true);
                mainDiv.load("pages/content_2.html", function (responseText, statusText, xhr) {
                    if (statusText === "success") {
                        console.log('Page 2 loaded');
                    } else if (statusText === "error") {
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    } else {
                        console.log("Unknown error");
                    }
                });
                break;
            case "page_3":
                page_3.addClass("active disabled");
                page_3.attr("disabled", true);
                mainDiv.load("pages/content_3.html", function (responseText, statusText, xhr) {
                    if (statusText === "success") {
                        console.log('Page 3 loaded');
                    } else if (statusText === "error") {
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    } else {
                        console.log("Unknown error");
                    }
                });
                break;
            default:
                page_1.addClass("active disabled");
                page_1.attr("disabled", true);
                mainDiv.load("pages/content_1.html", function (responseText, statusText, xhr) {
                    if (statusText === "success") {
                        console.log('Page 1 loaded');
                    } else if (statusText === "error") {
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                    } else {
                        console.log("Unknown error");
                    }
                });
                break;
        }
    } else if(statusText === "error") {
        console.error("Error: " + xhr.status + " " + xhr.statusText);
    } else {
        console.error("Unknown error");
    }
});


footerDiv.load("../components/footer.html", function (responseText, statusText, xhr) {
    if (statusText === "success") {
        console.log('Footer loaded');
    } else if (statusText === "error") {
        console.log("Error: " + xhr.status + ": " + xhr.statusText);
    } else {
        console.log("Unknown error");
    }
});