//运行在node环境中的,后台程序
var http = require("http"),
    url = require("url"),
    fs = require("fs");
//创建一个服务
var server1 = http.createServer(function (req, res) {
    //解析客户端请求地址中的文件的目录名称以及传递给当前服务器的数据内容
    var urlObj = url.parse(req.url, true),
        pathName = urlObj.pathname,
        query = urlObj["query"];
    //防止客户端请求的资源异常,如果客户端请求的资源文件不存在,捕获异常,让程序继续运行
    //如果客户端请求的资源文件不存在,我们不加try cath服务会终止,这样不好,所以我们添加
    //TRY CATCH捕获异常信息,这样即使不存在,服务也不会报错,同样也不会终止
    //处理静态资源文件的请求(html,css,js,),静态资源文件      前端路由,根据客户端请求的东西不一样,返回不同的内容
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO)/i;//忽略大小写
    if (reg.test(pathName)) {
        //获取请求文件的后缀名
        var suffix = reg.exec(pathName)[1].toUpperCase();
        //根据请求文件的后缀名获取到当前文件的MIME类型
        var suffixMIME = "text/plain"//默认是text的,文本格式的
        switch (suffix) {
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "JSON":
                suffixMIME = "text/javascript";
                break;
        }
        try {
            //按照指定的目录读取文件中的内容或者代码(读取出来的内容都是字符串格式的)
            var con = fs.readFileSync('.' + pathName, "utf-8");
            //重写响应头信息:告诉客户端的浏览器,我返回的内容是什么样的类型
            //指定返回的内容格式是UTF-8编码格式,返回的中文汉字就不会出现乱码了
            //用字符串拼接的方式把字符串拼接上就ok了
            res.writeHead(200,{'content-type':suffixMIME+'charset=utf-8'});
            //福区段向客户端返回的内容也是字符串
            res.end(con)
        }catch (e){
          res.writeHead(404,{'content-type':'text/plain;charset=utf-8'})
            res.end("request file is not find")
        }


    }



    //  if (pathName==="/index.html"){
    //      //基于事件驱动的异步编程
    //      var con=fs.readFileSync("./index.html","utf-8");
    //      res.end(con);
    //      return;
    //      //
    //      //sync同步 async异步
    //  }
    //  if (pathName === "/css/index.css"){
    //      con = fs.readFileSync("./css/index.css","utf-8")
    //      res.end(con);
    //      return;
    //  }
    // if (pathName === "/js/index.js"){
    //     con = fs.readFileSync("./js/index.js","utf-8")
    //     res.end(con);
    //     return;
    // }
});
//为当前的这个服务配置端口
//在服务器中创建一个服务
//IIS也可以创建这个服务
//EACCES 0.0.0.0:80端口号被占用了
server1.listen(80, function () {
    console.log("server is success,http://loaclhost:80")
});
//浏览器本身就会向服务器请求.ico这个图标的操作,
//当程序已经报错,程序就停止了

//1.MIME类型,每一种资源文件都有自己的标识类型,例如:HTML文件的MIME类型是"text/html" CSS文件的MIME类型是"text/css" javascript的
//类型是 "text/javascript"

//浏览器会按照代码的MIME类型进行渲染

