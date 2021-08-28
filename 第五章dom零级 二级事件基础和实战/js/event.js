//bind:处理DOM2级事件绑定的兼容性问题(绑定方法)
//@parameter:
//curEle->要绑定的元素
//evenType->要绑定的事件类型("click","mouseover"...)
//evenFn->要绑定的方法
//由于只有一个自定义属性,所以移除的时候,需要增加一个自定义的数组属性
var tempFn=null;
function bind(currEle,evenType,evenFn){
    //兼容写法
    if(addEventListener in document){
       currEle.addEventListener(evenType,evenFn,false);
       return;
    }
    //->给evenFn化妆,并且把化妆前的照片贴在自己对应的脑门上,改变evenFn中this的指向
     tempFn=function (){
        evenFn.call(curEle);
    }
    tempFn.photo=evenFn;
    //->首先判断该自定义属性是否存在,不存在的话创建一个,由于要存储多个化妆后的结果,所以我们让其余的值是一个数组
    if(!currEle["myBind" + evenType]){
        //如果当前元素没有这个属性,往里面增加一个属性
        curEle["myBind" + evenType] = []
    }
    //往元素容器中增加一个
    //解决重复问题:每一次自己在往自定义属性对应的容器中添加,看一下之前是否已经有了,有的话就不用再重新的添加了,同理也不需要往事件池中存储了
    var ary = currEle["myBind" + evenType];
    for(var i = 0;i<ary.length;i++){
        var cur=ary[i];
        if(cur.photo=evenFn){
            return;
        }
    }
    ary.push(tempFn);
    //给cueEle加一个监听器
    curEle.attachEvent("on"+ evenType,tempFn);
}
//移除绑定
function unbind(curEle,evenType,evenFn){
         if("removeEventListener" in document){
             curEle.removeEventListener(evenType,evenFn,false);
             return;
         }
         var ary = curEle["myBind" + evenType];
         for(var i = 0;i<ary.length;i++){
             var cur=ary[i];
             if(cur.photo===evenFn){
                 ary.splice(i,1);//->首先找到后,把自己存储的容器中对应的移除掉
                 curEle.deteachEvent("on"+ evenType,cur);//->把事件池中对应的也移除掉
                 break;
             }
         }
          //->拿evenFn到curEle["myBind"]这里找化妆后的结果,找到之后再事件池找把换装后的结果,
}






  //解决顺序问题:我们不用浏览器自带的事件池了,而是自己模拟标准浏览器的事件池实现

//->on:创建事件池,并且把需要给当前元素绑定的方法一次的增加到事件池中
function on(curEle,evenType,evenFn){
    //每一个元素的每一个方法都有一个自己独自的事件池
   if(!curEle["myEvent"+evenType]){
       //给当前元素增加一个自定义属性,让它是一个数组,数组里面就是我们当前的方法
       curEle["myEvent"+evenType] = [];
   }
   //让ary等于这个自定义属性,遍历里面的属性,如果里面有这个函数,则不向里面添加,如果里面没有这个函数
    //则添加
   var ary = curEle["myEvent"+evenType];
   for (var i=0;i<ary.length;i++){
       var cur=ary[i];
       if(cur === evenFn){
           return;
       }
   }
   ary.push(evenFn);

   // curEle.addEventListener(evenType,run,false);//执行on的时候,我们给当前元素绑定了一个点击的行为,当点击的时候,执行run方法
    //run方法中的this是当前元素curEle,并且给run传递了一个MouseEvent事件  事件对象
    //addEventListener不能给同一个行为绑定相同的方法用之前写的bind绑定一个bind方法
    //
    bind(curEle,evenType,run)
}

function off(curEle,evenType,evenFn){
//移除的时候,把自己容器里面的移除了就好了
    var ary = curEle["myEvent" + evenType];
    for(var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(cur=evenFn){
            ary.splice(i,1);
            break;
        }
    }

}

//->run:我们只给当前元素的点击行为绑定一个方法run,当触发点击的时候执行的是run方法,我在run方法中根据自己存储的方法顺序分别的再把这些方法执行

function run(e){
    //this->当前点击的这个元素
    e=e||window.event;
    var flag = e.target?true:false;//IE6-8下不兼容e.target,得的flag为false
    if(!flag){
        e.target = e.srcElement;
        e.pageX = e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY = e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault = function (){
            e.returnValue = false;
        }
        e.stopPropagation = function (){
            e.cancelBubble = true;
        }
    }
    //获取自己事件池中绑定的那些方法,并且让这些方法依次的执行就可以了
    //不需要参数我们也能得到e.targe是触发元素,e.type是事件类型,可以用this或者e.target来代替
    var ary = e.target["myEvent"+e.type];
    for(var i =0;i<ary.length;i++){
        var tempFn = ary[i];
        //执行这个方法,并传递一个e进去
        tempFn.call(this,e);

    }
}


//on我们模拟了一个事件池,把需要绑定的方法依次放进来
//run方法,给当前元素唯一绑定一个run方法,当点击执行run方法,浏览器给传递了一个e


//自己首先创建一个容器,帮需要给box绑定的方法都放在box里面,给当前元素绑定run方法,点击时,执行run方法,当run方法执时我们到容器,
//依次执行方法this是当前元素,还传递了一个event,这就是原理