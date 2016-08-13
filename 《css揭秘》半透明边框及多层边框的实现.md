# 《css揭秘》半透明边框及多层边框的实现

~~写了一个多小时居然出错丢失了，混蛋啊。。。~~

《css揭秘》现学现卖系列

##半透明边框

###1.图片方案

没啥讲的。

我就是要用css实现。

###2.border+background-clip方案

很天真，想着直接border-color给个rgba值不就完了嘛，然后

![img](http://www.vastskycc.com/zb_users/upload/2016/06/201606241466738284739644.png)

貌似跟想象中的效果不太一样么。还是自己知识水平不够，不知道border是盖在background-color，加padding和margin也没用。额，那有啥办法么，有的~

![b2.png](http://www.vastskycc.com/zb_users/upload/2016/06/201606241466739015487549.png)

background-clip属性登场，她的值跟box-sizing差不多，这里给了个padding-box。

小结，兼容性IE9+（RGBA），后退平稳（先设个正常的border颜色）。

###3.outline方案

虽然没怎么见人用过，但莫名感觉很有用的属性。

![img](http://www.vastskycc.com/zb_users/upload/2016/06/201606241466738288108097.png)

这也是我在项目中使用的方法，

兼容性嘛，还是RGBA的IE9+，后退平稳。

###4.box-shadow方案

box-shadow用的人就很多了，但好多人没留意过她的语法



```CSS
box-shadow: h-shadow v-shadow blur spread color inset;
```

如果就第三项blur模糊距离给0，第四项阴影尺寸给值，那么

![img](http://www.vastskycc.com/zb_users/upload/2016/06/201606241466738285877869.png)

实现啦~

不过，有点小问题，在IE9以下，就没边了，所以我没用她，不过把她放最后是为了什么呢，嘿嘿，就是为了引出本文的第二部分。

##多层边框

图片方法就不说了，border只能一层（或许径向渐变能整一下？好像不行），outline+border有两层，也算多边框了，那box-shadow呢，呵，想加几个就几个~

![img](http://www.vastskycc.com/zb_users/upload/2016/06/201606241466738287176928.png)



```CSS
box-shadow:0px 0px 0px 5px #888888 inset,0px 0px 0px 5px #000000, 0px 0px 0px 10px #ff0000;
```

这里有三层边框，一个5px的内部阴影（inset），一个5px的黑框，一个5px（10-5，前面的阴影盖在后来的上面）的红框。

虽然是IE9+，但还算可接受啦。

对了，宽度要注意！其他没什么了。

就这样吧。

>2016年6月25日补充：

box-shadow方案与outline方案相比，支持圆角。不过outline以后可能会支持圆角