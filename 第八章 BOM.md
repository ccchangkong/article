# 第八章 BOM

> BOM:浏览器对象模型

## 8.1 window对象

### 8.1.1 全局作用域

所有在全局作用域中声明的变量、函数都会变成`window`对象的属性和方法。

全局变量不能通过`delete`删除，而直接在`window`对象上定义的属性可以。



```javascript
//全局作用域

var age = 29;

window.color = 'red';

delete window.age; //false

delete window.color; //return true

alert(window.age); //29

alert(window.color); //undefined;
```



### 8.1.2窗口关系及框架

```javascipt
window.frames[0];//第一个框架

top.frames[0];//最外层框架
```

### 8.1.3 窗口位置

跨浏览器取得窗口左边和上边的位置

```js
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX; //除ff外都支持screenLeft；
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
```

```js
window.moveTo(x,y);//移动至
window.moveBy(x,y);//移动
```

左上角为零点。右、下为正

### 8.1.4窗口大小

```js
//视口大小
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if (typeof(pageWidth) != "number") {
	if (document.compatMode == "CSS1Compat") {
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	} else {
		pageWidth = document.body.clientWidth; //IE6混杂模式
		pageHeight = document.body.clientHeight;
	}
} 
```

移动设备上除IE外

```JS
//保存着可见视口
window.innerWidth;
window.innerHeight;
//布局视口，即渲染后页面的实际大小
document.documentElement.clientWidth;
document.documentElement.clientHeight;
```

```js
window.resizeTo(100,100);//调整大100*100
window.resizeBy(100,50);//调整到200*150
window.resizeTo(300,300);//调整到300*300
```

### 8.1.5导航和打开窗口

`window.open()`导航到一个特定的URL也可以打开一个新的浏览器窗口，可接受四个参数：要加载的URL、窗口目标、一个特性字符串、一个表示新页面是否取代浏览器历史纪录中当前加载页面的布尔值。

```js
window.open('http://www.bilibili.com/','_blank');//等同于<a href="http://www.bilibili.com/" target="_blank"></a>
```

`target`可取`_self` `_parent` `_top` `_blank`

可将`window.open()`创建的窗口调整大小`resizeTo()` 调整位置`moveTo()` 关闭`close()` 切断联系`.opener=null`

安全限制：弹还是不弹，这是一个问题

检测弹出窗口是否被屏蔽

```js
var blocked = false;
try {
	var w = window.open("url", '_blank');
	if (w == null) {
		blocked = true;
	}
} catch (e) {
	blocked = true;
}
if (blocked) {
	alert('被阻挡了！');
};
```

### 8.1.6间歇调用和超时调用

```js
//超时调用
//一秒后显示个弹窗
//不推荐，传递字符串
setTimeout("alert()", 1000);
//推荐的调用方式
setTimeout(function() {
	alert();
}, 1000);

var timeoutId = setTimeout(function() {
	alert();
}, 1000);
clearTimeout(timeoutId); //取消
```

```js
//间歇调用
var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber() {
	num++;
	if (num == max) {
		clearInterval(intervalId);
		alert();
	}
}
intervalId = setInterval(incrementNumber, 500); //.5s执行一次
```

```js
//超时调用模拟间歇调用
var num = 0;
var max = 10;

function incrementNumber() {
	num++;
	if (num < max) {
		setTimeout(incrementNumber, 500);
	} else {
		alert();
	}
}
setTimeout(incrementNumber, 500);
```

很少使用真正的间歇调用，原因是后一个间歇调用可能在前一个间歇调用结束之前启动

### 8.1.7系统对话框

`aler()`

`confirm()` 返回布尔值

`prompt()` 生成提示输入框

`window.print()` 打印

`window.find()` 查找

## 8.2localtion对象

| 属性名      | 例子                   | 说明         |
| -------- | -------------------- | ---------- |
| hash     | '#contents'          | #后跟的字符串    |
| host     | 'www.wrox.com:80'    |            |
| hostname | 'www.wrox.com'       |            |
| href     | 'http:/www.wrox.com' |            |
| prthname | '/WileyCDA/'         | 目录和（或）文件名  |
| port     | '8080'               |            |
| protocol | 'http:'              |            |
| search   | '?q=javascript'      | 查询字符串，以？开头 |

### 8.2.1查询字符串参数

```js
//查询字符串
function getQueryStringArgs() {
	//取得查询字符串并去掉开头的问号
	var qs = (location.search.length > 0 ? location.search.substring(1) : ''),
		//保存数据的对象
		args = {},
		//取得每一项
		items = qs.length ? qs.split("&") : [],
		item = null,
		name = null,
		value = null,
		i = 0,
		len = items.length;
	//逐个将每一项添加到args对象中
	for (i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if (name.length) {
			args[name] = value;
		}
	}
	return args;
}

```

```js
//假设查询字符串是?q=js&num=10
var agrs = getQueryStringArgs();
alert(args["q"]); //js
alert(args["num"]); //10
```

### 8.2.2位置操作

```javascript
var w = 'www.wrox.com';
location.assign(w);
window.location = w;
location.href = w;
//效果都一样
```

每次修改`localtion`的属性（`hash`除外），页面都会以新URL重新加载

```js
location.replace();//不会右后退按钮
location.reload();//重新加载，刷新
location.reload(true);//从服务器重新加载，相当于`ctrl+f5`
```

## 8.3navigator对象

> 识别客户端浏览器的事实标准

### 8.3.1检测插件

```js
//检测插件
//ie中除外
function hasPlugin(name) {
	name = name.toLowerCase();
	for(var i = 0; i < navigator.plugins.length; i++) {
		if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
			return true;
		}
	}
	return false;
}

alert(hasPlugin("flash"));
alert(hasPlugin('QuickTime'));

//ie
function hasIEPlugin(name) {
	try {
		new ActiveXObject(name);
		return true;
	} catch(e) {
		return false;
	}
}

alert(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"));
alert(hasIEPlugin("QucikTime.QuickTime"));

//通用形式，针对每个插件分别创建检测函数

function hasFlash() {
	var result = hasPlugin("Flash");
	if(!result) {
		result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
	}
	return result;
}

function hasQuickTime() {
	var result = hasPlugin("QuickTime");
	if(!result) {
		result = hasIEPlugin("QucikTime.QuickTime");
	}
	return result;
}
```

### 8.3.2注册处理程序

RSS什么的，略

## 8.4screen对象

表面客户端的能力，包括显示器的信息

## 8.5history对象

```js
//history

history.go(-1);
history.back();
//后退一页
history.go(1);
history.forward();
//前进一页
history.go(2); //前进两页

history.go("w.com"); //跳转到最近的w.com页面

history.length; //如果是第一个打开的页面则为0
```











