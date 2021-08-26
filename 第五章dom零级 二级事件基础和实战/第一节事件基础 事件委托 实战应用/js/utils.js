//写的css样式类库
//使用惰性思想(JS高阶编程技巧之一)来封装我常用的方法库:我们以已经把兼容处理好了
// ,把最后的结果放在flag变量中,以后在每一个方法中,只要是IE6~8不兼容的,我们不需要重新
// 检测,只需要使用flag的值即可
var utils = (function () {
    var flag = "getComputedStyle" in window;

    //将类数组转化为数组
    function listToArray(likeAry) {
        if (flag) {
            return Array.prototype.slice.call(likeAry);
        }
        var ary = [];
        for (var i = 0; i < likeAry.length; i++) {
            ary[ary.length] = likeAry[i];
        }
        return ary
    }

    //->formatJSON:把JSON格式的字符串转换为JSON格式对象
    function formatJSON(str) {
        var val = null
        try {
            val = JSON.parse(str)
        } catch {
            eval("(" + str + ")")
        }

        return val
    }

    //获取页面上任意元素距离body的偏移量
    function offset(curEle) {
        var totalLeft = null, totalTop = null, par = curEle.offsetParent
        totalLeft += curEle.offsetLeft;
        totalTop += curEle.offsetTop;
        while (par) {
            if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
                totalLeft += par.clientLeft;
                totalTop += par.clientTop;
            }
            totalLeft += par.offsetLeft;
            totalTop += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: totalLeft, top: totalTop}
    }

    //操作盒子模型信息
    function win(attr, value) {
        if (typeof value === "undefined") {//->没有传递value值->"获取"
            return document.documentElement[attr] || document.body[attr]
        }
        //->"设置"
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

    //获取所有的元素子节点
    function children(curEle, tagName) {
        var ary = [];
        if (!flag) {
            var nodeList = curEle.childNodes;
            for (var i = 0, len = nodeList.length; i < len; i++) {
                var curNode = nodeList[i];
                curNode.nodeType === 1 ? ary[ary.length] = curNode : null
            }
            nodeList = null;
        } else {
            ary = this.listToArray(curEle.children);
        }
        if (typeof tagName === "string") {
            for (var k = 0; k < ary.length; k++) {
                var curEleNode = ary[k];
                if (curEleNode.tagName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(k, 1);
                    k--;
                }
            }
        }
        return ary
    }

    //prev:获取上一个哥哥元素节点s
    function prev(curEle) {
        if (flag) {
            return curEle.previousElementSibling;
        }
        var pre = curEle.previousSibling
        while (pre && pre.nodeType !== 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }

//获取下一个弟弟元素节点
    function next(curEle) {
        if (flag) {
            return curEle.nextElementSibling;
        }
        var nex = curEle.nextSibling;
        while (nex && nex.nodeType !== 1) {
            nex = nex.nextSibling;
        }
        return nex
    }

//获取所有的哥哥元素节点
    function prevAll(curEle) {
        var ary = [];
        var pre = this.prev(curEle);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre)
        }
        return ary;
    }

//nextAll获取所有的弟弟元素节点
    function nextAll(curEle) {
        var ary = [];
        var nex = this.next(curEle);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex)
        }
        return ary;
    }

//sibling:获取相邻的两个元素节点
    function sibling(curEle) {
        var pre = this.prev(curEle);
        var nex = this.next(curEle);
        var ary = [];
        pre ? ary.push(pre) : null;
        nex ? ary.push(nex) : null;
        return ary
    }

//siblings:获取所有的兄弟元素节点
    function siblings(curEle) {
        return this.prevAll(curEle).concat(this.nextAll(curEle))
    }

//获取当前元素索引
    function index(curEle) {

        return this.prevAll(curEle).length;
    }

//firstChild:获取第一个元素子节点
    function firstChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[0] : null
    }

//lastChild获取最后一个元素子节点
    function lastChild(curEle) {
        var chs = this.children(curEle);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

//append:向指定容器的末尾追加元素
    function append(newEle, container) {
        container.appendChild(newEle);
    }

//prepend:向指定容器的开头追加元素 ->把新的元素添加到容器中第一个子元素节点的前面
//如果一个元素子节点都没有,就放在末尾
    function prepend(newEle, container) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle)
    }

//insertBefore:追加到指定元素的前面
    function insertBefore(newEle, oldEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }

