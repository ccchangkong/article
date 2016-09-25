# 25 新兴的API

## 25.1 requestAnimationFrame()

### 25.1.1 早期动画循环

```js
(function() {
	function updateAnimations() {
		doAnimation1();
		doAnimation2();
	}
	setInterval(updateAnimations, 100);
})();
```

### 25.1.2 循环间隔的问题

浏览器计时器的精度问题

### 25.1.3 mozRequestAnimationFrame 

```js
function updateProgress() {
	var div = document.getElementById('status');
	div.style.width = (parseInt(div.style.width, 10) + 5) + '%';
	if(div.style.left != '100%') {
		mozRequestAnimationFrame(updateProgress);
	}
}
mozRequestAnimationFrame(updateProgress);
```

### 25.1.4 其他浏览器

```js
(function() {
	function draw(timestamp) {
		//计算两次重绘的时间间隔
		var diff = timestamp - startTime;
		//使用diff确定下一步的绘制时间
		//把startTime重写为这一次的绘制时间
		startTime = timestamp;
		//重绘UI
		mozRequestAnimationFrame(draw);
	}
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame,
		startTime = window.mozAnimationStartTime || Date.now();
	mozRequestAnimationFrame(draw);
})();
```

## 25.2 Page Visibility API

```js
function isHiddenSupported() {
	return typeof(document.hidden || document.msHidden || document.webkitHidden) != 'undefined';
}

if(document.hidden || document.msHidden || document.webkitHidden) {
	//页面隐藏了
} else {
	//页面未隐藏
}

function handleVisibilityChange() {
	var output = document.getElementById('output'),
		msg;
	if(document.hidden || document.msHidden || document.webkitHidden) {
		msg = 'page is now hidden.' + (new Date()) + '<br>';
	} else {
		msg = 'page is now visible.' + (new Date()) + '<br>';
	}
	output.innerHTML += msg;
}
EventUtil.addHandler(document, 'msvisibilitychange', handleVisibilityChange);
EventUtil.addHandler(document, 'webkitvisibilitychange', handleVisibilityChange);
```

## 25.3 Geolocation API

```js
navigator.geolocation.getCurrentPosition(function(position) {
	drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
}, function(error) {
	console.log('error code:' + error.code);
	console.log('error msg:' + error.message);
}, {
	enableHighAccuracy: true, //表示尽可能使用最准确的位置信息
	timeout: 5000, //等待位置信息的最长时间
	maximumAge: 25000 //有效时间

});
var watchId = navigator.geolocation.watchPosition(function(position) {
	drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
}, function(error) {
	console.log('error code:' + error.code);
	console.log('error msg:' + error.message);
});
clearWatch(watchId);
```

## 25.4 File API

```js
var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var files = EventUtil.getTarget(event).files,
		i = 0,
		len = files.length;
	while(i < len) {
		console.log(files[i].name + '(' + files[i].type + ',' + files[i].size + 'bytes)');
		i++;
	}
});
```

### 25.4.1 FileReader类型

| 方法                        | 简介                                     |
| ------------------------- | -------------------------------------- |
| readAsText(file,encoding) | 以纯文本形式读取文件，将读取到的文本保存在result属性中         |
| readAsDataURL(file)       | 读取文件并将文件以数据URL的形式保存在result中            |
| readAsBinaryString(file)  | 读取文件并将一个字符串保存在result属性中                |
| readAsArrayBuffer(file)   | 读取文件并将一个包含文件内容的ArrayBuffer保存在result属性中 |

```js
var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var info = '',
		output = document.getElementById('output'),
		progress = document.getElementById('progress'),
		files = EventUtil.getTarget(event).files,
		type = 'default',
		reader = new FileReader();
	if(/image/.test(files[0].type)) {
		reader.readAsDataURL(files[0]);
		type = 'image';
	} else {
		reader.readAsText(files[0]);
		type = 'text';
	}
	reader.onerror = function() {
		output.innerHTML = 'could not read file,error code is' + reader.error.code;
	};
	reader.onprogress = function(event) {
		if(event.lengthComputable) {
			progress.innerHTML = event.loaded + '/' + event.total;
		}
	};
	reader.onload = function() {
		var html = '';
		switch(type) {
			case 'image':
				html = "<img src=\'" + reader.result + "\'>";
				break;
			case 'text':
				html = reader.result;
				break;
			default:
				break;
		}
		output.innerHTML = html;
	};
});
```

### 25.4.2 读取部分内容

