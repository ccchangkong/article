# 第十六章 HTML5脚本编程

## 16.1 跨文档消息传递

```js
var iframeWindow = document.getElementById('myFrame').contentWindow;
iframeWindow.postMessage('a secret', 'http://www.wrox.com');

EventUtil.addHandler(window, 'message', function(event) {
	//确保发送的域是已知的域
	if(event.origin == 'http://www.wrox.com') {
		//处理接收到的数据
		processMessage(event.data);

		//可选：向来源窗口发送回执
		event.source.postMessage('received', 'http://p2p.wrox.com');
	}
});
```

## 16.2 原生拖放

### 16.2.1 拖放事件

拖动某元素：1、`dragstart`；2、`drag`；3、`dragend`；事件的目标都是被拖动的元素

某元素被拖动到一个有效的放置目标时：1、`dragenter`；2、`dragover`；3、`dragleave`或`drop`；事件的目标都是作为放置目标的元素

### 16.2.2 自定义放置目标

```js
//将#droptarget变为一个放置目标
var droptarget = document.getElementById('droptarget');
EventUtil.addHandler(droptarget, 'dragover', function(event) {
	EventUtil.preventDefault(event);
});
EventUtil.addHandler(droptarget, 'dragenter', function(event) {
	EventUtil.preventDefault(event);
});
//让ff不打开新窗口
EventUtil.addHandler(droptarget, 'drag', function(event) {
	EventUtil.preventDefault(event);
});
```

### 16.2.3 dataTransfer对象

```js
//设置和接收文本数据
event.dataTransfer.setData('text', 'some test');
var text = event.dataTransfer.getData('text');
//设置和接收URL
event.dataTransfer.setData('URL', 'http://www.acfun.com');
var url = event.dataTransfer.getData('URL');

//兼容
var dataTransfer = event.dataTransfer;
//读取URL
var url = dataTransfer.getData('URL') || dataTransfer.getData('text/url-list');
//读取文本
var text = dataTransfer.getData('text');
```

### 16.2.4 dropEffect与effectAllowed

`dropEffect`：可以知道被拖动的元素能够执行哪种放置行为

`effectAllowed`：表示允许拖动元素的哪种`dropEffect`

### 16.2.5 可拖动

标签内的`draggable`设置为`true`，图像和链接默认时`true`

### 16.2.6 其他成员

`addElement(element)`：为拖动操作添加一个元素

`clearData(format)`：清除以特定格式保存的数据

`setDragImage(element,x,y)`：指定一副图像，当拖动发生时，显示在光标下方。

`types`：当前保存的数据类型

## 16.3 媒体元素

`video`、`audio`

> 指定多种格式的媒体来源时必须的

### 16.3.1 属性

一大堆

### 16.3.2 事件

一大堆

### 16.3.3 自定义媒体播放器

```html
		<div class="mediaplayer">
			<div class="video">
				<video width="800" height="400" id="player">
					<source src="myvideo.mp4" type="video/mp4"></source>
					<source src="myvideo.ogv" type="video/ogg"></source>
					<source src="myvideo.webm" type="video/webm"></source>
					<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
						<param name="movie" value="myvideo.swf" />
						<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
					</object> 当前浏览器不支持 video直接播放，点击这里下载视频：
					<a href="myvideo.webm">下载视频</a>
				</video>
			</div>
			<div class="controls">
				<input type="button" name="video-btn" id="video-btn" value="Play" />
				<span id="curtiome">0</span>/<span id="duration">0</span>
			</div>
		</div>
```

```js
//取得元素的引用
var player = document.getElementById('player'),
	btn = document.getElementById('video-btn'),
	curtime = document.getElementById('curtime'),
	duratime = document.getElementById('duratime');
//更新播放时间
duratime.innerHTML = player.duration;
//为按钮添加事件处理程序
EventUtil.addHandler(btn, 'click', function(event) {
	if(player.paused) {
		player.play();
		btn.value = 'Pause';
	} else {
		player.pause();
		btn.value = 'Play';
	}
});
//定时更新当前时间
setInterval(function () {
	curtime.innerHTML=player.currentTime;
},250);
```

### 16.3.4 检测编解码器的支持情况

````js
if (audio.canPlayType('audio/mpeg') {
	//
};
````

### 16.3.5 Audio类型

```js
var audio = new Audio('sound.mp3');
EventUtil.addHandler(audio,'canplaythrough',function (event) {
	audio.play();	
});
```

## 16.4 历史状态管理

```js
history.pushState({name:'N'},'N page' ,'n.html');//状态对象，新状态的标题，可选的相对URL

EventUtil.addHandler(window,'popstate',function (event) {
	var state=event.state;
	if (state) {
		processState(state);
	}
});
//更新当前状态
history.replaceState({name:'G'},'g page');
```

