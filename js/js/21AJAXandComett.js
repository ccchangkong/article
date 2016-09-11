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

//use xhr
xhr.open('get', 'example.txt', false); //还没发送请求呢

xhr.open('get', 'example.txt', false);
xhr.send(null);

xhr.open('get', 'example.txt', false);
xhr.send(null);
if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	console.log(xhr.responseText);
} else {
	console.log("request was unsuccessful:" + xhr.status);
}

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

//取消异步请求
xhr.abort();

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

//头部信息
var myHeader = xhr.getResponseHeader("MyHeader");
var allHeaders = xhr.getAllResponseHeaders();

xhr.open('get', 'example.php?name1=value1&name2=value2', true);

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

xhr.open('post', 'example.txt', true);

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

//ie11+
var data = new FormData();
data.append('name', 'n');

var data = new FormData(document.forms[0]);

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
xhr.open('get', 'example.php', true);
xhr, timeout = 1000; //设置超时为1s；ie8+
xhr.ontimeout = function() {
	console.log('request did not return in a second');
}
xhr.send(null);

var xhr = createXHR();
xhr.open('get', 'example.php', true);
xhr.overrideMimeType('text/xml');
xhr.send(null);

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