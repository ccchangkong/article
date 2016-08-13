# 《javascript高级程序设计》笔记1（第2章 在HTML中使用JS，第3章 基本概念）

>犀牛书和红皮书以前是读完了，不过一来是没经验，二来是读的太粗。工作了之后，也只是浅浅的用下JQ，唔，就是一个简单却带点无聊的切图仔。
>不过呢，自己好赖也是个小年轻，按捺不住的想要接触些酷炫的东西（react之类的），然后就认识到自己薄弱的JS基础了，于是呢，我就重拾起吃灰已久的红皮书，细细品味就是写点笔记，，，再摘录一点放到网上。
>那么，开始了~

代码示例：[https://github.com/ccchangkong/js/tree/master/js](https://github.com/ccchangkong/js/tree/master/js)

##第一章介绍略过。

##第二章在HTML中使用JS。

在<script>中有6个属性，值得一提的是defer延迟加载属性。

##第三章基本概念

数值：数值转换的3个函数Number()、parseInt()、parseFloat()。parseInt()可传第二个参数设置进制。

位操作：数值以64位格式存储、32位格式进行位操作。负数为补码表示（取反码再+1）。~非、&与、|或、^异或（不同出一）。<<、>>无符号（正负）移位数、<<<、>>>有符号移位数。

布尔操作符：！取反、&&与（有null出null，null是没有值；有underfined出underfined，underfined为未定义值；有NaN出NaN，NaN为不是数值）、||或。

乘性操作符：*乘、/除、%取模。

加性操作符：+（字符拼接主意数字，可用圆括号先操作）、-。

关系操作符：<、>、<=、>=。例B<a为true，都为字符串时比较字符编码值，大写总小于小写；“23”<“3”为true；“23”<3为false；“a”<“3”为false，a转换为NaN。

相等操作符：==、!=、===、!==（带比较类型）。NaN!=NaN，null==underfined。

label与break配合跳出循环嵌套。

函数:arguements[].

![IMG_20160709_214141.jpg](http://www.vastskycc.com/zb_users/upload/2016/07/201607091468071855390573.jpg)

萌萌哒小埋书签~