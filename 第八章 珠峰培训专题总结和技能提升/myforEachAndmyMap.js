//myForEach
var ary = [1,2,3,4,5];
Array.prototype.myForEach = function myForEach(callBack,context){
    context = context || window;
    //如果是标准浏览器下,我们使用内置的forEach方法就可以了
    if("forEach" in Array.prototype){
     this.forEach(callBack,context);
     return;
    }
      //IE6~8下自己编写回调执行逻辑,数组当中有几项,我们的匿名函数就执行几次
      for(var i = 0,len = this.length;i<len;i++){
      callBack && callBack.call(context,this[i],i,this)
    }}
    
    
    
    //myMap
    
    Array.prototype.myMap = function myMap(callBack,context){
    context = context || window;
    //如果是标准浏览器下,我们使用内置的forEach方法就可以了
    if("map" in Array.prototype){
     return this.map(callBack,context);
    }
      //IE6~8下自己编写回调执行逻辑,数组当中有几项,我们的匿名函数就执行几次
    var newAry = [];
      for(var i = 0,len = this.length;i<len;i++){
      if(typeof callBack==="function"){
       var val = callBack && callBack.call(context,this[i],i,this)
       newAry[newAry.length] = val
    }}
    return newAry
}