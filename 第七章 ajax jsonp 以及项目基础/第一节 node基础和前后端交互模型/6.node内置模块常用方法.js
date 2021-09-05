//导入我们三个常用的NODE内置模块
var http=require("http"),
    fs = require("fs"),
    url = require("url")//url模块中提供了一个方法,提供了一个url.parse用来解析url地址的()

//1.HTTP
//http.createServer:创建一个服务,监听一个端口
var server = http.createServer(function (request,response){
    console.log(request.url)
    //把url模块解析,并把query转换为对象
    //url.parse(request.url,true)
    var urlObj = url.parse(request.url,true),
        pathname = urlObj.pathname,
        query = urlObj.query;

    //根据请求的url地址(具体是根据地址中的pathname)获取资源文件中的源代码
    //i/o操作
    if (pathname === "/1.常用的DOS命令.html"){
        //同步读取指定文件中的内容([path+name],[encode])
        //文件中的内容读取不完,不执行下面操作,只有都读取出来,才会执行后续的操作
        var con = fs.readFileSync("./1.常用的DOS命令.html","utf-8")
        //向客户端返回内容response.write
        response.write(con);
        //->response.end:告诉服务器响应结束了
        response.end();
    }


    //->当客户端向服务器端发送请求,并且当前服务已经成功接收到这个请求后,执行这个回调函数
    //-request:存放的是所有客户端请求信息，包含客户端通过问号传参的方式传递给服务器的数据
    //->response(响应):提供了客户端向服务器端返回的数据和方法
    //客户端请求的地址:http://192.168.0.32/index.html:80?name=zhufeng&age=20我们服务器通过request.url获取到的是
    //:index.html?name=zhufeng&&age = 7

    //request存放的是客户端请求的文件资源的目录和名称以及传递给服务器的数据
    //首先我们得到的是一个对象
    //Url {
    //   protocol: 'http:',传输协议
    //   slashes: true,
    //   auth: null,
    //   host: '192.168.0.32:80',域名加端口
    //   port: '80',端口号
    //   hostname: '192.168.0.32',域名
    //   hash: null,哈希值(锚点定位)
    //   search: '?name=zhufeng&age=7',?加传递过来的数据
    //   query: 'name=zhufeng&age=7',传递进来的数据,没有问号
    //   pathname: '/index.html',请求文件的路径及名称
    //   path: '/index.html?name=zhufeng&age=7',路径名称+传递的数据
    //   href: 'http://192.168.0.32:80/index.html?name=zhufeng&age=7'原始的url地址
    // }

});
// console.log(url.parse(str))

;//->增加true后,query中存储的是经过处理解析后的结果:把传递进来的多组数据以键值对方式
                                               //进行存储
//平时我们应该加true
//在参数中传递true是什么意思
// Url {
//     protocol: 'http:',
//         slashes: true,
//         auth: null,
//         host: '192.168.0.32:80',
//         port: '80',
//         hostname: '192.168.0.32',
//         hash: null,
//         search: '?name=zhufeng&age=7',
//         query: [Object: null prototype] { name: 'zhufeng', age: '7' },
//     pathname: '/index.html',
//         path: '/index.html?name=zhufeng&age=7',
//         href: 'http://192.168.0.32:80/index.html?name=zhufeng&age=7'
// }



//监听80端口
server.listen(80,function (){
    //->当服务创建成功,并且端口号也监听成功后执行这个回调函数
    console.log("server is create")
});

