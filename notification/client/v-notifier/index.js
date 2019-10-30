import './v-notifier.js';
import './v-notification-body.js';

const Notifier = (payload) => {
    let notificationBody = document.createElement('ken-notification');
    document.body.appendChild(notificationBody);
    let _notification = document.querySelector('ken-notification');

    const show = (message) => {
        let notif = document.createElement('v-notifier')
        _notification._wrapper.appendChild(notif);
        notif.message = message;
    }

    const connectWebSocket = (id) => {
        let websocket = new WebSocket(`ws://127.0.0.1:8080/notifications?id=${id}`);
        websocket.onopen = e => {
            console.log('Connected');
        }
        websocket.onmessage = e => {
            show(e.data);
        }
        websocket.onclose = function(e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function() {
                connectWebSocket();
            }, 1000);
        };

        websocket.onerror = function(err) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            websocket.close();
        };
    }

    connectWebSocket(payload);
}

Notifier(132);