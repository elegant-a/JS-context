~function () {
    function TabChange(container, defaultIndex) {
        //谁new它this就指向了谁
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