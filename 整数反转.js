var reverse = function(x) {
       var temp = x.toString();
       //按照中间没有空隙将字符串分割成数组
       var ary = temp.split("").reverse();
       if(ary[ary.length -1] == '-'){

           ary.unshift('-');
           ary.pop()
       }
       //元素是按照指定的分割符进行分割的
       //join例如["1","2","3"] -> .join("+")->"1+2+3"
       var target = Number(ary.join(""));
         if(Math.pow(-2,31)<= target <= Math.pow(2,31)-1){
             return target
         }else{
             return 0
         }   

    };
 console.log(reverse(123))