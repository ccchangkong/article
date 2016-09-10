# 第十七章 错误处理与调试

## 17.1 浏览器报告的错误

> F12开发者工具

### 17.1.1 IE

Tools（工具）->Internet Options（Internet选项）->Advanced（高级）->Display anotification about every script error（显示每个脚本错误的通知）

### 17.1.2 Firefox

Tools（工具）->Error Console（错误控制台）

### 17.1.3 Safari

Develop（开发）->Edit（编辑）->Preferences（偏好设置）->Advanced（高级）->Show develop menu in menubar（在菜单栏中显示‘开发’菜单）

### 17.1.4 Opera

Tools（工具）->Advanced（高级）->Error Console（错误控制台）

### 17.1.5 Chrome

右上角的自定义及控制->更多工具->开发者工具

## 17.2 错误处理

### 17.2.1 try-catch语句

```js
try {
	//可能导致错误的代码
} catch(e) {
	//TODO handle the exception
}

try {
	cc.aa == 22;
} catch(e) {
	console.log(e.message);
}
//cc is not defined
```

#### finally子句

```js
function testFinally() {
	try {
		return 2;
	} catch(e) {
		return 1;
	} finally {
		return 0;
	}
}
//finally始终都会执行
```

#### 错误类型

| 错误类型           | 介绍                                  |
| -------------- | ----------------------------------- |
| Error          | 基类型                                 |
| EvalError      | 使用eval()函数发生异常时抛出                   |
| RangeError     | 数值超出相应范围时触发                         |
| ReferenceError | 找不到对象                               |
| SyntaxError    | 把语法错误的字符串传入eval()函数                 |
| TypeError      | 变量的类型不符合要求                          |
| URIError       | 在使用encodeURI()或decodeURI(),URI格式不正确 |

```js
try {
	someFunction();
} catch(e) {
	if(e instanceof TypeError) {
		//
	} else if(e instanceof ReferenceError) {
		//
	} else {
		//
	}
}
```

#### 合理使用try-catch

适合处理我们无法控制的错误

### 17.2.2 抛出错误

> 遇到throw操作符时，代码会立即停止执行，除非在`try-catch`中
```js
//自定义错误消息
throw new Error('Something bad happend');

//自定义错误类型
function CustomError(msg) {
	this.name = 'CustomError';
	this.message = msg;
}
CustomError.prototype = new Error();
throw new CustomError('My msg';)
```

#### 抛出错误的时机

```js
//时机
function process(values) {
	if(!(values instanceof Array)) {
		throw new Error('process():Argument must be an array');
	}
	value.sort();
	for(var i = 0, len = values.length; i < len; i++) {
		if(values[i] > 100) {
			return values[i];
		}
	}
	return -1;
};
```

#### 抛出错误与使用try-catch

捕获错误的目的在于避免浏览器以默认方式处理它们；

抛出错误的目的在于提供错误发生具体原因的消息

### 17.2.3 错误(error)事件

```js
//捕获所有的error事件
//尽量不要用
window.onerror = function(message, url, line) {
		console.log(message);
		return false;
	}
	//图片记载错误时
EventUtil.addHandler(image, 'error', function(event) {
	alert("img not loaded");
});
```

### 17.2.4 处理错误的策略

多学多做

### 17.2.5 常见的错误类型

#### 类型转换错误

在使用`==`and`!=`操作符,`if`、`for`、`while`等流控制语句中使用非布尔值时容易发生

```js
alert(age == '5'); //t
alert(5 === '5'); //f
alert(1 == true); //t
alert(1 === true); //f
```

```js
function concat(str1, str2, str3) {
	var result = str1 + str2;
	if(str3) { //绝对不要这么做
		result += str3;
	}
	return result;
}

function concat(str1, str2, str3) {
	var result = str1 + str2;
	if(typeof str3 == 'string') { //恰当的比较
		result += str3;
	}
	return result;
}
```

#### 数据类型错误

```js
//不安全的函数，任何非字符串值都会导致错误
function getQueryString(url) {
	var pos = url.indexOf('?');
	if(pos > -1) {
		return url.substring(pos + 1);
	}
	return '';
}

function getQueryString(url) {
	if(typeof url == 'string') { //通过检查类型确保安全
		var pos = url.indexOf('?');
		if(pos > -1) {
			return url.substring(pos + 1);
		}
	}
	return '';
}
```

