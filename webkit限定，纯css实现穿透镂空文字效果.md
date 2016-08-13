# webkit限定，纯css实现穿透镂空文字效果

>我在 [segmentfault](https://segmentfault.com/) 上 [CSS特效：如何让文字覆盖的背景区域变透明？](https://segmentfault.com/q/1010000006235231?_ea=1059007)写的回答，感觉写的还可以，就拿来凑文章了~

![img](https://segmentfault.com/img/bVAkcT)

实现图上这样的镂空文字效果

![img](https://sfault-image.b0.upaiyun.com/382/060/3820609300-57abf1c5167bd_articlex)



```html
<p>Red</p>
```



```CSS
             p:after {
                position: absolute;
                z-index: -2;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: '';
                background-image: inherit;
            }
            
            p:before {
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                content: '';
                background-color: rgba(256, 256, 256, .5);
            }
            
            p {
                font-size: 120px;
                line-height: 600px;
                position: relative;
                display: block;
                width: 551px;
                overflow: hidden;
                text-align: center;
                color: #fff;
                -webkit-text-fill-color: transparent;
                background-image: url(a.png);
                -webkit-background-clip: text;            
            }
```

两个伪元素，一个真-背景图，一个半透明遮蔽层，主体思想部分用了两个webkit限定属性,这两个属性看名字就知道了干啥用了就不解释了。

如果不支持这两个属性的话是这个样子的

![QQ图片20160811150227.png](http://www.vastskycc.com/zb_users/upload/2016/08/201608111470899136814447.png)

以上。

![984a5dcad1c8a78666ad005e6f09c93d71cf50b5.jpg](http://www.vastskycc.com/zb_users/upload/2016/08/201608111470899405974660.jpg)