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

//自定义错误消息
throw new Error('Something bad happend');

//自定义错误类型
function CustomError(msg) {
	this.name = 'CustomError';
	this.message = msg;
}
CustomError.prototype = new Error();
throw new CustomError('My msg';)
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

//捕获所有的error事件
//尽量不要用
window.onerror = function(message, url, line) {
		console.log(message);
		return false;
	}
	//图片记载错误时
EventUtil.addHandler(image, 'error', function(event) {
	alert(; img not loaded);
});

alert(age == '5'); //t
alert(5 === '5'); //f
alert(1 == true); //t
alert(1 === true); //f

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

for(var i = 0, len = mods.length; i < len; i++) {
	mods[i].init(); //可能会导致致命错误,一个init方法出错，后面的都将无法在进行
}
for(var i = 0, len = mods.length; i < len; i++) {
	try {
		mods[i].init(); //可能会导致致命错误
	} catch(e) {
		//TODO handle the exception
	}

}

function logError(sev, msg) {
	var img = new Image();
	img.src = 'lo.php?sev=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
}
//使用Image对象兼容性好、可以避免跨域限制、不容易出错

//只要使用try-catch语句就该把相应错误纪录到日志终
for(var i = 0, len = mods.length; i < len; i++) {
	try {
		mods[i].init();
	} catch(e) {
		logError('nonfatal', 'Module init failed:' + e.message);
	}
}

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

function divide (num1,num2) {
	if (typeof num1!='number'||typeof num2!='number') {
		throw new Error('divide():both arguments must be numbers');//抛出明确的错误原因
	}
	return num1/num2;
}

function assert (condition,msg) {
	if (!condition) {
		throw new Error(msg);
	}
};
function divide (num1,num2) {
assert(typeof num1!='number'||typeof num2!='number','divide():both arguments must be numbers');
	return num1/num2;
};

document.onclick=function(){
	var event=window.event;
	setTimeout(function () {
		event.returnValue=false;//未找到成员错误
	},1000);
};


span.innerHTML='<div>Hi</div>';//块状元素插入行内元素,是不规范的
