# 使用attr()给伪元素更优雅的赋值

[https://segmentfault.com/q/1010000006551803?_ea=1074082](https://segmentfault.com/q/1010000006551803?_ea=1074082)出自这个问题的我的回答，觉得值得一说，拿来凑更。

[https://jsfiddle.net/ccchangkong/aykdu5o6/2/](https://jsfiddle.net/ccchangkong/aykdu5o6/2/) 在线demo


```html
    <div data-num='1' class="a1">33333</div>
    <div data-num='' class="a1">33333</div>
```



```CSS
    .a1 {
        width: 200px;
        height: 200px;
        background-color: #333;
        color: #fff;
        position: relative;
        margin-top: 50px;
    }
    
    .num:after {
        content: attr(data-num);
        line-height: 50px;
        text-align: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top: -20px;
        right: -20px;
    }
```



```JavaScript
        $(".a1").each(function() {
            if ($(this).attr('data-num') != '') {
                $(this).addClass('num');
            }
        });
        $('.a1').click(function() {
        let n=$(this).attr('data-num');
            $(this).addClass('num').attr('data-num', ++n);
        });
```

好像也没什么好说的，就这样吧~



![img](http://www.vastskycc.com/zb_users/upload/2016/08/201608171471401635771851.jpg)



![img](http://www.vastskycc.com/zb_users/upload/2016/08/201608171471401635321204.jpg)

![img](http://www.vastskycc.com/zb_users/upload/2016/08/201608171471401636618644.jpg)