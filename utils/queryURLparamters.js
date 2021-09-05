(function(){
    String.prototype.queryURLParameter = function(){
        var obj = {},
        reg = /([^?=&#]+)=([^?=&#]+)/g;
        this.replace(reg,function(){
            var key = arguments[1], value = arguments[2];
            obj[key] = value;
        })
        return obj;
    }
})()