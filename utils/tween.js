//1.保护私有变量不受外界干扰
//2.利用闭包不销毁存储一些值
~function () {
    var Effect = {
        Linear: function (t, b, c, d,key) {
            if(key == "opacity"){
                return  (1 + parseFloat(c * t / d + b));
            }
            else{
                console.log(Object.prototype.toString.call(( c * t / d + b)))
                return  c * t / d + b;
            }

        }
    }

    function move(curEle, target, duration,callback) {
        window.clearInterval(curEle.Timer)
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(curEle, key);
                change[key] = target[key] - begin[key];
            }
        }
        var time = 0;
        curEle.Timer = window.setInterval(function () {
            time += 10;
            if (time + 10 >= duration) {
                utils.css(curEle, target)
                window.clearInterval(curEle.Timer);
                //在动画结束的时候,如果用户把回调函数传递给我了,我就把回调函数执行
                //不仅执行,还让回调函数中的this变为当前要操作的元素
                typeof callback === "function" ? callback.call(curEle) : null;
                //callback && callback()//左边是假的返回左边内容,左边是真的返回右边内容
                return;
            }
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPos = Effect.Linear(time, begin[key], change[key], duration,key);
                    utils.css(curEle, key, curPos)
                }
            }
        }, 10)
    }

    window.animate = move
}()



