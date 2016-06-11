/**
 *	使用到的知识点:
 *	1，fs的文件操作。
 *	2，foreach函数。
 *	3，ANSI转义码。（控制格式及其他输出选项）
 *	
 *	
 * 
 */

var fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;
var stats = [];
// console.log(fs.readdirSync(__dirname));
fs.readdir(__dirname,function(err,files){
	console.log(files);
});
fs.readdir(process.cwd(),function(err,files){
	console.log('');

	if (!files.length) {
		return consoles.log('no files to show');
	}

	console.log('select which file or directory you want to see');
	file(0);
	function file(i){
	var filename = files[i];

	fs.stat(__dirname + '/' + filename, function(err,stat){
		stats[i] = stat;
		if (stat.isDirectory()) {
			console.log(i + '\033[36m' + filename + '/\033[39m');
		}else{
			console.log(i + '\033[90m' + filename + '/\033[39m');
		}

		i++;
		if (i == files.length) {
			read();
		}else{
			file(i);
		}
	});
	}
	function read(){
	console.log('');
	stdout.write('Enter your choice:');
	stdin.resume();
	stdin.setEncoding('utf-8');

	stdin.on('data',option);
	}
	function option(data){
		var filename = files[Number(data)];
		if (!filename) {
			stdout.write('Enter your choice:');
		}else{
			stdin.pause();
			if (stats[Number(data)].isDirectory()) {
				fs.readdir(__dirname + '/' + filename, function(err,files){
					console.log('');
					console.log('	(' + files.length + ' files)');
					files.forEach(function(file){						//forEach函数。每个元数据都执行里面的匿名函数
						console.log('	-	' + file);
					});
					console.log('');
				});
			}else{
				fs.readFile(__dirname + '/' + filename, 'utf8', function(err,data){
					console.log('');
					console.log('\033[90m' + data.replace(/(.*)/g, '	$1') + '\033[39m'); 	//使用正则表达式进行辅助缩进
					// \033表示转义序列的开始。
					// [表示开始颜色设置。
					// 90表示前景色为亮灰色。
					// m表示颜色设置结束。
					// 39用来将颜色再设置回去
				
				});
			}
		}
	}
});

