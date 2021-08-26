//在原型上扩展需要$()一个实例继承,才可以扩展我们的轮播图方法
~function(jQuery){
    function lunboBanner (ajaxURL,Alltime) {
        //把所需要的元素获取到
        var banner = this;
        var bannerInner = banner.children(".bannerInner");
        var divList = null;
        var imgList = null;
        var bannerTip = banner.children(".bannerTip"), oList = null;
        var bannerLeft = banner.children(".conL");
        var bannerRight = banner.children(".conR");
        //1.AJAX读取数据


//    var xml = new XMLHttpRequest();
//        xml.open("get","http://localhost:8083/data?"+Math.random());
//        xml.onreadystatechange = function(){
//            if(xml.readyState == 4 ){
//                var data = xml.responseText
//                console.log(data)
//            }
//        }
//        xml.send();
        var jsonData = null;
        $.ajax({
            url: ajaxURL + "?" + Math.random(),
            type: "get",
            dataType: "json",
            success: function (data) {
                //实现数据的绑定
                //只需要执行bandData就可以实现数据绑定了

                //刚进来是没有数数据的,我们通过动态绑定的方式,请求后得到数据一项一项的遍历后,
                //将得到的数据拼接成字符串,然后再追加到页面当中,通过innerHTML
                //通过jQuery选择器或者筛选方法获取到的jQuery集合是不存在DOM映射机制的,
                //之前获取到的集合,之后再页面中HTML结构改变了,集合中的内容不会跟着自动发生变化(JS获取的元素集合有DOM映射机制)
                bindData();

                function bindData() {
                    var str1 = "", str2 = "";
                    if (data) {
                        $.each(data, function (index, item) {
                            str1 += "<div><img src='' trueImg='" + item["img"] + "' ></div>"
                            index === 0 ? str2 += "<li class='bg'></li>" : str2 += "<li></li>"
                        })
                        bannerInner.html(str1);
                        bannerTip.html(str2);
                        //绑定完成数据后获取我们需要的集合
                        divList = bannerInner.children("div"), imgList = divList.children("img"),
                            oLis = bannerTip.children("li")
                    }
                }

                //3.实现图片的延迟加载
                window.setTimeout(lazyImg, 500)

                function lazyImg() {
                    //jQuery中的each有两种写法,一种是$(xxx).each(function),一种是$.each(数组,function)
                    imgList.each(function (index, item) {
                        var _this = this;
                        var oImg = new Image;
                        //把原生的js对象转换成jQuery对象
                        oImg.src = $(this).attr("trueImg");
                        oImg.onload = function () {
                            //再把每一个新的img的src值赋值给旧的img的src
                            $(_this).prop("src", this.src).css("display", "block")
                        }
                    })
                    divList.eq(0).css("zIndex", 1).animate({opacity: 1}, 300)
                }

                //->封装一个轮播图切换的效果
                function changeBanner() {
                    //轮播图切换
                    var curDiv = divList.eq(step);
                    curDiv.css("zIndex", 1).siblings().css("zIndex", 0);
                    curDiv.animate({opacity: 1}, 300, function () {
                        //内置的遍历系统,不需要遍历
                        $(this).siblings().css("opacity", 0);
                    });
                    //焦点对齐
                    var curLi = oLis.eq(step)
                    curLi.addClass("bg").siblings().removeClass("bg");
                }

                //    4.实现自动轮播
                var interval = Alltime || 3000, step = 0, autoTimer = null;
                autoTimer = window.setInterval(autoMove, interval)
                function autoMove() {
                    if(step === (data.length - 1)){
                        step = -1;
                    }
                    step++;
                    changeBanner()

                }
                //5.控制左右按钮的显示隐藏和自动轮播的开始和暂停
                banner.on("mouseover",function(){
                    window.clearInterval(autoTimer);
                    bannerLeft.css("display","block")
                    bannerRight.css("display","block")
                }).on("mouseout",function(){
                    autoTimer = window.setInterval(autoMove,interval);
                    bannerLeft.css("display","none")
                    bannerRight.css("display","none")
                })
                //6.实现焦点切换
                oLis.on("click",function(){
                    step=$(this).index()
                    changeBanner();
                })
                console.log(data.length)
                //7.实现左右切换
                bannerRight.on("click",autoMove)
                bannerLeft.on("click",function(){
                    if(step === 0 ){
                        step = data.length;
                    }
                    step--;
                    changeBanner()
                })
            }
        })

    }
    jQuery.fn.extend({
        banner:lunboBanner
    })
}(jQuery)

