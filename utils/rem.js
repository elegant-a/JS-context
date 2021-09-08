~function rem(desW){
    desW = null;
    var width = document.documentElement.clientWidth || document.body.clientWidth;
    var ratio = width / desW;
    var fontSize = 100 * ratio
    document.getElementsByTagName('html')[0].style['font-size'] = fontSize +  'px';
}()