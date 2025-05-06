
const playBox = document.getElementById("playBox");
const jsCanvas = playBox.getContext("2d");
const angleBox = document.getElementById('angle');

jsCanvas.translate(400, 250);

const distance = 100;
let angle = 0;
let newangle = 30;

let prevVector = vectorFromAngleDistance(angle, distance);
const newVector = vectorFromAngleDistance(newangle, 100);
prevVector = addVectors(prevVector, newVector);

drawLine(prevVector, 'green');
drawLine(newVector, 'red');
updateAngleBox();

function drawLine (v, colour) {
    //clear();
    jsCanvas.beginPath();
    jsCanvas.moveTo(0, 0);
    jsCanvas.lineTo(v[0], v[1]);
    jsCanvas.lineWidth = 3;
    jsCanvas.strokeStyle = colour;
    jsCanvas.stroke();
}

function updateAngleBox() {
    const angleBetweenVectors = signedAngle(prevVector,newVector);
    angleBox.innerText = angleBetweenVectors;
}

function vectorFromAngleDistance(angle, distance) {
    const rad = angle * (Math.PI/180);
    const vector = [Math.sin(rad) * distance, Math.cos(rad) * distance];
    return vector;
}



function addVectors(v1, v2) {
    const resultVector = [v1[0] + v2[0], v1[1] + v2[1]];
    return resultVector;
}



// thank you chatGPT - my brain was bleeding trying to convert this from maths to js, and then even more when it turned out not even work!
// function dotProduct(v1, v2) {
//     return v1[0] * v2[0] + v1[1] * v2[1];
// }

// function magnitude(v) {
//     return Math.sqrt(v[0] ** 2 + v[1] ** 2);
// }


// function angleBetween(v1,v2) {
//     const dot = dotProduct(v1, v2);
//     const magV1 = magnitude(v1);
//     const magV2 = magnitude(v2);
//     const cosTheta = dot / (magV1 * magV2);

//     // Clamp to handle rounding errors
//     const clampedCosTheta = Math.min(1, Math.max(-1, cosTheta));

//     // clampedCosTheta is in radians, so I will convert to degrees
//     let result = clampedCosTheta * (180 / Math.PI);
//     // then round it off to a whole number
//     result = Math.round(result);

//     console.log('hello ' + result);
//     return result;
// }

// fuck you very much chatGPT

function signedAngle(A, B) {
    const angleA = Math.atan2(A[1], A[0]);
    const angleB = Math.atan2(B[1], B[0]);
    let angle = angleB - angleA;
  
    // Normalize to [-π, π]
    if (angle > Math.PI) angle -= 2 * Math.PI;
    if (angle < -Math.PI) angle += 2 * Math.PI;
  
    // setting it to deg from rads, and rounding it off the nearest whole number
    angle = angle * (180/Math.PI);
    angle = Math.round(angle);

    return angle;
  }