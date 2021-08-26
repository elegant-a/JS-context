//第一步:将制定格式的时间字符串中的年月日信息,存储到一个数组
String.prototype.myFormatTime = function(){
    var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g;
    var ary = [];
    this.replace(reg,function(){
 [2015,6,10,14,53,00]
    ary = ([].slice.call(arguments)).slice(1,7)
  
  });
  //第二步:设定好我们目标时间格式,把数组中对应的项替换到指定的区域
  var format = arguments[0] || "{0}年{1}月{2}日{3}:{4}:{5}"
    return format.replace(/{(\d+)}/g,function(){
     //分不同次序捕获1,2分别作为ary的下标传入,而1和而又分别对应的月和日
     var val = ary[arguments[1]];
     return val.length === 1 ? "0" + val : val
  });
  
  }
  var str = "2021-8-8 14:53:00"
  console.log(str.myFormatTime("{0}年{1}月{2}日"))
  
  
  