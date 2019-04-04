let board = document.getElementById("board");
let ctxBoard = board.getContext("2d");

placerCanvas(board);

/**************************************************************************************************************************/

let erase = document.getElementById("white");
erase.addEventListener("click", function () {
    document.getElementById(color).style.width = parseInt(document.getElementById(color).style.width) - 20 + "px";
    document.getElementById(color).style.height = parseInt(document.getElementById(color).style.height) - 20 + "px";

    erase.style.width = "150px";
    erase.style.height = "90px";
    erase.style.backgroundSize = "150px";

    color = "white";
});

/**************************************************************************************************************************/

let colors = document.getElementsByClassName("color");
let color = "black";

for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = colors[i].id;
    if (colors[i].id === "black") {
        colors[i].style.width = "80px";
        colors[i].style.height = "80px";
    } else {
        colors[i].style.width = "60px";
        colors[i].style.height = "60px";
    }

    colors[i].addEventListener("click", function () {
        document.getElementById(color).style.width = parseInt(document.getElementById(color).style.width) - 20 + "px";
        document.getElementById(color).style.height = parseInt(document.getElementById(color).style.height) - 20 + "px";
        colors[i].style.width = parseInt(colors[i].style.width) + 20 + "px";
        colors[i].style.height = parseInt(colors[i].style.height) + 20 + "px";
        erase.style.width = "120px";
        erase.style.height = "70px";
        erase.style.backgroundSize = "120px";


        color = colors[i].id;
    });
}

/**************************************************************************************************************************/

let canvasX, canvasY, begin = true;
let size = document.getElementById("size");
ctxBoard.lineJoin = "round";
ctxBoard.lineCap = "round";
ctxBoard.lineWidth = 3 * parseInt(size.innerHTML);

//Firefox
document.addEventListener("DOMMouseScroll", function () {
    if(event.detail < 0) {
        if (parseInt(size.innerHTML) < 30) size.innerHTML = parseInt(size.innerHTML) + 1 + "";
    } else {
        if (parseInt(size.innerHTML) > 1) size.innerHTML = parseInt(size.innerHTML) - 1 + "";
    }
        ctxBoard.lineWidth = 3 * parseInt(size.innerHTML);
});

//Chrome
document.addEventListener("mousewheel", function () {
    if(event.deltaY < 0) {
        if (parseInt(size.innerHTML) < 30) size.innerHTML = parseInt(size.innerHTML) + 1 + "";
    } else {
        if (parseInt(size.innerHTML) > 1) size.innerHTML = parseInt(size.innerHTML) - 1 + "";
    }
        ctxBoard.lineWidth = 3 * parseInt(size.innerHTML);
});

board.addEventListener("mousemove", function () {
    canvasX = event.clientX - parseInt(board.style.marginLeft);
    canvasY = event.clientY - parseInt(board.style.marginTop);
    if (event.buttons === 0) {
        begin = true;
    }
    if (event.buttons === 1) {
        if (begin) {
            ctxBoard.beginPath();
            ctxBoard.moveTo(canvasX, canvasY);
            begin = false;
        }
        ctxBoard.lineTo(canvasX, canvasY);
        ctxBoard.strokeStyle = color;
        ctxBoard.stroke();
    }
});

/**************************************************************************************************************************/

function placerCanvas(canvas) {
    canvas.height = (window.innerHeight * 6) / 8;
    canvas.width = board.height * 2;

    if (canvas.width > window.innerWidth) {
        canvas.width = (window.innerWidth * 7) / 8;
        canvas.height = canvas.width / 2;

    }

    canvas.style.marginLeft = (window.innerWidth - board.width)/2 + "px";
    canvas.style.marginTop = "10px";

}

/**************************************************************************************************************************/
