const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
        }
        .v-notifier {
            position: fixed;
            right: 1rem;
            bottom: 1rem;
            background-color: #333333;
            color: #fafafa;
            padding: 1rem;
            box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
        }
        .hide {
            display: none;
        }
    </style>
    <div class="test">
        <input type="text"
            name="receiver_id"
            placeholder="Where to send"
        />
        <textarea
            name="message">
        </textarea>
        <button type="button">
            Test
        </button>
        <div class="v-notifier hide">
        </div>
    </div>
`
class VNotifier extends HTMLElement {
    constructor () {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(template.content.cloneNode(true));
        this._host = this._shadow.host;

        this._notifier = this._shadow.querySelector('.v-notifier');
        this._receiverId = this._shadow.querySelector('input[name="receiver_id"]');
        this._message = this._shadow.querySelector('[name="message"]');
        this._button = this._shadow.querySelector('button');
        this._notifier.style.display = 'hidden'

        // // Generate fake id
        this.userId = Math.floor(Math.random() * 10 + 1)
        console.log(this.userId);
        this.timeout_sec = 10000; // 10 sec
        this.timeout = null
    }

    connectedCallback () {
        this._button.addEventListener('click', () => {
            this.sendMessage();
        })
        this.connectWebSocket()
    }
    disconnectedCallback () {
        this._button.removeEventListener('click', () => {
            this.sendMessage();
        })
    }

    connectWebSocket () {
        this.websocket = new WebSocket(`ws://127.0.0.1:8080/notifications?token=${this.userId}`);
        this.websocket.onopen = e => {
            console.log('Connected');
        }
        this.websocket.onmessage = e => {
            this.showNotification(e.data)
        }
        this.websocket.onclose = function(e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setTimeout(function() {
              connect();
            }, 1000);
        };

        this.websocket.onerror = function(err) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            this.websocket.close();
        };
    }

    showNotification (msg) {
        this._notifier.classList.remove('hide');
        this._notifier.innerHTML = msg;
        if (!!this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this._notifier.classList.add('hide');
            this._notifier.innerHTML = '';
        }, this.timeout_sec)
    }

    sendMessage () {
        try {
            let data = {
                receiver_id: this._receiverId.value,
                message: this._message.value
            }
            this.websocket.send(JSON.stringify(data));
        } catch(e) {
            this.connect();
        }
    }

    _close () {
        this._notifier;
    }
}

customElements.define('v-notifier', VNotifier);