/**
 * Create constructor functions that allows us to know the following information about these shapes:
 * - the dimensions
 * - area size
 * - Circumference
 * 
 * shapes:
 * - square
 * - rectangle
 * - circle
 */
const square = {
    side: 4,
    info() {
        console.log('Square dimension is:', this.side)
    },
    area_size() {
        console.log(`Square Area: ${this.side * this.side}`)
    },
    circumference() {
        console.log(`Square circumference: ${this.side * 4}`)
    }
}
​
// function Square(side) {
//     this.side = side;
//     this.info = function () {
//         console.log('Square dimension is:', this.side)
//     }
//     this.area_size = function () {
//         console.log(`Square Area: ${this.side * this.side}`)
//     };
//     this.circumference = function () {
//         console.log(`Square circumference: ${this.side * 4}`)
//     }
// }
function Rectangle(side1, side2) {
    this.side1 = side1;
    this.side2 = side2;
    const rectangle_type = this.side1 === this.side2 ? 'Square' : 'Rectangle'
    this.info = function () {
        console.log(`${rectangle_type} dimensions: ${this.side1} x ${this.side2}`)
    }
    this.area_size = function () {
        console.log(`${rectangle_type} area: ${this.side1 * this.side2}`)
    }
    this.circumference = function () {
        console.log(`${rectangle_type} circumference: ${(this.side1 + this.side2) * 2}`)
    }
}
function Circle(radius) {
    this.radius = radius;
    this.info = function () {
        console.log(`Circle radius: ${this.radius}`)
    }
    this.area_size = function () {
        console.log(`Circle area: ${this.radius * this.radius * Math.PI}`)
    }
    this.circumference = function () {
        console.log(`Circle circumference: ${2 * Math.PI * this.radius}`)
    }
}

const mySquare = new Rectangle(4, 4);
const myRectangle = new Rectangle(4, 10);
const myCircle = new Circle(4);

mySquare.info();
mySquare.area_size();
mySquare.circumference();

myRectangle.info();
myRectangle.area_size();
myRectangle.circumference();

myCircle.info();
myCircle.area_size();
myCircle.circumference();