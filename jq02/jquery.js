//模拟数据
var data = [
    {
        "src": "img/1.jpg",
        "title":"第1位"
    },
    {
        "src": "img/2.jpg",
        "title": "第2位"
    },
    {
        "src": "img/3.jpg",
        "title": "第3位"
    },
    {
        "src": "img/4.jpg",
        "title": "第4位"
    },
    {
        "src": "img/5.jpg",
        "title": "第5位"
    },
    {
        "src": "img/6.jpg",
        "title": "第6位"
    },
    {
        "src": "img/7.jpg",
        "title": "第7位"
    },
    {
        "src": "img/8.jpg",
        "title": "第8位"
    },
    {
        "src": "img/9.jpg",
        "title": "第9位"
    },
    {
        "src": "img/10.jpg",
        "title": "第10位"
    },
    {
        "src": "img/11.jpg",
        "title": "第11位"
    },
    {
        "src": "img/12.jpg",
        "title": "第12位"
    },
    {
        "src": "img/13.jpg",
        "title": "第13位"
    },
    {
        "src": "img/14.jpg",
        "title": "第14位"
    },
    {
        "src": "img/15.jpg",
        "title": "第15位"
    },
    {
        "src": "img/16.jpg",
        "title": "第16位"
    },
    {
        "src": "img/17.jpg",
        "title": "第17位"
    },
    {
        "src": "img/18.jpg",
        "title": "第18位"
    },
]

console.log(data[0].src)
console.log(data[1].title)
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
            //获取最小列的高度
            var minHeight = Math.min.apply(null, everyHeight);
            //获取最下列的索引
            var minIndex = getIndex(minHeight, everyHeight);
            //设置盒子样式
            setStyle(boxes.eq(i),minHeight,boxes.eq(minIndex).position().left,i)
            //var leftValue = boxes.eq(minIndex).position().left;
            //boxes.eq(i).css({
            //    'position': 'absolute',
            //    'top': minHeight,
            //    'left': boxes.eq(minIndex).position().left,
            //    'opacity':'0'
            //}).stop().animate({
            //    'opacity':'1'
            //},1000)
            //更新最小列的高度
            everyHeight[minIndex] += boxes.eq(i).height() + 40;
        }
        //鼠标经过盒子的效果
        boxes.eq(i).hover(function (event) {
            $(this).stop().animate({
                'opacity':'0.5'
            },500)
        }, function (event) {
            $(this).stop().animate({
                'opacity': '1'
            }, 500)
        })
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

//数据请求验证
var getCheck = function (wrap) {
    //获取文档高度
    var documentHeight = $(window).height();
    //获取文档向上滚动的高度
    var scrollHeight = $(window).scrollTop();
    //获取最后一个盒子所在列的总高度
    var boxes = wrap.children('div');
    var lastBoxTop = boxes.eq(boxes.length - 1).offset().top;
    var lastHeight = boxes.eq(boxes.length - 1).height() + 20;
    var lastColHeight = lastBoxTop + lastHeight;
    return documentHeight + scrollHeight >= lastColHeight ? true : false;

}

//追加盒子函数
//function appendBox() {}  //一样的 简单函数
var appendBox = function (wrap, boxes) {
    if (getCheck(wrap)) {
        for (i in data) {
            var innerString = '<div><img src="' + data[i].src + '" alt="" /><a href="http://www.imooc.com" target="_blank">' + data[i].title + '</a></div>'
            wrap.append(innerString);
            //wrap.append('<div><img src="img/1.jpg" alt="" /><a href="http://www.imooc.com" target="_blank">第一位</a></div>');
        };
    } else {
        return false
    }
    
    waterfall(wrap, wrap.children('div'));
}

//设置追加盒子的样式
var getStartNumber = 0;
var setStyle = function (box,top,left,index) {
    if (getStartNumber >= index) {
        return false
    }
    box.css({
        'position': 'absolute',
        'top': top,
        'left': left,
        'opacity': '0'
    }).stop().animate({
        'opacity': '1'
    }, 1000);
    getStartNumber = index;
}

$(document).ready(function (event) {
    //获取容器与盒子
    var wrap = $('#wrap');
    var boxes = $('#wrap').children('div');
    //加载盒子
    waterfall(wrap, boxes);
    
    //滚动事件
    $(this).scroll(function (event) {
        appendBox(wrap, boxes);
    })
})