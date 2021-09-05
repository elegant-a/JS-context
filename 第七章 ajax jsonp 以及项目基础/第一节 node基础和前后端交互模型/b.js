//我想在B模块中调用a模块中的fn方法
function fn(){
    console.log("我是B模块下的方法")
}

var a = require("./a");//导入当前项目目录下的a模块
a.fn();