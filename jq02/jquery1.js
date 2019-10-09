
var waterfall = function (wrap, boxes) {
    //获取屏幕可以显示的列数
    var boxWidth = boxes.eq(0).width() + 40;
    var winWidth = $(window).width();
    var colsNumber = Math.floor(winWidth / boxWidth);

    //设置容器的宽度
    wrap.width(boxWidth * colsNumber);
    var everyHeight = new Array();
    for (var i = 0; i < boxes.length; i++) {
        if (i < colsNumber) {
            everyHeight[i] = boxes.eq(i).height() + 40;
        } else {
            var minHeight = Math.min.apply(null, everyHeight);
            var minIndex = getIndex(minHeight, everyHeight);
            //var leftValue = boxes.eq(minIndex).position().left;
            boxes.eq(i).css({
                'position': 'absolute',
                'top': minHeight,
                'left': boxes.eq(minIndex).position().left,
                'opacity':'0'
            }).stop().animate({
                'opacity':'1'
            },1000)
            everyHeight[minIndex] += boxes.eq(i).height() + 40;
        }
    }
    //console.log(boxWidth)
}

//获取最小列的索引
function getIndex(minHeight, everyHeight) {
    for (index in everyHeight) {
        if (everyHeight[index] == minHeight) {
            return index;
        }
    }
}

$(document).ready(function (event) {
    var wrap = $('#wrap');
    var boxes = $('#wrap').children('div');
    waterfall(wrap, boxes);
    
  
})