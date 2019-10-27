<?php

namespace App;

set_time_limit(0);

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Notifier implements MessageComponentInterface 
{
    protected $clients;
    private $users = [];

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $querystring = $conn->httpRequest->getUri()->getQuery();
        parse_str($querystring,$queryarray);
        $token = $queryarray['token'];
        if ( ! $token) {
            return;
        }
        echo "New connection! ({$token})\n";
        $this->users[$token] = $conn;
        $this->clients->attach($conn);
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);
        if ( ! isset($data['receiver_id'])) return;
        if ( ! isset($data['message'])) return;
        if ( ! isset($this->users[$data['receiver_id']])) return;

        $receiver = $this->users[$data['receiver_id']];
        if ($reciever->resourceId != $from->resourceId) {
            $receiver->send($data['message']);
        }

    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}