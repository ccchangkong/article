# 基于vue+muse-ui的简历生成器

[项目地址](https://github.com/ccchangkong/ccresume)


[预览](https://ccchangkong.github.io/ccresume/)

## 项目说明

由webpack构建，vue2.0驱动，muse-ui样式库搭建，组件化开发，localstrong存储，h2ml2canvas导出图片，jquery free

## 项目结构

![](http://ww2.sinaimg.cn/large/6c7bfb12gw1fa47kk0cucj204i0k2gm9.jpg)

vue-cli搭建的模板，分了两个组件

## 踩的坑

### html2canvas

> 这玩意有点坑

#### 对css属性展现有问题

border-radius属性不知为何，截得的角度只有一半（设置50%的话截出来就25%），后来设置了100%居然成了；

linear-gradient渐变显示不出来，postion也不对，不管了；

opacity、visibility设置透明没用。

#### 图片跨域的问题

可以用官方提供的各种代理来解决，我这边选择了本地图片转base64存localstrong

#### 异步的问题

在生成图片前进行操作，可能顺序会出问题，解决方法是把html2canvas方法放在this.$nextTick()里

#### 兼容有问题

### vue

> 这个主要是自己知识水平不够

#### 作用域

window.alert(),this.data什么的

### 组件通信

父到子props，子到父events，如果有多层组件的话应该用vuex统一管理

## 不足

1.兼容没处理好，chrome、ff测试没问题，IE11和EDGE截图功能出错；

2.组件拆分不够，两个大模块确实不好看；

3.没用vuex，数据通信有点乱；

4.代码解耦不完全。

## 以上！

![](http://ww2.sinaimg.cn/large/6c7bfb12gw1fa4gzhxz2pj2050050mx9.jpg)

千岁我老婆~