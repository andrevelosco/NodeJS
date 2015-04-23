var express = require('express') 
	, load = require('express-load') 
	, bodyParser = require('body-parser') 
	, cookieParser = require('cookie-parser') 
	, expressSession = require('express-session') 
	, methodOverride = require('method-override') 
	, error = require('./middlewares/error') 
	, app = express() 
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
app.use(cookieParser('ntalk')); 
app.use(expressSession()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method')); 
app.use(express.static(__dirname + '/public'));
 
load('models') 
	.then('controllers') 
	.then('routes') 
	.into(app) ; 

server.listen(3000, function(){
  console.log("Chat real-time...");
});
 

// Eventos do Socket.IO
io.sockets.on('connection', function (socket) {
 
  socket.on('toServer', function (data) {
    var msg = data.nome + ": " + data.msg + "<br>";
    socket.emit('toClient', msg);
    socket.broadcast.emit('toClient', msg);
  });
});

