//css
//cssText
myDiv.style.cssText = "width: 25px;height: 100px;";
alert(myDiv.style.cssText);

//length and item
for(var i = 0, len = myDiv.style.length; i < len; i++) {
	alert(myDiv.style[i]); //myDiv.style.item(i)
}

//getPropertyValue
var prop, value, i, len;
for(var i = 0, len = myDiv.style.length; i < len; i++) {
	alert(myDiv.style[i]);
	value = myDiv.style.getPropertyValue(prop);
	alert(prop + ':' + value);
}

//more message
var prop, value, i, len;
for(var i = 0, len = myDiv.style.length; i < len; i++) {
	alert(myDiv.style[i]);
	value = myDiv.style.getPropertyCSSValue(prop);
	alert(prop + ':' + value.cssText + '(' + value.cssValueType + ')');
}

//removeProperty
myDiv.style.removeProperty('border');

//获取受层叠影响的样式信息
myDiv = document.getElementById('myDiv');
var myDivStyle = document.defaultView.getComputedStyle(myDiv, null); //第二个参数可以室伪元素，如“:after”;ie9+
alert(myDivStyle.width);

var myDivStyle = document.defaultView.currentStyle(myDiv); //ie only
alert(myDivStyle.width);

//offset
function getElementLeft(element) {
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while(current !== null) {
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}

function getElementTop(element) {
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while(current !== null) {
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}
//这些属性为只读，每次访问都需要计算，注意性能

//client

function getViewport() {
	if(document.compatMode == 'BackCompat') {
		return { //ie7-
			width: document.body.clientWidth,
			height: document.body.clientHeight
		};
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight
		};

	}
}

//文档总高度
var docHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth);

//重置滚动
function scrollToTop(element) {
	if(element.scrollTop != 0) {
		element.scrollTop = 0;
	}
}

//确定元素大小
function getBoundingClientRect(element) {
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
	if(element.getBoundingClientRect) {
		if(typeof(arguments.callee.offset) != "number") {
			var scrollTop = document.documentElement.scrollTop;
			var temp = document.createElement('div');
			temp.style.cssText = 'position: absolute;left: 0;top: 0;';
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		};

		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;
		return {
			left: rect.left + offset,
			rigfht: rect.right + offset,
			top: rect.top + offset,
			bottom: rect.bottom + offset
		};
	} else {
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);
		return {
			left: actualLeft - scrollLeft,
			right: actualLeft + element.offsetWidth - scrollLeft,
			top: actualTop - scrollTop,
			bottom: actualTop + element.offsetHeight - scrollTop
		}
	}
}

//遍历所有元素
//<div id="div1">
//	<p><strong>hellow</strong> world
//	</p>
//	<ul>
//		<li>l1</li>
//		<li>l2</li>
//		<li>l3</li>
//	</ul>
//</div>
var div = document.getElementById('div1');
var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, null, false); //ie9+
var node = iterator.nextNode();
while(node !== null) {
	console.log(node.tagName); //输出标签名
	node = iterator.nextNode();
}

//只返回Li
var div = document.getElementById('div1');
var filter = function(node) {
	return node.tagName.toLowerCase() == 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, filter, false);
var node = iterator.nextNode();
while(node !== null) {
	console.log(node.tagName); //输出标签名
	node = iterator.nextNode();
}

var div = document.getElementById('div1');
var filter = function(node) {
	return node.tagName.toLowerCase() == 'li' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
};
var walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, filter, false);
var node = walker.nextNode();
while(node !== null) {
	console.log(node.tagName); //输出标签名
	node = walker.nextNode();
}

var div = document.getElementById('div1');
var walker = document.createTreeWalker(div, NodeFilter.SHOW_ELEMENT, nulll, false); //ie9+
walker.firstChild(); //转到p
walker.nextSibling(); //转到ul
var node = walker.firstChild(); //转到第一个li
while(node !== null) {
	console.log(node.tagName); //输出标签名
	node = walker.nextSibling()
}

//起点
var node = walker.nextNode();
alert(node === walker.currentNode); //true
walker.currentNode = document.body;

//<p id="p1"><b>hello</b> world</p>
var range1 = document.createRange(); //ie9+
var range2 = document.createRange();
var p1 = document.getElementById('p1');
range1.selectNode(p1);
range2.selectNodeContents(p1);

//复杂
//模仿selectNode()selectNodeContents()
var range1 = document.createRange(); //ie9+
var range2 = document.createRange();
var p1 = document.getElementById('p1');
var p1Index = -1;
var i, len;
for(i = 0, len = p1.parentNode.childNodes.length; i < len; i++) {
	if(p1.parentNode.childNodes[i] == p1) {
		p1Index = i;
		break;
	}
}
range1.setStart(p1.parentNode, p1Index + 1); //ie not sup
range1.setEnd(p1.parentNode, p1Index + 1);
range2.setStart(p1, 0);
range2.setEnd(p1, p1.childNodes.length);

var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);

//delete
var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);
range.deleteContents();

var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);
var fragment = range.extractContents();
p1.parentNode.appendChild(fragment);

var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);
var fragment = range.cloneContents();
p1.parentNode.appendChild(fragment);

//<span style="color: red;">Inserted text</span>
var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.setStart(helloNode, 2);
range.setEnd(worldNode, 3);
var span = document.createElement('span');
span.style.color = 'red';
span.appendChild(document.createTextNode('Inserted text'));
range.insertNode(span);

var p1 = document.getElementById('p1'),
	helloNode = p1.firstChild,
	worldNode = p1.lastChild,
	range = document.createRange();
range.selectNode(helloNode);
var span = document.createElement('span');
span.style.backgroundColor = 'yellow';
range.surroundContents(span);

//折叠
range.collapse(true);
console.log(range.collapsed);

//ie8+
//<p id="p1"><b>hello</b> world</p>

//select hello
var range = document.body.createTextRange();
var found = range.findText('hello');
alert(found); //true
alert(range.text); //hello

var found = range.findText('hello');
var foundAgain = range.findText('hello', 1); //正值往前找，负值往后找

//selectNode
var range = document.body.createTextRange();
var p1 = document.getElementById('p1');
range.moveToElementText(p1);

//html
alert(range.htmlText);
//父节点
var ancestor=range.parentElement();

//ie复杂
range.moveStart('word',2);//起点移动2个字符
range.moveEnd('character',1);//起点移动1个字符
range.move('chrarcter',5);//移动5个字符，范围的起点和终点就一样了，必须创建新选区



var range = document.body.createTextRange();
var p1 = document.getElementById('p1');
range.findText('hello');range.pasteHTML('<em>wow</em>');

