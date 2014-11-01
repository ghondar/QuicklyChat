var express = require('express'),http = require('http');
var app = express();
var server = http.createServer(app);
app.set('views',__dirname + '/views');
app.use(express.static(__dirname));
app.get('/',function(req,res){
	res.sendfile(__dirname + '/views/index.html');
});
server.listen(process.env.PORT,process.env.IP); 

var io = require('socket.io').listen(server);
var userConectados={};//tipo json
io.sockets.on('connection',function(socket){
		socket.on('enviarNombre',function(dato){
			if(userConectados[dato]){
				socket.emit('errorName')
			}else{
				socket.nickname=dato;
				userConectados[dato]=socket.nickname;
				console.log(socket.id);
			}
			data = [dato,userConectados];
			io.sockets.emit('mensaje',data);
			socket.broadcast.emit('notification',dato);
		});
		socket.on('enviarMensaje',function(mensaje){
			var data = [socket.nickname,mensaje];
			socket.broadcast.emit('newMessage',data);
			//socket.emit('newMessage2',data);
		});
	
});