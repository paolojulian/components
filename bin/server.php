<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Notifier;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Notifier()
        )
    ),
    8080
);
$server->run();
