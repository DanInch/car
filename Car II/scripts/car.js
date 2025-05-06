

class Car {
    constructor(imgURL, x = 0, y = 0, width = 800, height = 500) {
        this.playBox = document.getElementById("playBox");
        this.jsCanvas = playBox.getContext("2d");
        this.img = new Image();
        this.img.src = imgURL;
        this.x = x;
        this.y = y;
        this.heightOfCar = height;
        this.widthOfCar = width;
        this.friction = 5;
        this.acceleration = 0;
        this.speed = 0;
        this.topSpeed = 25;
        this.angleOfTravel = 0;
        this.desiredAngle = 0;
        this.handling = 15;
        this.vector = [0, 0];
        this.desiredVector = [0, 0];

        this.accelerationOn = false;
        this.turnRight = false;
        this.turnLeft = false;
    }

    drawCar() {
        // deals with input from key presses
        if(this.accelerationOn) {
            this.acceleration++;
            this.speed += this.acceleration;
        }

        if(this.turnRight && this.speed > 0) {
            car.desiredAngle += car.handling;
        }


        if(this.turnLeft && this.speed > 0) {
            car.desiredAngle -= car.handling;
        }


        //THIS
        this.desiredVector = this.vectorFromAngleDist(this.desiredAngle, this.acceleration);
        this.vector = this.vectorFromAngleDist(this.angleOfTravel, this.speed);
        this.vector = this.addVectors(this.desiredVector, this.vector);
        
        this.clear();
        this.x += this.vector[0];
        this.y -= this.vector[1];

        this.jsCanvas.save();
        this.jsCanvas.translate(this.x, this.y);
        this.jsCanvas.rotate(this.desiredAngle * (Math.PI / 180));
        this.jsCanvas.drawImage(this.img, -(this.widthOfCar / 2), -(this.heightOfCar / 2));
        this.jsCanvas.restore();
        
        // reducing speed
        if(Math.abs(this.speed) > 0) {
            this.speed -= this.friction/3;
        }
        // stopping car when very slow
        if(Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        // limitng it to top speed
        if(Math.abs(this.speed) >= this.topSpeed) {
            this.speed = this.topSpeed;
        }

        // green arrow
         this.jsCanvas.beginPath();
         this.jsCanvas.moveTo(this.x, this.y);
         this.jsCanvas.lineTo(this.x + this.vector[0], this.y - this.vector[1]);
         this.jsCanvas.lineWidth = 3;
         this.jsCanvas.strokeStyle = "green";
         this.jsCanvas.stroke();

         // red arrow
          this.jsCanvas.beginPath();
          this.jsCanvas.moveTo(this.x, this.y);
          this.jsCanvas.lineTo(this.x + this.desiredVector[0], this.y - this.desiredVector[1]);
          this.jsCanvas.lineWidth = 3;
          this.jsCanvas.strokeStyle = "red";
          this.jsCanvas.stroke();


        // edge conditions
        if(this.y < 0) {
            this.y = 500;
        }
        if(this.y > 500) {
            this.y = 0;
        }
        if(this.x < 0) {
            this.x = 800;
        }
        if(this.x > 800) {
            this.x = 0;
        }
    }

    clear() {
        this.jsCanvas.clearRect(0, 0, 800, 500);
    }

    vectorFromAngleDist(angle, distance) {
        const rad = angle * (Math.PI/180);
        const vector = [Math.sin(rad) * distance, Math.cos(rad) * distance];
       // console.log(vector)
        return vector;
    }

    addVectors(v1, v2) {
        const resultVector = [v1[0] + v2[0], v1[1] + v2[1]];
        //console.log(resultVector)
        return resultVector;
    }
}
// end of class



const loop = setInterval(playloop, 100);

function playloop() {
    car.drawCar();
}

const car = new Car("imgs/car2.png", 400, 250, 15, 26);




// Keys
const bgColor =' #d1ef7c'
const bgcolorDark = ' #377008';

const acceleration = document.getElementById('acceleration');
const brakes = document.getElementById('brakes');
const left = document.getElementById('left');
const right = document.getElementById('right');


window.onkeydown = (event) => {
    const keyPressed = event.key;

    switch (keyPressed) {
        case 'w': 
        acceleration.style.backgroundColor = bgcolorDark;
        car.accelerationOn = true;
        //console.log('W ' + car.speed);
        break;

        case 's':
        brakes.style.backgroundColor = bgcolorDark;
        if(Math.abs(car.speed) > 0) {
            car.speed -= car.friction;
        }
        //console.log('S');
        break;

        case 'a':
            left.style.backgroundColor = bgcolorDark;
            car.turnLeft = true;
        break;

        case 'd':
        right.style.backgroundColor = bgcolorDark;
        car.turnRight = true;
        // console.log('D');
        break;

    }

}

window.onkeyup = (event) => {
    const keyLetGo = event.key;

    switch (keyLetGo) {
        case 'w': 
        acceleration.style.backgroundColor = bgColor;
        car.acceleration = 0;
        car.accelerationOn = false;
        break;

        case 's':
            brakes.style.backgroundColor = bgColor;
        break;

        case 'a':
        left.style.backgroundColor = bgColor;
        car.turnLeft = false;
        break;

        case 'd':
        right.style.backgroundColor = bgColor;
        car.turnRight = false;
        break;
    }

}