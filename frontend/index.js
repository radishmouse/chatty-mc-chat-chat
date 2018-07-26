var email = prompt("What's your email address?");

var ws = new WebSocket('ws://localhost:5000');
var messageList = document.querySelector('.message-list');
var newMessageForm = document.querySelector('.new-message-form');

var renderMessage = function(message) {
    var li = document.createElement('li');
    li.textContent = message.email + ": " + message.content;
    messageList.appendChild(li);
};

ws.addEventListener('message', function(event) {
    var message = JSON.parse(event.data);
    renderMessage(message);
});

newMessageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var content = newMessageForm.content.value;
    ws.send(JSON.stringify({ content: content, email: email }));
    newMessageForm.reset()
});