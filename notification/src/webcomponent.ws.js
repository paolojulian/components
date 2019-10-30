
module.exports = WebSocket = (server) => {
    const WebSocket = require('ws');
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
        ws.on('message', message => {
            console.log(`Received: ${message}`);
        })
        ws.send('Something');
    });

    var websocketServer = new WebSocketServer({
        httpServer: server
    });
    websocketServer.on("request", websocketRequest);
    websocketServer.on('connection', (ws, req) => {
        console.log(req.url)
    })
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

}
// module.exports = WebSocket = (server) => {
//     const WebSocketServer = require('websocket').server;

//     var websocketServer = new WebSocketServer({
//         httpServer: server
//     });
//     websocketServer.on("request", websocketRequest);
//     websocketServer.on('connection', (ws, req) => {
//         console.log(req.url)
//     })
//     // websockets storage
//     global.clients = {}; // store the connections
//     var connectionId = 0; // incremental unique ID for each connection (this does not decrement on close)
//     function websocketRequest(request) {
//         // start the connection

//         var connection = request.accept(null, request.origin); 
//         connectionId++;
//         console.log(`New Connection ${connectionId}`)
//         // save the connection for future reference
//         clients[connectionId] = connection;
//     }
//     // sends message to all the clients
//     function messageClients(message) {
//         for (var i in clients) {
//             clients[i].sendUTF(message);
//         }
//     }

// }

module.exports = WebSocket = (server) => {
    const WebSocketServer = require('websocket').server;

    var websocketServer = new WebSocketServer({
        httpServer: server
    });
    websocketServer.on("request", websocketRequest);
    websocketServer.on('connection', (ws, req) => {
        console.log(req.url)
    })
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

}