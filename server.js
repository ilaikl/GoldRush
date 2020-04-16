const express = require('express')
const app = express()
let http = require('http').createServer(app);
const path = require('path')
const bodyParser = require('body-parser')
let io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
    // res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('playermoved', function(dir){
        console.log('moved: ' + dir);
      });
  });

// app.listen(3000, function () {
//     console.log(`Running on port 3000`)
// })
http.listen(3000, function(){
  console.log('listening on *:3000');
});