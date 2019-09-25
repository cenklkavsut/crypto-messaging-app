var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 4200;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.component.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});//<script src="/socket.io/socket.io.js"></script><script>var socket = io();</script>
//yarn relay:devnet and sudo npm serve,the server requires mongodb and monogoose to be installed and can be runned through npm start