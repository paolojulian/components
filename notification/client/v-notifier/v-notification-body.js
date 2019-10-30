const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            width: 300px;
            max-width: 95%;
        }
    </style>
    <div class="wrapper">
    </div>
`
class KenNotification extends HTMLElement {
    constructor () {
        super();
        this._shadow = this.attachShadow({ mode: 'open' });
        this._shadow.appendChild(template.content.cloneNode(true));
        this._host = this._shadow.host;
        this._wrapper = this._shadow.querySelector('.wrapper');
    }

    _close () {
        this._host.parentNode.removeChild(this._host);
    }
}

customElements.define('ken-notification', KenNotification);