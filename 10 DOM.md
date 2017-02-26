# 第十章 DOM

> 文档对象模型

## 10.1节点层次

再HTML页面中，文档元素（文档最外层元素）始终都是`<Html>`

### 10.1.1Node类型

`nodeName` `nodeValue`

节点关系 `NodeList ` `parentNode` `childNode` `nextSibling` 

操作节点`appendChild()` 在末尾添加节点，并返回新增的节点；`insertBefore()` 在某个特定位置上添加节点；`replaceChild()`替换节点；`cloneNode()` 复制节点，可执行深复制

###10.1.2Document类型

`document.title` 文档标题；`document.URL` URL；`document.domain` 域名；

查找元素：`getElementById()` 、`getELementsByTagName()`、`getElementsByName()`

文档写入：`write()`、`writeln()`、`open()`、`close()`

### 10.1.3Element类型

html元素特性：`id`,`title`,`lang`,`dir`,`class`,`name`

```js
//可获取也可设置
var div = document.getElementById('div');
div.id = 'div2';
dic.className = 'divv';
```

操作特性：`getAttribute()`,`setAttribute()`,`removeAttribute()`，都没啥用

创建元素

```js
//create
if(client.browser.ie && client.browser.ie <= 7) {
	//	创建一个带name特性的iframe
	var iframe = document.createElement("<iframe name=\"myframe\"></iframe>");

	//创建input元素
	var input = document.createElement("<input type=\"checkbox\">");
	//button
	var button = document.createElement("<button type=\"reset\"></button>");
	//radio
	var radio1 = document.createElement("<input type=\"radio\" name=\"choice\"" + "value=\"1\">");
	var radio2 = document.createElement("<input type=\"radio\" name=\"choice\"" + "value=\"2\">");
}
```

元素的子节点：空白符什么的；

### 10.1.4Text类型

创建文本节点

```js
//text
var element = document.createElement('div');
element.className = 'message';

var textNode = document.createTextNode('Hello world');
element.appendChild(textNode);
document.body.appendChild(element);
```

规范化文本节点

`normalize()` 将相邻文本节点合并

`splieText()`分割文本节点

### 10.1.5Comment类型

> 注释的内容

## 10.2DOM操作技术

> 注意将变量缓存起来，减少DOM操作

### 10.2.1动态脚本

```js
//动态脚本  外链
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'demo.js';
document.body.appendChild(script);
//封装
function loadScript(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.body.appendChild(script);
}
//行内
function loadScriptString(code) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try {
		script.appendChild(document.createTextNode(code));
	} catch(e) {
		script.text = code;
	}
	document.body.appendChild(script);
}
```

### 10.2.2动态样式

```js
//css
function loadStyles(url) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}

function loadStyleString(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	try {
		style.appendChild(document.createTextNode(css));
	} catch(e) {
		style.styleSheet.cssText = css;
	}

	var head = document.getElementsByTagName('head')[0];
	head.appendChild(style);
}

```

### 10.2.3操作表格

```js
//更清晰的创建表格
var table = document.createElement('table');
table.border = 1;
table.width='100%';

var tbody=document.createElement('tbody');
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode('cell 1,1'));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode('cell 2,1'));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode('cell 1,2'));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode('cell 2,2'));

document.body.appendChild(table);

```

