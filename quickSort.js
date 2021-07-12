var list = [12,13,23,14,20,26,34,13,16]
function quickSort(ary) {
    //判断,如果传入的数组只有一个元素,则返回当前数组
    if(ary.length<=1){
     return ary
    }
    //找到中间的基准点索引
    let pointIndex = Math.floor(ary.length/2);
    //取出基准点的值,(splice删除的返回值是一个数组)
    var point = ary.splice(pointIndex,1)[0]
    //接下来,把基准点的值拿出来和左面和右面大比较,小于放左面
    // 大于放右面
    //声明两个函数的容器
    let left = [];
    let right = [];
    //循环数组
    for(let i=0;i<ary.length;i++){
    //取出当前项
     let cur = ary[i]
    cur < point ? left.push(cur) : right.push(cur)
    }
    //递归
    return quickSort(left).concat([point],quickSort(right)) 
    }
  
    quickSort(list);
    console.log(list)