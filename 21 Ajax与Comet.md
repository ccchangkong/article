# 21 Ajax与Comet

## 21.1 XMLHttpRequest对象

```js
//适用于IE7之前的版本
function createXHR() {
	if(typeof(arguments.callee.activeXstring) != "string") {
		var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
			i, len;
		for(i = 0, len = versions.length; i < len; i++) {
			try {
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			} catch(e) {
				//TODO handle the exception
			}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
}
//ie7+
var xhr = new XMLHttpRequest();
```

```js
//兼容
function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else if(typeof ActiveXObject != 'undefined') {
		if(typeof(arguments.callee.activeXstring) != "string") {
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
				i, len;
			for(i = 0, len = versions.length; i < len; i++) {
				try {
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch(e) {
					//TODO handle the exception
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error('no xhr object available')
	}
}
var xhr = createXHR();
```

### 21.1.1 XHR对象

```js
//use xhr
xhr.open('get', 'example.txt', false); //还没发送请求呢
```

```js
xhr.open('get', 'example.txt', false);
xhr.send(null);
```

| XHR属性        | 简介                                      |
| ------------ | --------------------------------------- |
| responseText | 作为响应主体被返回的文本                            |
| responseXML  | 如果响应的内容类型时xml。则这个属性将保存包含着响应数据的XML DOM文档 |
| status       | 响应的HTTP状态                               |
| statusText   | HTTP状态的说明                               |

`status`值为200则请求成功，304表示请求的资源并没有修改，可以用缓存

```js
xhr.open('get', 'example.txt', false);
xhr.send(null);
if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	console.log(xhr.responseText);
} else {
	console.log("request was unsuccessful:" + xhr.status);
}
```

`readyState`的值为4表示已经接收到全部响应数据，可以使用了

```js
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			console.log(xhr.responseText);
		} else {
			console.log("request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('get', 'example.txt', false);
xhr.send(null);
```

```js
//取消异步请求
xhr.abort();
```

### 21.1.2 HTTP头部信息

| 头部信息            | 简介                           |
| --------------- | ---------------------------- |
| Accept          | 浏览器能够处理的内容类型                 |
| Accept-Charest  | 浏览器能够显示的字符集                  |
| Accept-Encoding | 浏览器能够处理的压缩编码                 |
| Accept-Language | 浏览器当前设置的语言                   |
| Connection      | 浏览器与服务器之间连接的类型               |
| Cookie          | 当前页面设置的任何Cookie              |
| Host            | 发出请求的页面所在的域                  |
| Referer         | 发出请求的页面的URl。规范里拼错了(referrer) |
| User-Agent      | 浏览器的用户代理字符串                  |

```js
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			console.log(xhr.responseText);
		} else {
			console.log("request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('get', 'example.txt', false);
xhr.setRequestHeader("MyHeader", 'MyValue');
xhr.send(null);
```

```js
//头部信息
var myHeader = xhr.getResponseHeader("MyHeader");
var allHeaders = xhr.getAllResponseHeaders();
```

### 21.1.3 GET请求

> 最常见的请求类型，最常用于向服务器查询某些信息

```js
xhr.open('get', 'example.php?name1=value1&name2=value2', true);
```

```js
//辅助函数
function addURLParam(url, name, value) {
	url += (url.indexOf('?') == -1 ? '?' : '&');
	url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return url;
}

var url = 'example.php';
//添加参数
url = addURLParam(url, 'name', 'N');
url = addURLParam(url, 'book', 'js');
//初始化请求
xhr.open('get', url, false);
```

### 21.1.4 POST请求

> 通常用于向服务器发送应该被保存的数据

```js
xhr.open('post', 'example.txt', true);
```

```js
function submitData() {
	var xhr = createXHR();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				console.log(xhr.responseText);
			} else {
				console.log("request was unsuccessful:" + xhr.status);
			}
		}
	};
	xhr.open('post', 'example.php', true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var form = document.getElementById('user-info');
	xhr.send(serialize(form));
}
```

## 21.2 XMLHttpRequest2级

### 21.2.1 FormData

```js
//ie11+
var data = new FormData();
data.append('name', 'n');
```

```js
var data = new FormData(document.forms[0]);
```

```js
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			console.log(xhr.responseText);
		} else {
			console.log("request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('post', 'example.php', true);
var form = document.getElementById('user-info');
xhr.send(new FormData(form));
```

### 21.2.2 超时设定

```js
var xhr = createXHR();
xhr.onreadystatechange = function() {
	if(xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
			console.log(xhr.responseText);
		} else {
			console.log("request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('post', 'example.php', true);
var form = document.getElementById('user-info');
xhr.send(new FormData(form));
```

### 21.2.3 overrideMimeType()方法

用于重写XHR响应的MIME类型

```js
var xhr = createXHR();
xhr.open('get', 'example.php', true);
xhr.overrideMimeType('text/xml');
xhr.send(null);
```