//insertAfter:向容器中指定元素的末尾追加,相当于追加到oldEle弟弟元素
//     的前面, 如果弟弟不存在, 也就是当前元素已经是最后一个, 我们放到最末尾即可
    function insertAfter(newEle, oldEle) {
        var nex = this.next(oldEle);
        if (nex) {
            oldEle.parentNode.insertBefore(newEle, nex);
            return;
        }
        oldEle.parentNode.appendChild(newEle)
    }

//验证当前元素中是否包含className这个样式名
    function hasClass(curEle, className) {
        var reg = new RegExp("(^| +)" + className + "( +|$)")
        return reg.test(curEle.className);

    }

//addClass:给元素增加样式类名
    function addClass(curEle, className) {
//->为了防止className传递进来的值包含多个样式类名,我们把传递进来的字符串
//         按照一到多个空格拆分成数组中的每一项
        var ary = className.split(/ +/g);
//循环数组,一项项的进行验证增加即可
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i]
            if (!this.hasClass(curEle, curName)) {
                curEle.className += "" + curName;
            }
        }
    }


//->removeClass:给元素移除样式类名
    function removeClass(curEle, className) {
        var ary = className.split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curName = ary[i]
            if (this.hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    //通过元素的样式类名获取一组元素集合
    function getElementsByClassName(strName, context) {
        context = context || document;
        if (flag) {
            return this.listToArray(context.getElementsByClassName(strName));


        } //ie6~8
        var ary = []
        var strClassAry = strClass.replace(/(^ +| +$)/g, "").split(/ +/g);
        var nodeList = context.getElementsBtTagName("*")
        for (var i = 0, len = nodeList.length; i < len; i++) {
            var curNode = nodeList[i];
            var isOk = true;
            for (var k = 0; k < strClassAry.length; k++) {
                var reg = new RegExp("(^| +)" + strClassAry[k] + "( +|$)");
                if (!reg.test(curNode.className)) {
                    isOk = false;
                    break;

                }
            }
            if (isOk) {
                ary[ary.length] = curNode;
            }
        }
        return ary
    }

    //获取元素的样式值
    function getCss(attr) {
        var val = null, reg = null;
        if (flag) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr === "opacity") {
                val = this.currentStyle["filter"];
                reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
        return reg.test(val) ? parseFloat(val) : val;
    }

    //->setCss；给当前元素的某一个样式属性设置值(增加在行内样式上)
    function setCss(attr, value) {
        //在JS中设置float设置float样式值的话也需要兼容
        if (attr === "float") {
            this["style"]["cssFloat"] = value;
            this["style"]["styleFloat"] = value;
            return;
        }
        //->如果打算设置的是元素的透明度,我们需要设置两套样式来兼容所有的浏览器
        if (attr === "opacity") {
            this["style"]["opacity"] = value;
            this["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
            return;
        }
        //对于某些样式属性,如果传递进来的值没有加单位,我们需要把单位默认补充上,这样的话,
        //这个方法就会人性化一些

        var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(value)) {//判断传递进来的value值是否为一个有效数字,如果是有效数字的话,证明当前传递进来的值没有加单位,我们给补充单位
                value += "px"
            }
        }
        this["style"][attr] = value;
    }

    //setGroupCss给当前元素批量的设置样式属性值
    function setGroupCss(options) {

        //遍历对象中的每一项,调取setCss方法一个个的进行设置即可
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    //->jQuery中提供了这样的一个方法:css,这个方法既可以实现获取,也可以实现单独的设置,也可以实现批量的设置
    //此方法实现了获取,单独设置,批量设置元素的样式值
    function css(curEle) {
        //从第二项开始复制
        //把数组的第二项以及后面的项复制为数组
        var ary = Array.prototype.slice.call(arguments, 1);
        var argTwo = arguments[1];
        if (typeof argTwo === "string") {
            //->第二个参数是一个字符串,这样的话很有可能在获取样式;为什么是很有可能?
            //    因为还需要判断是否存在第三个参数,如果第三个参数存在的话,不是获取了,而是在单独的设置样式属性值
            var argThree = arguments[2];
            if (!argThree) {//第三个参数不存在
                return getCss.apply(curEle, ary);
            }
            //第三个参数存在则为单独设置
            //apply将类数组的参数一个一个的传递给setCss方法
            setCss.apply(curEle, ary);
        }
        argTwo = argTwo || 0;
        if (Object.prototype.toString.call(argTwo) === "[object Object]") {
            //->批量设置样式属性
            setGroupCss.apply(curEle, ary);
        }

    }

    return {
        win: win,
        offset: offset,
        listToArray: listToArray,
        formatJSON: formatJSON,
        children: children,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        sibling, sibling,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        getElementsByClassName: getElementsByClassName,
        css: css
    }

})();