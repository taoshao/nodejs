var http = require('http');
http.createServer(function(req,res){
	res.end('helloworld!');
}).listen(3005,"127.0.0.1");
console.log('Server running at http://127.0.0.1:3005/');