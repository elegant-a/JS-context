//柯里化函数思想:一个JS预先处理的思想
//bind:把传递进来的callBack这方法中的this预先处理为context
//柯里化函数思想:一个JS预先处理的思想->利用函数执行可以形成一个不销毁的私有
// 作用域的原理,把需要预先处理的内容都存放在这个不销毁的作用域中,并且返回一个小函数,
//     以后我们执行的都是小函数,在小函数中把之前预先存储的值进行相关的操作处理即可
//柯里化函数简单来说就是利用闭包

Function.prototype.myBind=function myBind(context){
    //this ->fn
    var outerArg=Array.prototype.slice.call(arguments,1)
//标准浏览器下
    if("bind" in Function.prototype){
        return this.bind.apply(this,[context].concat(outerArg))//[obj,100,200]
    }
//兼容ie678
    var _this = this;
    return function(){
        var innerArg = Array.prototype.slice.call(arguments,0);
        innerArg.length ===0?innerArg[innerArg.length]=window.event : null;
        var arg=outerArg.concat(innerArg);
        _this.apply(context,arg);
    }
}


document.body.onclick = fn.myBind(obj,100,200)