## 21.3 进度事件

### 21.3.1 load事件

在接收到完整的响应数据时触发

```js
//load
var xhr = createXHR();
xhr.onload = function() {
	if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		console.log(xhr.responseText);
	} else {
		console.log("request was unsuccessful:" + xhr.status);
	}
};
xhr.open('get', 'example.php', true);
xhr.send(null);
```

### 21.3.2 progress事件

在接收响应期间持续不断的触发

```js
//progress
var xhr = createXHR();
xhr.onload = function() {
	if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
		console.log(xhr.responseText);
	} else {
		console.log("request was unsuccessful:" + xhr.status);
	}
};
xhr.onprogress=function (event) {
	var diovStatus=document.getElementById('status');
	if (event.lengthComputable) {
		diovStatus.innerHTML='received'+event.position+'of'+event.totalSize+'bytes';
	}
};
xhr.open('get', 'example.php', true);
xhr.send(null);
```

## 21.4 跨源资源共享

> 默认的情况下，XHR对象只能访问与包含它的页面位于同一个域中的资源
>
> CORS(Cross-Origin Resource Sharin,跨源资源共享)

### 21.4.1 IE对CORS的实现

IE8中的XDR(XDomainRequest)类型.

### 21.4.2 其他浏览器对CORS的实现

使用`XHR对象`并在`open()`方法中传入绝对URL

### 21.4.3 Preflighted Reqeusts

CORS通过一种叫做Preflighted Requests的透明服务器验证机制支持开发人员使用自定义的头部、GET、或POST之外的方法，以及不同类型的主体内容。

### 21.4.4 带凭据的请求

将`withCredentials`属性设置为`true`,可以指定某个请求应该发送凭据

### 21.4.5 跨浏览器的CORS

```js
//cros
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest();
	if('withCredentials' in xhr) {
		xhr.open(method, url, true);
	} else if(typeof XDomainRequest != 'undefined') {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}
var request = createCORSRequest('get', 'http://www.bilibili.com/video/av6255062/');
if(request) {
	request.onload = function() {
		//对request.responseText进行处理
	};
	request.send();
}
```

共同的属性、方法

| 属性、方法        | 简介                         |
| ------------ | -------------------------- |
| abort()      | 用于停止正在进行的请求                |
| onerror      | 用于替代onreadystatechange检测错误 |
| onload       | 用于替代onreadystatechange检测成功 |
| responseText | 用于取得响应内容                   |
| send()       | 用于发送请求                     |

## 21.5 其他跨域技术

### 21.5.1 图像Ping

```js
//img ping
var img = new Image();
img.onload = img.onerror = function() {
	alert('done');
};
img.src = 'http://www.bilibili.com/test?name=n';
```

图像Ping最常用于跟踪用户点击页面或动态广告曝光次数。

有两个缺点，一是只能发送GET请求，二是无法访问服务器响应文本。

只能用于浏览器与服务器间的单向通信

### 21.5.2 JSONP

> JSON with padding

```js
//JSONP
function handleResponse(response) {
	console.log('you are at IP address' + response.ip + ',which is in' + response.city + ',' + response.region_name);
}
var script = document.createElement('script');
script.src = 'http://freegeoip.net/json/?callback=handleResponse';
document.body.insertBefore(script, document.body.firstChild);
```

与前者相比，能够直接访问响应文本，支持在浏览器与服务器之间双向通信

缺点：从其他域中加载代码执行，不一定安全；其次，要确定JSONP请求是否失败并不容易

### 21.5.3 Comet

> 更高级的Ajax技术，也称服务器推送，实现方式有长轮询和流

长轮询使用XHR对象和`setTimeout`就能实现

HTTP流需要服务器端配合

```js
function createStreamingClient(url, progress, finished) {
	var xhr = new XMLHttpRequest(),
		received = 0;
	xhr.open('get'.url, true);
	xhr.onreadystatechange = function() {
		var result;
		if(xhr.readyState == 3) {
			//只取得最新数据并调整计数器
			result = xhr.responseText.substring(received);
			received += result.length;
			//调用progress回调函数
			progress(result);
		} else if(xhr.readyState == 4) {
			finished(xhr.responseText);
		}
	};
	xhr.send(null);
	return xhr;
}
var client = createStreamingClient('streaming.php', function(data) {
	console.log('received:' + data);
}, function(data) {
	console.log('done');
});
```

### 21.5.4 服务器发送事件

> sse(Sever-Sent Events)

#### 1 SSE API

```js
//sse
var source = new EventSource('myevents.php');

source.onmessage = function(event) {
	var data = event.data;
	//处理数据
};
source.close();
```

#### 事件流

> 所谓的服务器事件会通过一个持久的HTTP响应发送，这个响应的MIME类型为`text/event-stream`

### 21.5.5 Web Sockets

略

## 21.6 安全

要验证发送请求者是否有权限访问相应的资源