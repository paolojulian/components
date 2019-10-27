let button = document.querySelector('.app button');
let message = document.querySelector('.app input[name="message"]');

const sendNotif = async () => {
    try {
        let data = {
            message: message.value
        }
        let res = await fetch('/send-message.php', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        const responseData = await res.json();
        console.log(responseData)
    } catch (e) {

    }
}

button.addEventListener('click', () => {
    sendNotif()
})
window.WebSocket = window.WebSocket || window.MozWebSocket;

var connection = new WebSocket('ws://localhost:8080');
var connectingSpan = document.getElementById("connecting");

connection.onopen = function () {
	// connectingSpan.style.display = "none";
};
connection.onerror = function (error) {
	// connectingSpan.innerHTML = "Error occured";
};
connection.onmessage = function (message) {
    var data = JSON.parse(message.data);
    console.log(data);

}