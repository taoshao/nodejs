var connect = require('connect');
var server = connect.createServer();
server.use(connect.static(__dirname + '/website'));			//处理静态文件。会以/website为静态问价的开始。如果要访问的图片可以直接输入图片的名称
server.listen(3000);