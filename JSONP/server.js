var http = require('http')
var fs = require('fs')
var path = require('path')
var url = require('url')

var server = http.createServer(function (request, response) {
	var pathObj = url.parse(request.url, true)
	console.log(pathObj)

	switch (pathObj.pathname) {
		case '/getdata':
			var data = {"name": "bluesbonewong", "age": 16}
			response.setHeader('content-type', 'text/json;charset=utf-8')
			// 以下是重点
			if (pathObj.query.callback) {
				// 判断查询字符串中是否有callback
				response.end(pathObj.query.callback + '(' + JSON.stringify(data) + ')')
				// 返回一个 showData(JSON.stringify(data)) 函数
				console.log(data)
				// 这里data会被自动转换为对象格式{ name: 'bluesbonewong', age: 16 }双引号会被去除
				// 所以一定要用JSON.stringify()把数据转换为json格式
			} else {
				response.end(data)
			}
			// 以上是重点
			break
		// 以下不用看
		default:
			fs.readFile(path.join(__dirname, pathObj.pathname), function (error, data) {
				if (error) {
					response.writeHead(404, 'not found')
					response.end('<h1>not found</h1>')
				} else {
					response.end(data)
				}
			})
	}
})

console.log('请在浏览器地址栏输入 localhost:8080')
server.listen(8080)