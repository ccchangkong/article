# 第十一章 DOM扩展

## 11.1选择符API

```js
var body = document.querySelector('body');
var myDiv = document.querySelector('#myDiv');
var selected = document.querySelector('.selected');
var img = document.body.querySelector('img.button');
var s = document.querySelector('body img');

var ems = document.querySelector('myDiv').querySelectorAll('em');
var selecteds = document.querySelectorAll('.selected');
var strongs = document.querySelectorAll('p strong');
```

```js
var i, len, strong;
for(i = 0, len = strongs.length; i < len; i++) {
	strong = strongs[i]; //or strongs.item(i);
	strong.className = 'act';
}
```

```js
//匹配
function matchesSelector(element, selector) {
	if(element.matchesSelector) {
		return element.matchesSelector(selector);
	} else if(element.msMatchesSelector) {
		return element.msMatchesSelector(selector);
	} else if(element.mozMatchesSelector) {
		return element.mozMatchesSelector(selector);
	} else if(element.webkitMatchesSelector()) {
		return element.webkitMatchesSelector(selector);
	} else {
		throw new Error('not supported');
	}
}
if(matchesSelector(document.body, 'body.class1')) {}
```



## 11.2元素遍历

```js
//元素遍历
//old
var i, len, child = element.firstChild;
while(child != element.lastChild) {
	if(child.nodeType == 1) {
		processChild(child);
	}
	child.child.nextSibling;
}

//ie9+
var i, len, child = element.firstElementChild;
while(child != element.lastElementChild) {

	processChild(child);

	child = child.nextElementSibling;
}
```

## 11.3HTML5

### 11.3.1与类相关的扩充

```js
//ie9+
var s = document.getElementsByClassName();

//ie6+
if(!document.getElementsByClassName) {
	document.getElementsByClassName = function(className, element) {
		var children = (element || document).getElementsByTagName('*');
		var elements = new Array();
		for(var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(' ');
			for(var j = 0; j < classNames.length; j++) {
				if(classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	};
}
```

```js
//<div class="bd user disabled">..</div>

//删除类名
var className = div.className.split(/\s+/);
var pos = -1,
	i, len;
for(i = 0, len = className.length; i < len; i++) {
	if(className[i] == 'user') {
		pos = i;
		break;
	}
}
className.splice(i, 1);
div.className = className.join(" ");

//ie10+
div.classList.remove('disabled');
div.classList.add('current');
div.classList.toggle('user');
//是否包含类名
if(div.classList.contains('bd') && !div.classList.contains('disabled')) {
	//
}
//迭代类名
for(var i = 0, len = div.classList.length; i < len; i++) {
	dosometing(div.classList)[i];
}
```



### 11.3.2焦点管理

```js
//焦点管理
var button = document.getElementById('myBtn');
button.focus();
alert(document.activeElement === button); //true
alert(button.hasFocus()); //true
```

### 11.3.3HTMLdocument的变化

`readyState` 

```js
//readyState
if(document.readyState == 'complete') {};
```

兼容模式

```js
if(document.compatMode=='CSS1Compat'){
	alert('Standards mode');
}else{
	alert('Quirks mode');
}
```

`head`

```js
var head = document.head || document.getElementsByTagName('head')[0]; //ie9+
```

### 11.3.4字符集属性

`.charset` ,`.defaultCharset`

### 11.3.5自定义数据属性

`data-*`

```js
//<div class="myDiv" data-appId = "11" data-myName = "n"></div>
var div = document.getElementById('myDiv');
var appId = div.dataset.appId; //IE11+
div.dataset.appId = 22; //set
if(div.dataset.myName) {};
```

### 11.3.6插入标记

`innerHTML`

> 插入‘无作用域的元素’（如<script>)需在之前插入一个‘有作用域的元素’

```js
//innerHtml
div.innerHTML = "_<script defer>alert('hi');<\/script>";
div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";
div.innerHTML = "<input type=\'hidden\'><script defer>alert('hi');<\/script>"; //bset
```

`outerHTML`

比`innerHTML`多了外层标签

`insertAdjacentHTML()`

```js
//insertAdjacentHTML()
element.insertAdjacentHTML('beforebegin', '<p>hello world</p>'); //作为前一个同辈元素插入
element.insertAdjacentHTML('afterbegin', '<p>hello world</p>'); //作为第一个子元素插入
element.insertAdjacentHTML('beforeend', '<p>hello world</p>'); //作为最后一个子元素插入
element.insertAdjacentHTML('afterend', '<p>hello world</p>'); //作为最后一个同辈元素插入
```

内存与性能

控制操作次数，少次多量

### 11.3.7scrollINtoview

`div.scrollIntoView()`

## 11.4专有扩展

### 11.4.1文档模式

IE的。

```js
//文档模式
//<meta http-equiv="x-ua-compatible" content="IE=edge">
var mode = document.documentMode;
```

### 11.4.2children属性

只包含元素中同样还是元素的子节点

### 11.4.3contains()方法

```js
//contains()
alert(document.documentElement.contains(document.body)); //true
```

确定节点间关系

```js
var result = document.documentElement.compareDocumentPosition(document.body);
alert(!!(result & 16));
```

| 掩码   | 关系   |
| ---- | ---- |
| 1    | 无关   |
| 2    | 居前   |
| 4    | 居后   |
| 8    | 包含   |
| 16   | 被包含  |

掩码可相加

```js
function contains(refNode, otherNode) {
	if(typeof(refNode.contains) == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) {
		return refNode.contains(otherNode);
	} else if(typeof(refNode.compareDocumentPosition) == "function") {
		return !!(refNode.contains(otherNode) & 16);
	} else {
		var node = otherNode.parentNode;
		do {
			if(node === refNode) {
				return true;
			} else {
				node = node.parentNode;
			}
		} while (node !== null);
		return false;
	}
}
```

### 11.4.4插入文本

`innerText`

```js
//innerText
function getInnerText(element) {
	return(typeof(element.textContent) == "string") ?
		element.textContent : element.innerText;
}

function setInnerText(element, text) {
	if(typeof(element.textContent) == "string") {
		element.textContent = text;
	} else {
		element.innerText = text;
	}

}
```

`outerText` 多了外层标签

### 11.4.5滚动

```js
//scroll
document.body.scrollByLines(5); //页面主题滚动5行
document.images[0].scrollIntoView(); //在当前元素不可见的时候，让它进入浏览器的窗口
document.body.scrollIntoView(-1); //将页面主题往回滚动1页；最常用
```



