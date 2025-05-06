

const playBox = document.getElementById("playBox");
const jsCanvas = playBox.getContext("2d");
const angleBox = document.getElementById('angle');

jsCanvas.translate(400, 250);

const distance = 180;
let angle = 0;

const unitVector = vectorFromAngle(angle);
const vector = [unitVector[0] * distance, unitVector[1] * distance];

drawLine(vector);



window.onkeydown = (event) => {
    const keyPressed = event.key;

    switch (keyPressed) {
        
        case 'a':
        angle -= 5;
        changeArrow(angle);
        break;

        case 'd':
        angle += 5;
        changeArrow(angle);
        break;

    }
}


function changeArrow() {
    const unitVector = vectorFromAngle(angle);
    const vector = [unitVector[0] * distance, unitVector[1] * distance];
    angleBox.innerText = angle;
    drawLine(vector);    
}

function drawLine (v) {
    clear();
    jsCanvas.beginPath();
    jsCanvas.moveTo(0, 0);
    jsCanvas.lineTo(v[0], v[1]);
    jsCanvas.lineWidth = 3;
    jsCanvas.strokeStyle = "green";
    jsCanvas.stroke();
    angleBox.innerText = angle;
}

function clear() {

    jsCanvas.translate(-400, -250);
    jsCanvas.clearRect(0, 0, 800, 500);
    jsCanvas.translate(400, 250);
}


function vectorFromAngle(angle) {
    const rad = angle * (Math.PI/180);
    const vector = [Math.sin(rad), Math.cos(rad)];
    return vector;
}
