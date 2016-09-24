(function() {
	function updateAnimations() {
		doAnimation1();
		doAnimation2();
	}
	setInterval(updateAnimations, 100);
})();

function updateProgress() {
	var div = document.getElementById('status');
	div.style.width = (parseInt(div.style.width, 10) + 5) + '%';
	if(div.style.left != '100%') {
		mozRequestAnimationFrame(updateProgress);
	}
}
mozRequestAnimationFrame(updateProgress);

(function() {
	function draw(timestamp) {
		//计算两次重绘的时间间隔
		var diff = timestamp - startTime;
		//使用diff确定下一步的绘制时间
		//把startTime重写为这一次的绘制时间
		startTime = timestamp;
		//重绘UI
		mozRequestAnimationFrame(draw);
	}
	var requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame,
		startTime = window.mozAnimationStartTime || Date.now();
	mozRequestAnimationFrame(draw);
})();

function isHiddenSupported() {
	return typeof(document.hidden || document.msHidden || document.webkitHidden) != 'undefined';
}

if(document.hidden || document.msHidden || document.webkitHidden) {
	//页面隐藏了
} else {
	//页面未隐藏
}

function handleVisibilityChange() {
	var output = document.getElementById('output'),
		msg;
	if(document.hidden || document.msHidden || document.webkitHidden) {
		msg = 'page is now hidden.' + (new Date()) + '<br>';
	} else {
		msg = 'page is now visible.' + (new Date()) + '<br>';
	}
	output.innerHTML += msg;
}
EventUtil.addHandler(document, 'msvisibilitychange', handleVisibilityChange);
EventUtil.addHandler(document, 'webkitvisibilitychange', handleVisibilityChange);

navigator.geolocation.getCurrentPosition(function(position) {
	drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
}, function(error) {
	console.log('error code:' + error.code);
	console.log('error msg:' + error.message);
}, {
	enableHighAccuracy: true, //表示尽可能使用最准确的位置信息
	timeout: 5000, //等待位置信息的最长时间
	maximumAge: 25000 //有效时间

});
var watchId = navigator.geolocation.watchPosition(function(position) {
	drawMapCenteredAt(position.coords.latitude, position.coords.longitude);
}, function(error) {
	console.log('error code:' + error.code);
	console.log('error msg:' + error.message);
});
clearWatch(watchId);

var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var files = EventUtil.getTarget(event).files,
		i = 0,
		len = files.length;
	while(i < len) {
		console.log(files[i].name + '(' + files[i].type + ',' + files[i].size + 'bytes)');
		i++;
	}
});

function blobSlice(blob, startByte, length) {
	if(blob.slice) {
		return blob.slice(startByte, length);
	} else if(blob.webkitSlice) {
		return blob.webkitSlice(startByte, length);
	} else if(blob.mozSlice) {
		return blob.mozSlice(startByte, length);
	} else {
		return null;
	}
}
var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var info = '',
		output = document.getElementById('output'),
		progress = document.getElementById('progress'),
		files = EventUtil.getTarget(event).file,
		reader = new FileReader(),
		blob = blobSlice(files[0], 0, 32); //32B
	if(blob) {
		reader.readAsText(blob);
		reader.onerror = function() {
			output.innerHTML = 'could not read file,error code is' + reader.error.code;
		};
		reader.onload = function() {
			output.innerHTML = reader.result;
		};
	} else {
		console.log("your browser doesn't support slice().");
	}
});

function creatObjectUrl(blob) {
	if(window.URL) {
		return window.URL.createObjectURL(blob);
	} else if(window.webkitURL) {
		return window.webkitURL.createObjectURL(blob);
	} else {
		return null;
	}
}

var filesList = document.getElementById('files-list');
EventUtil.addHandler(filesList, 'change', function(event) {
	var info = '',
		output = document.getElementById('output'),
		progress = document.getElementById('progress'),
		files = EventUtil.getTarget(event).file,
		reader = new FileReader(),
		url = creatObjectUrl(files[0]);
	if(url) {
		if(/image/.test(files[0].type)) {
			output.innerHTML = "<img src=\'" + url + "\'>";
		} else {
			output.innerHTML = 'not an img';
		}
	} else {
		output.innerHTML = 'your browser dose not support object URLs.';
	}
});
function revokeObjectURL (url) {
	if (window.URL) {
		window.URL.revokeObjectURL(url);
	} else if(webkitURL){
		window.webkitURL.revokeObjectURL(url);
	}
}

var droptarget=document.getElementById('droptarget');
function handleEvent (event) {
	var info='',
	output=document.getElementById('output'),
	files,i,len;
	EventUtil.preventDefault(event);
	if (event.type=='drop') {
		files=event.dataTransfer.files;
		i=0;
		len=files.length;
		while (i<len){
			info+=files[i].name+'('+files[i].type+','+files[i].size+'bytes)<br>';
			i++;
		}
		output.innerHTML=info;
	}
}
EventUtil.addHandler(droptarget,'dragenter',handleEvent);
EventUtil.addHandler(droptarget,'dragover',handleEvent);
EventUtil.addHandler(droptarget,'drop',handleEvent);

var droptarget=document.getElementById('droptarget');
function handleEvent (event) {
	var info='',
	output=document.getElementById('output'),
	data,xhr,
	files,i,len;
	EventUtil.preventDefault(event);
	if (event.type=='drop') {
		data=new FormData();
		files=event.dataTransfer.files;
		i=0;
		len=files.length;
		while (i<len){
data.append('file'+i,files[i]);
			i++;
		}
		xhr=new XMLHttpRequest();
		xhr.open('post','exp.php',true);
		xhr.onreadystatechange=function () {
			if (xhr.readyState==4) {
				console.log(xhr.responseText);
			}
		};
		xhr.send(data);
	}
}
EventUtil.addHandler(droptarget,'dragenter',handleEvent);
EventUtil.addHandler(droptarget,'dragover',handleEvent);
EventUtil.addHandler(droptarget,'drop',handleEvent);

var worker=new Worker('stufftodo.js');
worker.postMessage('start');//给worker传递消息
worker.postMessage({
	type:'command',
	message:'start'
});
//worker返回的数据
worker.onmessage=function (event) {
	var data=event.data;
	//对数据进行处理
}
worker.onerror=function (event) {
	console.log('error:'+event.filename+'('+event.lineno+')'+event.message);
}
worker.terminate();//立即停止worker的工作

//web worker内部的代码
self.onmessage=function (event) {
	var data=evnet.data;
	//处理数据
	data.sort(function (a,b) {
		return a-b;
	});
	self.postMessage(data);
};

//在页面中
var data=[23,23,434,5346,213,52],
worker=new Worker('exp.js');
worker.onmessage=function (event) {
	var data=event.data;
	//对排序后的数组进行操作
};
//将数组发送给worker排序
worker.postMessage(data);
//web worker内部的代码
self.postMessage(data);

//web worker内部的代码
importScripts('f1.js','f2.js');