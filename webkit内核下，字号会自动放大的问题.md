# webkit内核下，字号会自动放大的问题

## 问题描述

有时候在做移动端页面的时候，会发现某些字体会自动放大（而页面中另一部分却是对的- -），放大的比例看上去还没啥规律，很是诡异。

![](http://ww1.sinaimg.cn/large/6c7bfb12gw1f8szlrmuzsj20ys0m3gt4.jpg)

## 一探究竟

网上一同搜索，还真搜出来了。

首先，这个不是bug，是Chromium内核提高移动端文本可读性的一个特性，叫做这个特性被称做「Text Autosizer」，又称「Font Boosting」、「Font Inflation」，具体可以见这个文档[Chromium’s Text Autosizer](https://docs.google.com/document/d/1PPcEwAhXJJ1TQShor29KWB17KJJq7UJOM34oHwYP3Zg/edit)，计算规则则可以在这里看到[TextAutosizer.cpp](https://cs.chromium.org/chromium/src/third_party/WebKit/Source/core/layout/TextAutosizer.cpp),在文档里可以看到计算公式如下

```c
multiplier = Math.max(1, deviceScaleAdjustment * textScalingSlider * systemFontScale * clusterWidth / screenWidth);
if (originFontSize < 16) {
    computedFontSize = originFontSize * multiplier;
}
else if (16 <= originFontSize <= (32 * multiplier - 16)) {
    computedFontSize = (originFontSize / 2) + (16 * multiplier - 8);
}
else if (originFontSize > (32 * multiplier - 16)) {
    computedFontSize = originFontSize;
}
```

变量解释：

- `originFontSize`: 原始字体大小
- `computedFontSize`: 经过计算后的字体大小
- `multiplier`: 换算系数，值由以下几个值计算得到`deviceScaleAdjustment`: 
  当指定 `viewport width=device-width` 时此值为 1，否则值在 1.05 - 1.3 之间，有专门的计算规则
  `textScalingSlider`: 浏览器中手动指定的缩放比例，默认为 1
  `systemFontScale`: 系统字体大小，Android设备可以在「设备 - 显示 - 字体大小」处设置，默认为 1
  `clusterWidth`: 应用 Font Boosting 特性字体所在元素的宽度（如何确定这个元素请参考上边两个链接）
  `screenWidth`: 设备屏幕分辨率（DIPs, Density-Independent Pixels），如 iPhone 5 为 320


## 解决问题

其实嘛，解决起来还是容易的~

### 给元素指定宽高

试了下给元素单独设置`width`或`height`或`max-height`即可禁用Text Autosizer

### 使用-webkit-text-size-adjust

给元素设置` -webkit-text-size-adjust: none;`可禁用Text Autosizer，这个属性还能使得我们在移动端使用小于12px的字体。此属性在桌面版中无效。

## 参考资料

[flexible.js字体大小诡异现象解析及解决方案](http://www.cnblogs.com/axl234/p/5895347.html)

[网页字体缩放样式-webkit-text-size-adjust的用法详解](http://www.aimks.com/web-page-font-scaling-style-webkit-usage-details.html)

以上。

![](http://ww1.sinaimg.cn/large/6c7bfb12gw1f8t0gi0dhoj20dr0gojso.jpg)

new game！



