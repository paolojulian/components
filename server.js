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
			try {
				const {id, message} = JSON.parse(POST.data)
				console.log(JSON.parse(POST.data));
				notifyUser(id, message);
				// messageClients(POST.data)
				response.writeHead(200);
			} catch (e) {
				response.writeHead(500);
			}
			response.end();
        })
        return;
    }
});
server.listen(8080);

var websocketServer = new WebSocketServer({
	httpServer: server
});
global.clients = {}; // store the connections
websocketServer.on("request", websocketRequest);
function websocketRequest(request) {
	// start the connection
	let connection = request.accept(null, request.origin); 
	const { query: { id }} = url.parse(request.resource, true);
	console.log(`New Connection ${id}`)
	// save the connection for future reference
	clients[Number(id)] = connection;
}

const notifyUser = (userId, message) => {
	if (clients[Number(userId)]) {
		clients[Number(userId)].sendUTF(message)
	}
}