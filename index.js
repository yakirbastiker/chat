let express =require('express');
let socket = require('socket.io');

let app = express();
let server = app.listen(3000, () => console.log("listening on port 3000"));


app.use(express.static('public'));


let io = socket(server);

io.on('connection', (socket) => {
    console.log("socket connection");

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=> {
        socket.broadcast.emit('typing', data);
    });

});