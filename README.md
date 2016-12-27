# arduinouno---drumkit
Desktop drumkit robot

Recently I was given a cool secret santa gift, a desktop drum kit equipped with some kicks and snares.

I've been meaning to have a play around with some p5js libraries [1], with the p5bots [2] library having caught my eye previously. The It provides us the ability to easily control the arduino uno (running firmata), using javascript directly through the browser ( using socket io for real time socket connections ).

With this in mind i've created a simple HTML page with a drumkit UI which can be interacted with. 

Upon loading this page (localhost:8080 by default), a connection to the arduino is established. From now on all interactions will be fed back in real time to the micro controller, which in our case powers and controls the servo's playing our drums!



[1] - (https://p5js.org/libraries/)
[2] - [p5bots](https://github.com/sarahgp/p5bots)
