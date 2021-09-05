var browser = (function(){
    var isIE6 = /msie 6/i.test(navigator.userAgent);
    var isIE7 = /msie 7/i.test(navigator.userAgent);
    var isIE8 = /msie 8/i.test(navigator.userAgent);
    var isIE = /msie/i.test(navigator.userAgent);
    return {
        msie:isIE,
        version:function(){
            switch(true){
                case isIE6:return 6;
                case isIE7:return 7;
                case isIE8:return 8;
            }
        }(),
        IE678:isIE && (isIE6 | isIE7 | isIE8)?true:false
    };
})();
window.IE678 = browser.IE678


