var connect = require('connect');
connect.createServer(
	connect.logger('dev'),			//dev日志格式可以将发送进来的请求信息和发送出去的响应信息打印在终端。是一种精准简短的日志格式，能够提供行为以及性能方面的信息，方面测试WEB应用
	function(req,res){
		res.writeHead(200);
		res.end("hello world");
	}).listen(3000);

//logger可以知道自定义日志输出格式。
//server.use(connect.logger(': method :remote-addr'));
//server.use(connect.logger('type is :res[content-type],length is :res[content-length] and it took :response-time ms.'));
完整可用的token。
:req[header] //如req[Accept]
:req[header] //如res[Content-Length]
:http-version
:response-time
:remote-addr
:date
:method
:url
:referrer
:user-agent
:status