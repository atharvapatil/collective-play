// Initial assignment by Atharva Patil for Mimi Yin's Collective play class
// https://github.com/mimiyin/collective-play-s19

// Event reference for the input: https://p5js.org/reference/#/p5/touchMoved


// Create a server using express
// Define the portat which the server should open
let port = process.env.PORT || 8000;

// Tell the program to set a server using express
let express = require('express');
let app = express();

// Initiate server and log the statement with port for debugging
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});


// Tell server where to look for the client side files (browser display)
app.use(express.static('public'));

// Create socket connection on the server intitiated by express above
let io = require('socket.io').listen(server);

// Listen for individual clients to connect
io.sockets.on('connection',
	// Callback function on connection
  // Comes back with a socket object
	function (socket) {

		console.log("We have a new client: " + socket.id);

    // Listen for input data from this client
		socket.on('data', function(data) {
      // Data can be numbers, strings, objects
			console.log("Received: 'data' " + data);

			// Send it to all clients, including this one
			io.sockets.emit('data', data);

		});

    // Listen for this client to disconnect
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
