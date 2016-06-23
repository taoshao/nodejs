var express = require('express');
var search = require('./search');

var app = express.createServer();
console.log(__dirname);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false});

app.get('/',function(req,res){
	res.render('index');
});

app.get('/search',function(req,res,next){
	search(req.query.q,function(err,tweets){
		if (err) return next(err);
		res.render('search',{results:tweets,search:req.query.q});
	});
});

app.listen(3000);



// Express为response对象提供了render方法，该方法将完成三件事：
// 1，初始化模板引擎。
// 2，读取视图文件并将其传递给模板引擎。
// 3，获取解析后的HTML页面并作为响应发送给客户端。