var oTab = document.getElementById("tab");
//表格独有的获取方式
//获取tHead
var tHead=oTab.tHead;
//获取tHead里面所有的行 
//cells行
var oThs=tHead.rows[0].cells;
//获取tBody第一个
var tBody=oTab.tBodies[0];
//获取tBody下面所有的行
var oRows=tBody.rows;



//1.请求数据
//1.首先获取后台data.txt中的数据"JSON格式的字符串"->AJAX(async javascript and xml)
//1)首先创建一个AJAX对象
var xhr = new XMLHttpRequest();
//2)打开我们需要请求数据的那个文件地址
xhr.open('get','http://localhost:8083/data')
//3)发送请求
xhr.send();
//4)监听请求状态
xhr.onreadystatechange = function (){
  if(xhr.readyState === 4){
     var val = xhr.responseText;
     var data = utils.jsonParse(val);
     //调用函数
     bind(data);
     changeBg();
     
  }
};
2.//实现数据绑定所需要的的函数
var bind = function(data){
  var frg = document.createDocumentFragment();
  for(var i = 0;i<data.length;i++){
    var cur = data[i];
    var oTr = document.createElement("tr");//每一次循环创建一个行tr
    for(key in cur){
      var oTd=document.createElement('td');
      //对性别进行特殊处理 
      if(key == "sex"){
        oTd.innerHTML = cur[key] == 0?"男":"女";
      }
      else{
        oTd.innerHTML = cur[key];
      }
      
      oTr.appendChild(oTd);
    }
    frg.appendChild(oTr);
  }
  tBody.appendChild(frg);
}
//3.实现隔行行变色
var changeBg = ()=>{
  for (var i = 0;i < oRows.length;i++){
    oRows[i].className = i % 2 === 0 ? "bg":null;
  }
}
//4.编写表格排序的方法:实现按照年龄这一列进行排序
function sort(n){  //->n是当前点击这一列的索引
  var _this = this;
  //this->oThs[1]
  // ->把存储所有行的类数组转换为数组 
  var ary = utils.listToArray(oRows);
  //点击当前列,需要让其他列的flag存储的值回归到初始值-1,这样在返回头嗲你其他的列,才是按照升序排列的
  for (var k = 0;k < oThs.length;k++){
    if(oThs[k] !== this){
      oThs[k].flag = -1;
    }
  }

  //给数组进行排序,按照每一行第二列中的内容由小到大进行排序
  this.flag *= -1
  ary.sort(function(a,b){
    //根据索引取出对应的值
    var curInn = a.cells[n].innerHTML;
    var nexInn = b.cells[n].innerHTML;
    var curInnNum = parseFloat(a.cells[n].innerHTML);
    var nexInnNum = parseFloat(b.cells[n].innerHTML);
    if(isNaN(curInnNum) || isNaN(nexInnNum)){
      return (curInn.localeCompare(nexInn)) * _this.flag
    }

    return (parseFloat(a.cells[n].innerHTML) - parseFloat(b.cells[n].innerHTML)) * _this.flag;
  })
  //->按照ary中的最新顺序,把每一行重新添加到tBody中
  var frg = document.createDocumentFragment();
  for(var i=0;i<ary.length;i++){
    frg.appendChild(ary[i])
  }
  tBody.appendChild(frg)
  frg=null;
  //按照最新的数据从新进行各行变色
  changeBg()
}

//5.点击排序:所有具有class="cursor"这个样式都可以点击排序 
for(var i = 0;i < oThs.length;i++){
   var curTh = oThs[i];
   curTh.index = i;//用来存储索引的,此处头部的索引与对应体内的索引是相等的
   curTh.flag = -1;//用来存储升降序的
   if(curTh.className === "cursor"){
       curTh.onclick = function(){
           sort.call(this,this.index)
       }
   }
}