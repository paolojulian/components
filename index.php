<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Components</title>
</head>
<body>
    <style>
        .notifications {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            width: 300px;
            max-width: 100%;
        }
    </style>
    <div class="wrapper">
        <input type="text"
            name="message"
            value=""
        />
        <button>
            Send
        </button>
    </div>
    <div class="notifications">

    </div>
    <script src="client/v-notifier/index.js"></script>
    <script>
        const userId = 132;
        const button = document.querySelector('.wrapper button');
        const message = document.querySelector('.wrapper input[name="message"]');
        const notifications = document.querySelector('.notifications');

        const sendMessage = async() => {
            try {
                await fetch('/send-message.php', {
                    method: 'POST',
                    body: JSON.stringify({ message: message.value })
                })
            } catch (e) {
            }
        }

        const showNotification = (message) => {
            let notif = document.createElement('v-notifier')
            notifications.appendChild(notif);
            notif.message = message;
        }

        const connectWebSocket = () => {
            let websocket = new WebSocket(`ws://127.0.0.1:8080/notifications?id=${userId}`);
            websocket.onopen = e => {
                console.log('Connected');
            }
            websocket.onmessage = e => {
                showNotification(e.data)
            }
            websocket.onclose = function(e) {
                console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(function() {
                    connectWebSocket();
                }, 1000);
            };

            websocket.onerror = function(err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                this.websocket.close();
            };
        }

        button.addEventListener('click', sendMessage)
        connectWebSocket();
    </script>
</body>
</html>