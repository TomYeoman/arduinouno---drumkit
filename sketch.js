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
let ledBrightness = 0;

function setup() {
  createCanvas(300, 200);

  var innerStr = '<p style="font-family:Arial;font-size:12px">'
  innerStr += '<b>&larr;</b> To 15 &nbsp; | &nbsp;';
  innerStr += '<b>&rarr;</b> To 45 &nbsp; | &nbsp;';
  innerStr += '<b>&uarr;</b> Sweep &nbsp; | &nbsp;';
  innerStr += '<b>&darr;</b> Stop Sweeping </p>';

  createDiv(innerStr);

  //servo = b.pin(9, 'SERVO');
  //servo.range([0, 360]);

  //Slider stuff
  //slider = createSlider(0, 2000, 5000);
  //slider.position = (10, 10);

  slider = createSlider(0, 255, 150);
  slider.position = (10, 10);
  pin = b.pin(9, 'PWM', 'OUTPUT');


}

let frames = 0;

function draw() {
  gTimeout = slider.value();

   var val = slider.value();
   console.log("DRAWING TO PIN : "+ ledBrightness)
  pin.write(ledBrightness);

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




	// Create a new instance of an audio object and adjust some of its properties
	var audio = new Audio();
	audio.src = 'track1.mp3';
	audio.controls = true;
	audio.loop = true;
	audio.autoplay = true;

	// Establish all variables that your Analyser will use
	var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height, filter;


	// Initialize the MP3 player after the page loads all of its HTML into the window
	window.addEventListener("load", initMp3Player, false);
	function initMp3Player(){
		document.getElementById('audio_box').appendChild(audio);

		context = new webkitAudioContext(); // AudioContext object instance
		analyser = context.createAnalyser(); // AnalyserNode method
		filter = context.createBiquadFilter(); // Filter Method

		canvas = document.getElementById('analyser_render');
		ctx = canvas.getContext('2d');

		// filter.type = filter.PEAKING;
		// filter.frequency.value = 440; // in Hertz

		// Re-route audio playback into the processing graph of the AudioContext
		source = context.createMediaElementSource(audio);
		source.connect(analyser);
						source.connect(filter);

		analyser.connect(context.destination);


		frameLooper();
	}


	// frameLooper() animates any style of graphics you wish to the audio frequency
	// Looping at the default frame rate that the browser provides(approx. 60 FPS)
	function frameLooper(){
		window.webkitRequestAnimationFrame(frameLooper);

    analyser.fftSize = 256;

		fbc_array = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(fbc_array);
		//console.log(fbc_array);


		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
		ctx.fillStyle = '#00CCFF'; // Color of the bars
		bars = 100;
		for (var i = 0; i < bars; i++) {
			bar_x = i * 3;
			bar_width = 2;
			bar_height = -(fbc_array[i] / 2);
			//console.log(`BAR [${i}], fbc_array = ${fbc_array[i]}`)
			//  fillRect( x, y, width, height ) // Explanation of the parameters below
			ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
			ledBrightness = fbc_array[i];

			let xTotal = 0;

			for (var xx = 0; xx < 50; xx ++){
				xTotal = xTotal + fbc_array[100-xx];

			}

			ledBrightness = xTotal / 20;
			let xMean = 1000;

			// console.log(context.sampleRate);
			// console.log(fbc_array.length);


			if (ledBrightness < 170){
				ledBrightness = ledBrightness/5;
							//ledBrightness = 0;

			}
			/*if (xMean < 100){
				ledBrightness = 0;
				ledBrightness = 1;
			} else if (xMean > 100 && fbc_array[i] < 125){

				ledBrightness = 100;
			} else {
				ledBrightness = 255;

			} */


		}
	}
