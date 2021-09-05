//获取m到n之间的随机整数
//测试数据
//造假数据
//数据已经造完了
function getRandom(n,m){
    return Math.round(Math.random() * (m - n) + n)
}
var str1 = "赵钱孙李周吴郑王冯陈楚卫蒋沈韩杨";//0-15
var str2 = "一二三四五六七八九壹贰叁肆伍陆柒捌玖";//0-17
var ary=[];
for(var i = 0;i<99;i++){
    var obj = {};
    obj["id"] = i;
    obj["name"] = str1[getRandom(0,15)] + str2[getRandom(0,15)]+str2[getRandom(0,15)]
    obj["sex"] = getRandom(0,1);
    obj["score"] = getRandom(50,99);
    ary.push(obj);
}
//文件读写就不需要手动操作了
var fs = require("fs");
fs.writeFileSync("./student.json",JSON.stringify(ary),"utf-8")
//还需要解决分页时代码显示...的问题


//代码如果不是一行的话,还是不能格式化代码
//造假数据,666