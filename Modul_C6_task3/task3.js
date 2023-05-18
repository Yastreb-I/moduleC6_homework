const wsUrl = "wss://echo-ws-service.herokuapp.com"; // wss://echo.websocket.org/ 
const inputMessage = document.getElementById("message");
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const fildMessages = document.getElementById("fild-messages");

let websocket;
let isRunServer = false;
let isIgnoreEchoMessage = false

function runServer (url) {

  websocket = new WebSocket(url);
  websocket.onopen = function(evt) {
    serverMessage("Server: Подключен");
  };
  websocket.onclose = function(evt) {
    serverMessage("Server: Отключен");
    isRunServer = true
  };
  websocket.onmessage = function(evt) {
    if (!isIgnoreEchoMessage) {
      serverMessage(`Server: ${evt.data} `);      
    } else {
      isIgnoreEchoMessage = false;
    };
  };

  websocket.onerror = function(evt) {
    serverMessage(
      '<span style="color: red;">ERROR: ' + evt.data + '</span> '
    );
  };
}

runServer(wsUrl);


function clientMessage(text) {
  let pre = document.createElement("p");
  pre.setAttribute('class', 'client-message');
  pre.innerHTML = text;
  fildMessages.appendChild(pre);
}

function serverMessage(text) {
  let pre = document.createElement("p");
  pre.setAttribute('class', 'server-message');
  pre.innerHTML = text;
  fildMessages.appendChild(pre);
}

function sendMessage () {
  let message = inputMessage.value;
  clientMessage("You: " + message);
  websocket.send(message, "false");
  inputMessage.value = "";    


}

btnSend.addEventListener('click', () => {
  if (isRunServer) {
    runServer(wsUrl);
    isRunServer = false;
    setTimeout(sendMessage, 3000);
  } else {
    sendMessage ();
  }
});

btnGeo.addEventListener('click', () => {
  getGeoPosition()
  isIgnoreEchoMessage = true;
  websocket.send(message);  
});

function getGeoPosition() {

  const error = () => {
    clientMessage('Невозможно получить ваше местоположение');
  }
  
  const success = (position) => {  
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  addButtonGeo(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
   }   

  if (!navigator.geolocation) {
    clientMessage('Geolocation не поддерживается вашим браузером');
  } else {
    clientMessage('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }  
}  



function addButtonGeo(url) {
  let buttonGeo = document.createElement("button");
  let linkGeo = document.createElement("a");

  buttonGeo.setAttribute('class', 'btn client-message btn-geo');  
  linkGeo.setAttribute('target', "_blank")
  linkGeo.setAttribute('href', url );
  linkGeo.setAttribute('style', 'padding: inherit;' ); 
  
  linkGeo.textContent = "Моя геопозиция";
  fildMessages.appendChild(buttonGeo);
  buttonGeo.appendChild(linkGeo);
}
