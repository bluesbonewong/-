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

			response.setHeader('Access-Control-Allow-Origin','http://justfun:8080')
			// 设置响应头Access-Control-Allow-Origin的值和请求头origin的值相同，即可跨域访问
			// 将第二个参数设置为 '*' ，意思是不论请求头origin为何值，都可以访问这个数据
			response.end(JSON.stringify(data))

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