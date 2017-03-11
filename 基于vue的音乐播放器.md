# 基于vue的音乐播放器

[项目地址](https://github.com/ccchangkong/ccplayer)


[预览](http://www.vastskycc.com/ccplayer/index.html)

## 项目说明

由webpack构建，基于vue全家桶，模块化开发，调用了qq音乐的接口

![](http://wx2.sinaimg.cn/large/6c7bfb12gy1fdj1u2lhtcj20af0iiabk.jpg)
![](http://wx2.sinaimg.cn/large/6c7bfb12gy1fdj1u35us5j20af0ijgrj.jpg)
![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fdj1u3udtqj20ad0ijjux.jpg)

## 项目结构

```html
<template>
  <div id="app">
     <header>
        <img>
     </header>
        <main>
      <player></player>
      <section>
      <nav>
          <router-link to='/search'>搜索</router-link>
          <router-link to='/hot'>热榜</router-link> 
          <router-link to='/list'>新歌</router-link> 
          <router-link to='/history'>历史</router-link>    
      </nav>
      <keep-alive >
          <router-view ></router-view>
        </keep-alive> 
      </section>
     </main>
      <footer>
        <BottomBtn></BottomBtn>
      </footer>
      <About></About>
  </div>
</template>
```



![](http://wx3.sinaimg.cn/large/6c7bfb12gy1fdj1z8ma72j20gg0j53yf.jpg)

## 数据流

有空再画

## 踩的坑

### 手机chrome100vh多了导航栏的高度

监听`window.resize`事件，动态计算高度

具体的[看这里](http://www.cnblogs.com/erbingbing/p/6340930.html)

### 移动端`audio`元素填充了`src`不会自动播放

填充了数据后加个触发

```javascript
document.querySelector('#player').play()
```

### 性能问题

动画用多了，姑且去掉了些效果（模糊之类的），用了玄学的`will-change`、`transform: translate3d(0, 0, 0)`,不过感觉好像没啥用，看来得用`transform`替代一些高宽大小变换

### 其他想起来再补充


## 不足

### 我已经不管兼容性了啊哈哈哈哈哈哈

滥用`flex`布局；

`Polyfill`？那是什么？

### 还是用了jquery

还只用了jq的`ajax`，因为用axios遇到了些问题。

## 后续计划

播放模式

歌词及其相关

桌面端布局

收藏列表

本地存储

涟漪效果

ps：谁知道什么时候去做呢，啊哈哈哈哈

## 以上！

![](http://wx1.sinaimg.cn/mw690/6c7bfb12gy1fdj2fmwhv2j20go0jyab8.jpg)

2B小姐姐~