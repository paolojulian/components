"use strict";
const htpp = require('http');
const url = require('url');
const WebSocketServer = require('websocket').server;

let server = htpp.createServer((request, response) => {
    const getPostParam = (request, callback) => {
        const querystring = require('querystring')
        if (request.method === "POST") {
            let body = '';

            request.on('data', (data) => {
	            body += data;
	            if (body.length > 1e6) {
	                request.connection.destroy();
                }
	        });

	        request.on('end', () => {
				const POST = querystring.parse(body);
				console.log(POST)
	            callback(POST);
	        });
        }
    }

    if (request.method === 'POST') {
        getPostParam(request, (POST) => {
            messageClients(POST.data)
            response.writeHead(200);
            response.end();
        })
        return;
    }
});

var websocketServer = new WebSocketServer({
	httpServer: server
});
websocketServer.on("request", websocketRequest);
// websockets storage
global.clients = {}; // store the connections
var connectionId = 0; // incremental unique ID for each connection (this does not decrement on close)
function websocketRequest(request) {
	// start the connection
	var connection = request.accept(null, request.origin); 
	connectionId++;
	console.log(`New Connection ${connectionId}`)
	// save the connection for future reference
	clients[connectionId] = connection;
}
// sends message to all the clients
function messageClients(message) {
	for (var i in clients) {
		clients[i].sendUTF(message);
	}
}

server.listen(8080);