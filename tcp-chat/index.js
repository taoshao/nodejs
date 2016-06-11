var net = require('net');
var count = 0;	//连接数
var users = {};
/**
 * 创建服务器
 */
var server = net.createServer(function(conn){
	var nickname; //代表当前连接的昵称。
	console.log('\033[90m new connection! \033[39m');
	conn.write(
		'\n > welcome to node-chat' +
		'\n >' + count + ' other people  are connected at this time'+
		'\n > please write your name and enter:'
		);
	count ++;
	conn.setEncoding('utf8');
	// conn.write('hello');
	conn.on('data',function (data) {
		// 删除回车键。
		data = data.replace('\r\n','');
		// conn.write('12345');
		
		if (!nickname) {
			if (users[data]) {
				conn.write('nickname already in use.try again:');
				return;
			}else{
				nickname = data;
				users[nickname] = conn;

				for(var i in users){
					users[i].write(' > ' + nickname + ' joined the room');
				}
			}
		}else{
			//否则，视为聊天信息
			for(var i in users){
				if (i != nickname) {
					users[i].write(' > ' + nickname + ' : ' + data + '\n');
				}
			}
		}
		console.log(data);
	})

	conn.on('close', function(){
		count --;
		delete users[nickname];
		broadcast('> ' + nickname + ' left the room!');
	});
	//广播消息
	function broadcast(msg, exceptMyself){
		for(var i in users){
			if (!exceptMyself || i != nickname) {
				users[i].write(msg);
			}
		}
	}
});


/**
 *监听
 */
server.listen(3000,function(){
	console.log("server listening on *: 3000");
})