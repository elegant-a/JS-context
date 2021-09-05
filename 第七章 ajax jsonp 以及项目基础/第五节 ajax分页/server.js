//创建服务监听端口
var http = require("http"),
    url = require("url"),
    fs = require("fs");
//创建一个http服务
var server1 = http.createServer(
    function (req, res) {
        //解析客户端请求的url地址
        var urlObj = url.parse(req.url, true),
            //得到客户端请求的地
            pathname = urlObj["pathname"],
            //解析到传输过来的参数
            query = urlObj["query"];
        // query = JSON.stringify(query);
        // query = JSON.parse(query);
        //网址键入错误

        //静态资源文件的请求处理:服务端接收到具体的请求文件后把文件中的源代码返回给客户端进行渲染即可
        //这里处理了我们的静态文件
        var reg = /\.(HTML|CSS|JS)/i;
        //如果请求文件中包含HTML,CSS,JS文件,则读取这些文件并响应到页面中
        if(reg.test(pathname)){
            var suffix=reg.exec(pathname)[1].toUpperCase(),
                suffixMIME = suffix === "HTML"?"text/html" : (suffix === "CSS" ? "text/css":"text/javascript");
                try{
                    //响应头信息重写
                    res.writeHead(200,{'content-type':suffixMIME + ';charset=utf-8;'})
                    res.end(fs.readFileSync("."+pathname,"utf-8"));
                }catch (e){
                    res.writeHead(404);
                    res.end("file is not found~");
                }
                return;
        }

        //->API文档中规定的数据请求处理,读取json文件中的数据,并把json格式的字符串转换成json格式的对象
        var data = JSON.parse(fs.readFileSync("./json/student.json", "utf-8"))
        if (pathname === "/getList") {
            var n = query["n"];
            var ary = [];
            for (let i = (n - 1) * 10; i <= n * 10 - 1; i++) {
                //如果通过规律计算的索引比最大的索引都要大,直接跳出即可,不需要再存储了
                //(最后一页了)
                if (i > data.length - 1) {
                    break;
                }
                ary.push(data[i]);
            }
            //返回的是一个json格式的字符串
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(
                {
                    code: 0,
                    msg: "成功",
                    //总页数,向上取整
                    total: Math.ceil(data.length / 10),
                    data: ary
                }));
            return;
        }

        if (pathname === "/getInfo") {
            var studentId = query["id"], obj = {};
            for (let i = 0; i < data.length; i++) {
                if (data[i]["id"] == studentId) {
                    obj = data[i];
                }
            }
            var result = {
                code: 1,
                msg: "内容不存在!",
                data: null
            };
            if (obj) {
                result = {
                    code: 0,
                    msg: "成功",
                    data: obj
                }
            }
            res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(result));
            return;
        }
        // if(pathname === "getInfo"){
        //     var studentId=query["id"], obj=null;
        //     for (let i=0;i<data.length;i++){
        //         if(data[i]["id"] == studentId){
        //             obj=data[i];
        //         }
        //     }
        //     var result ={code:1, msg:"内容不存在", data:null};
        //     if(obj){
        //           result = {
        //               code:0,
        //               msg:"成功",
        //               data:obj
        //           }
        //     }
        //     res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
        //     res.end(JSON.stringify(result));
        //     return;
        // }

        //->请求的接口地址不存在的话,返回404
        res.writeHead(404);
        res.end("request api is not found")
    });
//监听80端口
server1.listen(80, function () {
    console.log("server is success,listending on 80 port")
})


//重写响应头信息和添加css文件的时候