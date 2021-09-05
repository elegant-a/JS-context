function sum(){
    var total = null;
    for(var i=0;i<arguments.length;i++){
        var cur = Number(arguments[i]);
        //如果不是NaN,就是数字,则累加
        if (!isNaN(cur)){
            total += cur
        }
    }
    return total;
}
var total = sum(1,2,3,4)
console.log(total)
var less = require("less");
var fs = require("fs");
less.render(fs.readFileSync("./1.less","utf-8"),{compress:true},function (error,output){
    fs.writeFileSync("./1.css","output.css","utf-8")
})

//把刚才安装的第三方模块导入到JS中,这样的话我们就可以使用这个模块中提供额方法了 less.render