var connect = require('connect');
var server = connect(connect.bodyParser(),
			connect.static('static'));
// server.use(connect.bodyParser)
// server = connect.createServer();
server.use(function (req,res,next){ 
	if ('POST' == req.method) {
		console.log("come in ");
		console.log(req);
		console.log(req.body.file);
	}else{
		console.log("404");
		next();
	}
});
server.listen(3000);