```js
function blobSlice(blob, startByte, length) {
	if(blob.slice) {
		return blob.slice(startByte, length);
	} else if(blob.webkitSlice) {
		return blob.webkitSlice(startByte, length);
	} else if(blob.mozSlice) {
		return blob.mozSlice(startByte, length);
	} else {
		return null;
	}
}
var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var info = '',
		output = document.getElementById('output'),
		progress = document.getElementById('progress'),
		files = EventUtil.getTarget(event).files,
		reader = new FileReader(),
		blob = blobSlice(files[0], 0, 32); //32B
	if(blob) {
		reader.readAsText(blob);
		reader.onerror = function() {
			output.innerHTML = 'could not read file,error code is' + reader.error.code;
		};
		reader.onload = function() {
			output.innerHTML = reader.result;
		};
	} else {
		console.log("your browser doesn't support slice().");
	}
});
```

### 25.4.3 对象URL

```js
function creatObjectUrl(blob) {
	if(window.URL) {
		return window.URL.createObjectURL(blob);
	} else if(window.webkitURL) {
		return window.webkitURL.createObjectURL(blob);
	} else {
		return null;
	}
}

var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var info = '',
		output = document.getElementById('output'),
		progress = document.getElementById('progress'),
		files = EventUtil.getTarget(event).files,
		reader = new FileReader(),
		url = creatObjectUrl(files[0]);
	if(url) {
		if(/image/.test(files[0].type)) {
			output.innerHTML = "<img src=\'" + url + "\'>";
		} else {
			output.innerHTML = 'not an img';
		}
	} else {
		output.innerHTML = 'your browser dose not support object URLs.';
	}
});
```

```js
function revokeObjectURL(url) {
	if(window.URL) {
		window.URL.revokeObjectURL(url);
	} else if(webkitURL) {
		window.webkitURL.revokeObjectURL(url);
	}
}
```

### 25.4.4 读取拖放的文件

```js
var droptarget = document.getElementById('droptarget');

function handleEvent(event) {
	var info = '',
		output = document.getElementById('output'),
		files, i, len;
	EventUtil.preventDefault(event);
	if(event.type == 'drop') {
		files = event.dataTransfer.files;
		i = 0;
		len = files.length;
		while(i < len) {
			info += files[i].name + '(' + files[i].type + ',' + files[i].size + 'bytes)<br>';
			i++;
		}
		output.innerHTML = info;
	}
}
EventUtil.addHandler(droptarget, 'dragenter', handleEvent);
EventUtil.addHandler(droptarget, 'dragover', handleEvent);
EventUtil.addHandler(droptarget, 'drop', handleEvent);
```



### 25.4.5 使用XHR上传文件

```js
var droptarget = document.getElementById('droptarget');

function handleEvent(event) {
	var info = '',
		output = document.getElementById('output'),
		data, xhr,
		files, i, len;
	EventUtil.preventDefault(event);
	if(event.type == 'drop') {
		data = new FormData();
		files = event.dataTransfer.files;
		i = 0;
		len = files.length;
		while(i < len) {
			data.append('file' + i, files[i]);
			i++;
		}
		xhr = new XMLHttpRequest();
		xhr.open('post', 'exp.php', true);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				console.log(xhr.responseText);
			}
		};
		xhr.send(data);
	}
}
EventUtil.addHandler(droptarget, 'dragenter', handleEvent);
EventUtil.addHandler(droptarget, 'dragover', handleEvent);
EventUtil.addHandler(droptarget, 'drop', handleEvent);
```

## 25.5 Web计时

window.performance对象

## 25.6 Web Workers

> 让js在后台运行

### 25.6.1 使用Worker

```js
var worker = new Worker('stufftodo.js');
worker.postMessage('start'); //给worker传递消息
worker.postMessage({
	type: 'command',
	message: 'start'
});
//worker返回的数据
worker.onmessage = function(event) {
	var data = event.data;
	//对数据进行处理
}
worker.onerror = function(event) {
	console.log('error:' + event.filename + '(' + event.lineno + ')' + event.message);
}
worker.terminate(); //立即停止worker的工作
```

### 25.6.2 Worker全局作用域

Web Workers本身也是个最小化的运行环境

包含：

最小化的`navigator`对象，包括`onLine`、`appName`、`appVersion`、`userAgent`、`platform`属性；

只读的`location`对象；

`setTimeout()`、`setInterval()`、`clearTimeout()`、`clearInterval()`方法;

`XMLHttpRequest`构造函数。

```js
//web worker内部的代码
self.onmessage = function(event) {
	var data = evnet.data;
	//处理数据
	data.sort(function(a, b) {
		return a - b;
	});
	self.postMessage(data);
};

//在页面中
var data = [23, 23, 434, 5346, 213, 52],
	worker = new Worker('exp.js');
worker.onmessage = function(event) {
	var data = event.data;
	//对排序后的数组进行操作
};
//将数组发送给worker排序
worker.postMessage(data);
//web worker内部的代码
self.close(data);
```

### 25.6.3 包含其他脚本

```js
//web worker内部的代码
importScripts('f1.js', 'f2.js');
```

