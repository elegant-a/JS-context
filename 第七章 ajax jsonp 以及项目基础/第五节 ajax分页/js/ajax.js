~function () {
    //执行一个操作把我们原来的方法替换成简单的方法就可以了,(惰性思想)
//->creteXHR:创建ajax对象,兼容所有的浏览器
    function createXHR() {
        var xhr = null;
        var flag = false;
        ary = [
            function () {
                return new XMLHttpRequest;
            },
            function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            },
            function () {
                return new ActiveXObject("Msxm12.XMLHTTP")
            },
            function () {
                return new XMLHttpRequest;
                new ActiveXObject("Msxm13.XMLHTTP");
            }
        ]
        for (var i = 0, len = ary.length; i < len; i++) {
            var curFn = ary[i];
            try {
                xhr = curFn();
                createXHR = curFn;
                flag = true;
                break;
                //本次循环获取的方法执行没有出现错误；说明此方法是我想要的,我们下一次直接执行这个小方法即可,这需要我们把createXHR重写为
                //小方法(完成后不需要再判断下面的了,直接退出循环即可)
            } catch (e) {
                //本次循环获取的方法出现错误,继续执行下一次的循环
            }
        }
        if (!flag) {
            throw  new Error("your broser is not support ajax,please change your browser,try again!")
        }
        return xhr
    }

//->ajax:实现ajax请求的公共方法
//->给一个对象传递的参数比较多,只传递一个对象类型的值
//当一个方法传递的参数值过多,而且还不固定,我们使用对象同意传值法(把需要传递的参数都先放在一个对象中,一起传递进去即可)
    function ajax(options) {
        //把需要使用的参数值设定一个规则和初始值
        var _default = {
            url: "", //请求的地址
            type: "get",//请求的方式
            dataType: "json",//设置请求回来的内容格式  "JSON"就是JSON格式的对象,
                             //"txt":就是字符串或者是JSON格式的字符串
            async: true,//请求是同步还是异步
            data: null,//放在请求主体中的内容(POST)
            getHead: null,//->当READY STATE === 2的时候执行的回调方法
            success: null//->当READY STATE === 4的时候执行的回调方法
        };
        //使用用户自己传递进来的值覆盖我们默认的值
        //编写框架,编写插件供别人使用
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }
        //如果当前的请求方式是get请求,我们需要在url的末尾加随机数,清除缓存
        if (_default.type === "get") {
            _default.url.indexOf("?") >= 0 ? _default.url += "&" : _default.url += "?";
            _default.url += "_=" + Math.random();//不管是加的问号还是&都加一个随机数
        }

        //->SEND AJAX
        var xhr = createXHR();
        xhr.open(_default.type, _default.url, _default.async)
        xhr.onreadystatechange = function () {
            //网络状态码是以2开头的
            if ((/^2\d{2}$/).test(xhr.status)) {
                //->想要在Ready STATE等于2的时候做一些操作,需要保证AJAX是异步请求
                if (xhr.readyState === 2) {
                    if (typeof _default.getHead === "function") {
                        _default.getHead.call(xhr);
                    }
                }
                if (xhr.readyState === 4) {
                    var val = xhr.responseText;
                    //->如果传递的内容是json,说明获取的应该是json格式的对象
                    if (_default.dataType === "json") {
                        val = "JSON" in window ? JSON.parse(val) : eval("(" + val + ")")
                    }
                    //将default.success中this的值指向 xhr,并传递进一个val
                    _default.success && _default.success.call(xhr, val);
                }
            }
        };
        //默认是不传递内容
        xhr.send(_default.data)
    }

    window.ajax = ajax;
}()


//传递参数时,传递进一个对象,在ajax方法库内有一个默认的对象,遍历传递进入的对象的属性名,将对应的属性值和属性名赋值给ajax对应的方法库
ajax({
    url: "data.txt",
    type: "get",
    dataType: "json",
    async: false,
    getHead: function () {
        //this ->Xhr当前AJAX对象
    },
    success: function () {
        //this->xhr当前AJAX对象
        //data:我们从服务器获取的主体内容
    }

})


// createXHR = function (){
//     return new ActiveXObject("Microsoft.XMLHTTP")
// }
//
//
// function createXHR(){
//     var xhr= null;
//     if(window.XMLHttpRequest){
//         xhr = new XMLHttpRequest();
//         //->为了兼容ie6及更低的版本；如果第一个不支持,则浏览器会报错,后面就不再执行了
//     }else{
//         try {
//             xhr = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         catch (e){
//             try{
//                 xhr=new ActiveXObject("Msxm12.XMLHTTP")
//             }catch (e){
//                 try{
//
//                 }catch (e){
//                     xhr = new ActiveXObject("Msxm13.XMLHTTP");
//                 }
//             }
//         }
//     }
// }
