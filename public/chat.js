let socket = io.connect('http://localhost:3000');

//query DOM
let message = document.querySelector('#message');
let handle = document.querySelector('#handle');
let btn = document.querySelector('#send');
let output = document.querySelector('#output');
let feedback = document.querySelector('#feedback');

//emit events
btn.addEventListener('click', ()=> {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    message.value = '';
    handle.value = '';
});

message.addEventListener('keypress', ()=> {
    socket.emit('typing', handle.value);
});

//listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p> <strong> ${data.handle}: </strong> ${data.message} </p>`
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p> <strong id="typing-user">${data}:</strong> is typing a message... </p>`
})