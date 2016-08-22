//全局作用域
var age = 29;
window.color = 'red';

delete window.age; //false

delete window.color; //return true

alert(window.age); //29
alert(window.color); //undefined;

//窗口位置
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX; //除ff外都支持screenLeft；
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;
window.moveTo(x, y);
window.moveBy(x, y);

//视口大小
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof(pageWidth) != "number") {
	if(document.compatMode == "CSS1Compat") {
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	} else {
		pageWidth = document.body.clientWidth; //IE6混杂模式
		pageHeight = document.body.clientHeight;
	}
}

window.innerWidth;
window.innerHeight;
document.documentElement.clientWidth;
document.documentElement.clientHeight;
window.resizeTo(100, 100); //调整大100*100
window.resizeBy(100, 50); //调整到200*150
window.resizeTo(300, 300); //调整到300*300

window.open('http://www.bilibili.com/', '_blank'); //等同于<a href="http://www.bilibili.com/"target="_blank"></a>

//弹出
var blocked = false;
try {
	var w = window.open("url", '_blank');
	if(w == null) {
		blocked = true;
	}
} catch(e) {
	blocked = true;
}
if(blocked) {
	alert('被阻挡了！');
};

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

//间歇调用
var num = 0;
var max = 10;
var intervalId = null;

function incrementNumber() {
	num++;
	if(num == max) {
		clearInterval(intervalId);
		alert();
	}
}
intervalId = setInterval(incrementNumber, 500); //.5s执行一次

//超时调用模拟间歇调用
var num = 0;
var max = 10;

function incrementNumber() {
	num++;
	if(num < max) {
		setTimeout(incrementNumber, 500);
	} else {
		alert();
	}
}
setTimeout(incrementNumber, 500);

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
	for(i = 0; i < len; i++) {
		item = items[i].split("=");
		name = decodeURIComponent(item[0]);
		value = decodeURIComponent(item[1]);
		if(name.length) {
			args[name] = value;
		}
	}
	return args;
}

//假设查询字符串是?q=js&num=10
var agrs = getQueryStringArgs();
alert(args["q"]); //js
alert(args["num"]); //10

var w = 'www.wrox.com';
location.assign(w);
window.location = w;
location.href = w;

location.replace();
location.reload();
location.reload(true);

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