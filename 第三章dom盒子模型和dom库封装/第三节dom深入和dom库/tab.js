// //->实现一个选项卡的封装:我们可以分析出,只要多个选项卡的主体结构一样,那么每一个实现的思想都是
// //一模一样的,唯一不一样的就是最外层的盒子不一样
// ~function(){
//
//     function tabChange(container,defaultIndex){
//
//         //tableChange:封装一个选项卡,只要大结构保持统一,以后实现选项卡,只需要调取这个方法执行,即可实现
//         //container->当前要实现选项卡这个容器
//         //defaultIndex:默认选中项的索引
//         var tabFirst = utils.firstChild(container);
//         var tabOptions = document.getElementById("tabOptions");
//         var oLis = utils.children(tabFirst);
//         var divList = utils.children(container,"div");
//         var oDivs = utils.children(container, "div");
//
//
//        for(var k = 0,len=oLis.length;k < len;k++){
//            //让defaultIndex对应的页卡有选中样式
//            defaultIndex = defaultIndex || 0;
//            utils.addClass(oLis[defaultIndex],"select");
//            utils.addClass(divList[defaultIndex],"select");
//        }
//         //实现具体的切换功能
//         for (let i = 0; i < oLis.length; i++) {
//             oLis[i].onclick = function () {
//                 //首先把兄弟元素的select样式都移除掉
//                 var curSiblings = utils.siblings(this);
//                 for (let i = 0; i < curSiblings.length; i++) {
//                     utils.removeClass(curSiblings[i], "select");
//                 }
//                 //再让当前点击这个元素有选中样式
//                 utils.addClass(this, "select");
//                 //再让当前点击这个LI父亲的弟弟元素(三个div)和当前点击的这个Li索引相同的有选中样式,其余的移除选中样式
//                 var index = utils.index(this);
//
//                 for (let i = 0; i < divList.length; i++) {
//                     i === index ? utils.addClass(divList[i], "select") : utils.removeClass(divList[i], "select");
//                 }
//             }
//         }
//     }
//     // import "../../utils/utils"
//     // var tabFir = document.getElementById("tabFir");
//
//     window.Tab = tabChange;
//
//
// }()
// // ->实现一个选项卡的封装:我们可以分析出,只要多个选项卡的主体结构一样,那么每一个实现的思想都是
// // 一模一样的,唯一不一样的就是最外层的盒子不一样
~function () {
    function TabChange(container, defaultIndex) {
        return this.init(container, defaultIndex);
    }

    TabChange.prototype = {
        constructor: TabChange,
        //默认让当前严肃按照索引来设置选中的页卡
        defaultIndexEven: function () {
            utils.addClass(this.oLis[this.defaultIndex], "select");
            utils.addClass(this.divList[this.defaultIndex], "select");
        },
        //事件委托实现绑定切换
        liveClick: function () {
            var _this = this;
            this.tabFirst.onclick = function (e) {
                e = e || window.event;
                e.target = e.target || e.srcElement;
                //说明我当前点击的是li标签
                if (e.target.tagName.toLowerCase() === "li") {
                    _this.detailFn(e.target);
                }
            }
        },
        detailFn: function (curEle) {
            var index = utils.index(curEle);
            utils.addClass(curEle, "select")

            for (let i = 0; i < this.divList.length; i++) {
                i !== index ? utils.removeClass(this.oLis[i], "select") : null;
                i === index ? utils.addClass(this.divList[i], "select") : utils.removeClass(this.divList[i], "select");
            }
        },
        //初始化,也是当前插件的唯一入口
        init: function (container, defaultIndex) {
            this.container = container || null;
            this.defaultIndex = defaultIndex || 0;
            this.tabFirst = utils.firstChild(this.container);
            this.oLis = utils.children(this.tabFirst);
            this.divList = utils.children(this.container, "div");

            this.defaultIndexEven();
            this.liveClick();

            return this;
        }
    };
    window.Tab = TabChange;
}()

