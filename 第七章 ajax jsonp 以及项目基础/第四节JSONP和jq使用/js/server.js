//导入我们三个常用的NODE内置模块
var http = require("http"),
    fs = require("fs"),
    url = require("url")

var server = http.createServer(function (req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj.pathname,
        query = urlObj.query;
       if(pathname === "/getAll"){
           //接收客户端传递进来的函数名
           var fnName = query["callback"]
           //准备数据
           var con = fs.readFileSync("../data.txt","utf-8");
           res.writeHead(200,{'content-type':'text/javascript;charset=utf-8;'})
           res.end(fnName + '('+con+')');
       }


});
server.listen(80, function () {
    console.log("server is create")
});