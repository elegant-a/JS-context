

//我们要在a模块导出,再引入才可以用
function fn(){
    console.log("我是A模块下的方法")
}module.exports = {
    fn:fn
}