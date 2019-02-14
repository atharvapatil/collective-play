// Initial assignment by Atharva Patil for Mimi Yin's Collective play class
//https://github.com/mimiyin/collective-play-s19


// Letting the front end side know to listen to the information being transffered over different  clients
let socket = io();

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
}


function deviceMoved() {

  // Send information out from the client side to server side to communicate with other client instances.
  // In this case the data being communicated is mouse position
  socket.emit('data', accelerationZ);
}

// Callback to draw position when new position is received
function drawPos(accelerationZ) {
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
  noStroke();
  fill(255, 0, 0);
  ellipse(width / 2, height / 2, 10 + accelerationZ*20);

}
