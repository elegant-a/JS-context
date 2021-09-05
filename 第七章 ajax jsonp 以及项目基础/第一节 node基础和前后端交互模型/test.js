//导入我们三个常用的NODE内置模块
var http = require("http"),
    fs = require("fs"),
    url = require("url")

var server = http.createServer(function (request,response){
    var urlObj = url.parse(request.url,true),
        pathname = urlObj.pathname,
        query = urlObj.query;
    var con = fs.readFileSync("./test.html","utf-8");
    response.write(con)
    response.end();


});
server.listen(80, function () {
    console.log("server is create")
});



