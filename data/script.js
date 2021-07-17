var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
    websocket.onmessage = onMessage; 
    }
function onOpen(event) {
    console.log('Connection opened');
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}
function onMessage(event) {
    console.log("onMessage function called")
    var ul = document.getElementById("pi-data");
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(event.data));
    ul.appendChild(li);
    console.log(event.data);
}

window.addEventListener('load', onLoad);
function onLoad(event) {
    initWebSocket();
    initButton();
}

function initButton() {
    document.getElementById("sendButton").addEventListener("click", function(event){
        event.preventDefault();
        handleMessage(document.getElementById("input-message").value);
      });
}
function handleMessage(message){
    document.getElementById("input-message").value = "";
    websocket.send("message:"+message);
}