```js
//不安全的函数，任何非数组值都会导致错误
function reverseSort(values) {
	if(values) { //绝对不要这么做
		values.sort();
		values.reverse();
	}
}

//不安全的函数，任何非数组值都会导致错误
function reverseSort(values) {
	if(values != null) { //绝对不要这么做,只能确保相应的值不是null或undefined
		values.sort();
		values.reverse();
	}
}

//还是不安全，任何非数组值但有sort方法的都会导致错误
function reverseSort(values) {
	if(type values.sort == 'function') { //绝对不要这么做,只能确保相应的值不是null或undefined
		values.sort();
		values.reverse();
	}
}

//安全，非数组值将被忽略
function reverseSort(values) {
	if(values instanceof Array) {
		values.sort();
		values.reverse();
	}
}
```

#### 通信错误

```js
//url
function addQueryStringArg(url, name, value) {
	if(url.indexOf('?') == -1) {
		url += '?';
	} else {
		url += '&';
	}
	url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
	return url;
}
```

### 17.2.6 区分致命错误和非致命错误

非致命错误：不影响用户的主要任务；只影响页面的一部分；可以恢复；重复相同操作可以消除错误。

致命错误：应用程序根本无法继续运行；错误明显影响到了用户的主要操作；会导致其他连带错误。

```js
for(var i = 0, len = mods.length; i < len; i++) {
	mods[i].init(); //可能会导致致命错误,一个init方法出错，后面的都将无法在进行
}
```

```js
for(var i = 0, len = mods.length; i < len; i++) {
	try {
		mods[i].init(); //可能会导致致命错误
	} catch(e) {
		//TODO handle the exception
	}
}
```

### 17.2.7 把错误纪录到服务器

```js
function logError(sev, msg) {
	var img = new Image();
	img.src = 'lo.php?sev=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
}
//使用Image对象兼容性好、可以避免跨域限制、不容易出错
```

```js
//只要使用try-catch语句就该把相应错误纪录到日志中
for(var i = 0, len = mods.length; i < len; i++) {
	try {
		mods[i].init();
	} catch(e) {
		logError('nonfatal', 'Module init failed:' + e.message);
	}
}
```

## 17.3 调试技术

> 少用alert(),免得忘记删了

### 17.3.1 将消息纪录到控制台

```js
//console
function log(msg) {
	if(typeof(console) == "object") {
		console.log(msg);
	} else if(typeof(opera) == "object") {
		opera.postError(msg);
	} else if(typeof java == 'object' && typeof java.lang == "object") {
		java.lang.System.out.println(msg);
	}
}
```



### 17.3.2 将消息纪录到当前页面

```js
function log(msg) {
	var console = document.getElementById('debuginfo');
	if(console === null) {
		console = document.createElement('div');
		console.id = 'debuginfo';
		console.style.border = '1px solid silver';
		console.style.position = 'absolute';
		console.style.top = '0px';
		console.style.right = '0px';
		document.body.appendChild(console);
	}
	console.innerHTML += '<p>' + msg + '</p>';
}
```

### 17.3.3 抛出错误

```js
function divide(num1, num2) {
	if(typeof num1 != 'number' || typeof num2 != 'number') {
		throw new Error('divide():both arguments must be numbers'); //抛出明确的错误原因
	}
	return num1 / num2;
}
```

```js
function assert(condition, msg) {
	if(!condition) {
		throw new Error(msg);
	}
};

function divide(num1, num2) {
	assert(typeof num1 != 'number' || typeof num2 != 'number', 'divide():both arguments must be numbers');
	return num1 / num2;
};
```

## 17.4 常见的IE错误

### 17.4.1 操作终止

ie7-,在修改尚未加载完成的页面时，就会发生操作终止错误

把`appendChild()`换成`insertBefore()`

### 17.4.2 无效字符

奇怪的字符

### 17.4.3 未找到成员

```js
document.onclick = function() {
	var event = window.event;
	setTimeout(function() {
		event.returnValue = false; //未找到成员错误
	}, 1000);
};
```

### 17.4.4 未知运行时错误

```js
span.innerHTML = '<div>Hi</div>'; //块状元素插入行内元素,是不规范的
```

### 17.4.5 语法错误

少个分号啦、括号不对应；

引用外部JS文件但没返回JS代码

### 17.4.6 系统无法找到指定资源

IE对URL路径的长度不能超过2048个字符