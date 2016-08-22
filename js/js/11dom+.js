var body = document.querySelector('body');
var myDiv = document.querySelector('#myDiv');
var selected = document.querySelector('.selected');
var img = document.body.querySelector('img.button');
var s = document.querySelector('body img');

var ems = document.querySelector('myDiv').querySelectorAll('em');
var selecteds = document.querySelectorAll('.selected');
var strongs = document.querySelectorAll('p strong');

var i, len, strong;
for(i = 0, len = strongs.length; i < len; i++) {
	strong = strongs[i]; //or strongs.item(i);
	strong.className = 'act';
}

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
if(matchesSelector(document.body, 'body.class1')) {

}

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
//焦点管理
var button = document.getElementById('myBtn');
button.focus();
alert(document.activeElement === button); //true
alert(button.hasFocus()); //true

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

//readyState
if(document.readyState == 'complete') {};

if(document.compatMode=='CSS1Compat'){
	alert('Standards mode');
}else{
	alert('Quirks mode');
}
var head = document.head || document.getElementsByTagName('head')[0]; //ie9+

//demo+
//<div class="myDiv" data-appId = "11" data-myName = "n"></div>
var div = document.getElementById('myDiv');
var appId = div.dataset.appId; //IE11+
div.dataset.appId = 22; //set
if(div.dataset.myName) {};

//innerHtml
div.innerHTML = "_<script defer>alert('hi');<\/script>";
div.innerHTML = "<div>&nbsp;</div><script defer>alert('hi');<\/script>";
div.innerHTML = "<input type=\'hidden\'><script defer>alert('hi');<\/script>"; //bset

//insertAdjacentHTML()
element.insertAdjacentHTML('beforebegin', '<p>hello world</p>'); //作为前一个同辈元素插入
element.insertAdjacentHTML('afterbegin', '<p>hello world</p>'); //作为第一个子元素插入
element.insertAdjacentHTML('beforeend', '<p>hello world</p>'); //作为最后一个子元素插入
element.insertAdjacentHTML('afterend', '<p>hello world</p>'); //作为最后一个同辈元素插入

//div.scrollIntoView()

//文档模式
//<meta http-equiv="x-ua-compatible" content="IE=edge">
var mode = document.documentMode;

//contains()
alert(document.documentElement.contains(document.body)); //true

var result = document.documentElement.compareDocumentPosition(document.body);
alert(!!(result & 16));

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

//scroll
document.body.scrollByLines(5); //页面主题滚动5行
document.images[0].scrollIntoView(); //在当前元素不可见的时候，让它进入浏览器的窗口
document.body.scrollIntoView(-1); //将页面主题往回滚动1页；最常用