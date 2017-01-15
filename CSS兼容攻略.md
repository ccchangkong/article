# CSS兼容攻略

> 平常要多留心，摸不准兼容如何就该多看看[can i use](http://caniuse.com/)，额，还有就是自己要明白页面该兼容到什么程度

## 1 是否需要兼容

一上来得把这个问题想好，有些效果不兼容就不兼容呗，只要后退平稳即可，

如这种情况下的CSS Shapes：

![](http://ww3.sinaimg.cn/large/6c7bfb12gw1fbrd9ufoqej20850jvdhc.jpg)

图片来自[w3cplus](http://www.w3cplus.com/css3/why-you-should-be-excited-about-css-shapes.html)，这种情况下，对于不支持CSS Shapes属性的浏览器，还是不用强行支持的好。

## 2 是否只需后退处理即可

跟第一点比就是加上额外的后退处理（本来就该有的），如CSS渐变的后退处理：

```css
    background-color: #f9efee;
    background-image: linear-gradient(to left, #f5e5e3 0%, #ffffff 52%, #f5e5e3 100%);
```
## 3 需要额外区别的情况

用css处理的话就是各种HACK了：

[CSS hack技巧大全](http://www.duitang.com/static/csshack.html)

[巧用浏览器CSS属性值的不兼容向下兼容hack技巧](http://www.zhangxinxu.com/wordpress/2016/10/browser-css-property-down-compatible-hack-technology/)

用JS处理的话，最好的方法自然是能力判断了，可以使用[modernizr.js](http://www.modernizr.com/)或如下代码：

```js
if ( !'shape-margin' in document.documentElement.style) {}
//如果不支持shape-margin属性则如何如何
```

## 4 强行效果一样

到了这一步，那只能拿出这种代码了

```css
text-shadow: 2px 2px 15px #333;
filter: glow(color=#333333, strength=2);
/*老IE不支持文字阴影，对其使用IE滤镜*/
```

又多又杂，[还是看这吧](http://www.zhangxinxu.com/wordpress/?s=%E5%85%BC%E5%AE%B9)

