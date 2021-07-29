var utils = {
  listToArray:function(likeAry){
    var ary = [];
    try{//通过改变数组原型上slice方法,将类数组变为数组,克隆一份一模一样的
     ary = Array.prototype.slice.call(likeAry);
  } catch(e){
      for(var i = 0;i<likeAry.length;i++){
           ary[ary.length] = likeAry[i];
  }
  }
   return ary
  },
  //->jsonParse:把JSON格式的字符串转换为JSON格式
jsonParse:function(str){
    var val=null
     try{
     val=JSON.parse(str)
   }catch{
     eval("(" + str + ")")
   }

   return val
   }
}