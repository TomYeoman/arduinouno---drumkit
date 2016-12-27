var b = p5.board('COM6', 'arduino');

// Board setup — you may need to change the port
// var b = p5.board('/dev/cu.usbmodem1421', 'arduino');

// Test servo functionality
var servo;
var x = 0;
// PWM Slider
var slider, pin;
let gTimeout = 500;
let myTimer = null;

function setup() {
  createCanvas(300, 200);

  var innerStr = '<p style="font-family:Arial;font-size:12px">'
  innerStr += '<b>&larr;</b> To 15 &nbsp; | &nbsp;';
  innerStr += '<b>&rarr;</b> To 45 &nbsp; | &nbsp;';
  innerStr += '<b>&uarr;</b> Sweep &nbsp; | &nbsp;';
  innerStr += '<b>&darr;</b> Stop Sweeping </p>';

  createDiv(innerStr);

  servo = b.pin(9, 'SERVO');
  servo.range([0, 360]);

  //Slider stuff
  slider = createSlider(0, 2000, 5000);
  slider.position = (10, 10);

}

let frames = 0;

function draw() {
  gTimeout = slider.value();
  console.log(slider.value());

}


var run = setInterval(request , gTimeout); // start setInterval as "run"

    function request() {

        console.log(gTimeout); // firebug or chrome log
        clearInterval(run); // stop the setInterval()

        // console.log("YEEp");
        // Smooth drum beat
        x%2 ? servo.write(1) :  servo.write(40)
        x++;

        // Jumpy drum beat
        // random(0,1)<0.5 ? servo.write(1) : servo.write(20);

        // Set a minimum timeout of 200ms
        gTimeout < 100 ? gTimeout = 100 : gTimeout = gTimeout;

        console.log("gTimeout");
        console.log(gTimeout);
        run = setInterval(request, gTimeout); // start the setInterval()

    }


function keyPressed() {
   if (keyCode === LEFT_ARROW) {
     console.log('l')
     servo.write(1);

   } else if (keyCode === RIGHT_ARROW) {
     console.log('r')
     servo.write(20);
   } else if (keyCode === UP_ARROW) {
     console.log('u')
     servo.sweep();
   } else if (keyCode === DOWN_ARROW) {
     console.log('d')
     servo.noSweep();
   }
}
