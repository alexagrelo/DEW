const headerDiv = $("#header");
const mainDiv = $("#main");
const footerDiv = $("#footer");

const urlParams = new URLSearchParams(window.location.search);
const content = urlParams.get("content");

headerDiv.load("header.html", function(responseText, statusText, xhr) {
  if (statusText === "success") {
    console.log("Header loaded");
    const page_1 = $("#page_1");
    const page_2 = $("#page_2");
    const page_3 = $("#page_3");
    switch(content) {
        case "page_1":
            page_1.addClass("active disabled");
            page_1.attr("disabled", true);
            break;
        case "page_2":
            page_2.addClass("active disabled");
            page_2.attr("disabled", true);
            break;
        case "page_3":
            page_3.addClass("active disabled");
            page_3.attr("disabled", true);
            break;
        default:
            page_1.addClass("active disabled");
            page_1.attr("disabled", true);
            break;
    }


  }
});

switch (content) {
    case "page_1":
        console.log("page_1");
        console.log(headerDiv.textContent);
        // document.getElementById("page_1").classList.add("active");
        // document.getElementById("page_2").classList.remove("active");
        // document.getElementById("page_3").classList.remove("active");
        mainDiv.load("content_1.html");
        break;
    case "page_2":
        console.log("page_2");
        mainDiv.load("content_2.html");
        break;
    case "page_3":
        console.log("page_3");
        mainDiv.load("content_3.html");
        break;
    default:
        mainDiv.load("content_1.html");
    }

footerDiv.load("footer.html");