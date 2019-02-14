// Initial assignment by Atharva Patil for Mimi Yin's Collective play class
//https://github.com/mimiyin/collective-play-s19

// Event reference for the input: https://p5js.org/reference/#/p5/touchMoved


// Letting the front end side know to listen to the information being transffered over different  clients
let socket = io();
let alpha;
let r, g, b;


function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Listen for confirmation of connection
  socket.on('connect', function() {
    console.log("Connected");
  });

  // Receive message from server to the client side to update any data
  // Attached callback  function for action on recieving data
  socket.on('data', drawPos);

  alpha = random(90, 100);
  r = random(255);
  g = random(255);
  b = random(255);
}


function touchMoved() {

  // Send information out from the client side to server side to communicate with other client instances.
  // In this case the data being communicated is mouse position
  socket.emit('data',  {x: mouseX, y: mouseY, r, g, b, alpha});

}

// Callback to draw position when new position is received
function drawPos(touch) {

  noStroke();
  fill(touch.r, touch.g, touch.b, touch.alpha);
  ellipse(touch.x, touch.y, 20, 20);
}
