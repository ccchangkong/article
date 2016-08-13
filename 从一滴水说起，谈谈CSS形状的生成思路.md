# 从一滴水说起，谈谈CSS形状的生成思路

>水是生命之源、生产之要、生态之基。兴水利、除水害,事关人类生存、社会进步,历来是治国安邦的大事。巴拉巴拉~不扯淡了，

来看看下面这张图，额，为了扣题，就管她叫水滴吧（虽然是倒的），从这开始，让我们用css来生成她~

![fN.png](http://www.vastskycc.com/zb_users/upload/2016/08/201608071470561087150481.png)

##1.首先把她理解成一个圆与一个三角组合而成，这样，就有了第一种组合法



```CSS
    .box1 {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%;
        position: relative;
    }

    .box1::after {
        position: absolute;
        content: '';
        width: 50%;
        height: 50%;
        background-color: #000;
        /*     transform: rotate(45deg) translate(-50%, -50%);
        left: 50%;
        top: 50%;*/
        transform: rotate(45deg);
        left: 25%;
        top: 60%;
    }
```

简单粗暴，一个圆加一个旋转的方块露出的三角，在这里还尝试了下用translate来尝试定位，虽然失败了（不好定位，没旋转的时候很好用，且能使用基于自身的百分比值来定位，可方便的实现垂直居中）。

##2.还有种思路，一个竖着的椭圆，把她的左下右下想把法去掉，然后就有了以下两种尝试



```CSS
    .box2 {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50%;
        position: relative;
    }
    .box2::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background-color: red;
        background: linear-gradient(-45deg,#fff  67%, transparent 0) right, linear-gradient(45deg, #fff 67%, transparent 0) left;  background-size: 50% 100%;
        background-repeat: no-repeat;
        top: 50%;
    }
```

再这里抱个歉，最终效果我没调成，果然一边看直播一边写demo就是没效率，话说96B跑的真块啊

先拿一个圆，再拿一个豁了一个三角的长方形给挡住，差不多是这意思~



```CSS
    .box3 {
        width: 100px;
        height: 100px;
        background: linear-gradient(-45deg, transparent 33%, red 0) right, linear-gradient(45deg, transparent 33%, red 0) left;
        background-size: 50% 100%;
        background-repeat: no-repeat;
        border-radius: 50% 50%;
        position: relative;
    }
```

这个是上面的改进版，直接对自身使用径向渐变 ，把左右两角设为透明，最终效果也没调成，囧

##3.顺着上面的思路，自然想到了能直接对圆进行切割的clip-path属性虽然兼容堪忧



```CSS
    .box4 {
        width: 100px;
        height: 100px;
        position: relative;
        background-color: red;
        -webkit-clip-path: inset(0 0 0 0 round 50% 50% 0 50%);
        -o-clip-path: inset(0 0 0 0 round 50% 50% 0 50%);
        clip-path: inset(0 0 0 0 round 50% 50% 0 50%);
        transform: rotate(45deg);
    }
```

照理说直接切割应该能切出来，但我没弄出来，都是直播的锅，这里我取了个巧，弄了个三个角取圆，一个角直角，最后旋转的方法。

[http://bennettfeely.com/clippy/](http://bennettfeely.com/clippy/)   附个clip-path生成器，虽然不能生成本文的水滴。

##4.其实都能想到了，3里面为什么不直接用border-radius生成圆角呢，兼容还好点，于是



```CSS
    .box1 {
        width: 100px;
        height: 100px;
        background-color: red;
        border-radius: 50% 50% 0; /*top;leftright;bottom*/
        transform: rotate(45deg);
   }
```

我也不是谦虚，其实我第一个想出来的方法就是这个，上面的就是想凑点字数，代码简洁，易于理解，我网上找了下好像也没人写锅这个，好顶赞~

>总结：

想要一个形状，我们可以遮，切，组合，旋转，这么多种方法，结合伪元素、动画属性，真是其乐无穷~

当然了可以直接base64或者用图片

[http://pan.baidu.com/s/1dFlxtGP](http://pan.baidu.com/s/1dFlxtGP) 上面demo放这了，顺序不对请不要介意，话说有空得搞个demo页了。

附：CSS生成云朵



```CSS
    .demo {
        height: 50px;
        width: 50px;
        box-shadow: #eee 65px -15px 0 -5px, #eee 25px -25px, #eee 30px 10px, #eee 60px 15px 0 -10px, #eee 85px 5px 0 -5px;
        border-radius: 50%;
    }
```

自身是圆，生成自身的阴影再偏移，许多个阴影组合而出的云。

可以在[http://www.vastskycc.com/404.html](http://www.vastskycc.com/404.html)这里看到，啊，当然不是我写的，哭~

![fce67b41d30cedcc6f4756395a4306f4.jpg](http://www.vastskycc.com/zb_users/upload/2016/08/201608071470564405493452.jpg)