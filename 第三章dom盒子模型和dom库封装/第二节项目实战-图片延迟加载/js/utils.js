//使用惰性思想(JS高阶编程技巧之一)来封装我常用的方法库:我们以已经把兼容处理好了
// ,把最后的结果放在flag变量中,以后在每一个方法中,只要是IE6~8不兼容的,我们不需要重新
// 检测,只需要使用flag的值即可
var utils = (function(){
  var flag = "getComputedStyle" in window;
     function listToArray(likeAry){
     if(flag){
     return Array.prototype.slice.call(likeAry);
}
      var ary = [];
              for(var i = 0;i<likeAry.length;i++){
             ary[ary.length] = likeAry[i];
     }
     return ary
    }
    //->formatJSON:把JSON格式的字符串转换为JSON格式
     function formatJSON(str){
      var val=null
       try{
       val=JSON.parse(str)
     }catch{
       eval("(" + str + ")")
     }
  
     return val
     }
     function getCss(curEle,attr){
               var val = null,reg = null;
               if(flag){
                 val = window.getComputedStyle(curEle,null)[attr];
               }else{
                   if(attr === "opacity"){
                       val = curEle.currentStyle["filter"];
                       reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
                       val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
                   }else{
                       val = curEle.currentStyle[attr];
                   }
               }
               reg = /^(-?\d+(\.\d+)?)(px|pt|rem|em)$/i;
               return reg.test(val) ? parseFloat(val) : val;
           }
    function offset(curEle){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent
      totalLeft += curEle.offsetLeft;
      totalTop += curEle.offsetTop;  
      while(par){ 
      if(navigator.userAgent.indexOf("MSIE 8.0")=== -1){
      totalLeft += par.clientLeft;
      totalTop += par.clientTop;
    }
      totalLeft += par.offsetLeft;
      totalTop += par.offsetTop;
      par=par.offsetParent;
    }
    return {left:totalLeft,top:totalTop}
    }
    //获取或设置浏览器有关的模型信息
    function win(attr,value){
      if(typeof value === "undefined"){//->没有传递value值->"获取"
         return document.documentElement[attr] || document.body[attr]
      }
      //->"设置"
      document.documentElement[attr] = value;
      document.body[attr]=value;
      }
        //children:获取curEle下所有的元素子节点(兼容所有的浏览器),如果传递了tagName,
  function children(curEle,tagName){
  var ary = [];
   if(!flag){
   var nodeList = curEle.childNodes;
   for (var i =0,len=nodeList.length;i<len;i++){
   var curNode = nodeList[i];
   curNode.nodeType === 1 ? ary[ary.length] = curNode :null
  }
   nodeList = null;
  }else{
   ary = this.listToArray(curEle.children);
  }if (typeof tagName === "string"){
   for (var k = 0;k<ary.length;k++){
   var curEleNode = ary[k];
   if(curEleNode.tagName.toLowerCase !== tagName.toLowerCase){
    ary.splice(k,1);
    k--
  }
  
  }
  
  }
     return ary
  }
  return {
  win:win,
  offset:offset,
  listToArray:listToArray,
  formatJSON:formatJSON,
  getCss:getCss,
  children:children
}

})();