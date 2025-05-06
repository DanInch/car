// car.speed in angle of travel + car.accelration in desired angle?



const playBox = document.getElementById("playBox");
const jsCanvas = playBox.getContext("2d");

jsCanvas.translate(400, 250);

const distance = 100;
let angle = 0;

function changeArrow(angle) {
    //clear();

    const unitVector = vectorFromAngle(0);
    const vector = [unitVector[0] * distance, unitVector[1] * distance];
    drawLine(vector, 'green');

    const unitVector1 = vectorFromAngle(angle);
    const vector1 = [unitVector1[0] * distance, unitVector1[1] * distance];
    drawLine(vector1, 'red');

    const unitVector2 = addVectors(unitVector,unitVector1);
    const vector2 = [unitVector2[0] * distance, unitVector2[1] * distance];
    drawLine(vector2, 'blue');
}

function drawLine (v, color) {
    jsCanvas.beginPath();
    jsCanvas.moveTo(0, 0);
    jsCanvas.lineTo(v[0], v[1]);
    jsCanvas.lineWidth = 3;
    jsCanvas.strokeStyle = color;
    jsCanvas.stroke();
}



function vectorFromAngleDistance(angle, distance) {
    const rad = angle * (Math.PI/180);
    const vector = [Math.sin(rad) * distance, Math.cos(rad) * distance];
    return vector;
}

function vectorFromAngle(angle) {
    const rad = angle * (Math.PI/180);
    const vector = [Math.sin(rad), Math.cos(rad)];
    return vector;
}

function addVectors(v1, v2) {
    const resultVector = [v1[0] + v2[0], v1[1] + v2[1]];
    return resultVector;
}



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

        case 'e':
        clear();
        changeArrow(angle);
        break

    }
}

function clear() {

    jsCanvas.translate(-400, -250);
    jsCanvas.clearRect(0, 0, 800, 500);
    jsCanvas.translate(400, 250);
}
