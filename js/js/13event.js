//<input type="button" id="" value="click" onclick="alert()"/>

//<input type="button" id="" value="click" onclick="showMsg()"/>
//<script type="text/javascript">
//	function showMsg () {
//		alert();
//	}
//</script>

//event
//<input type="button" id="" value="click" onclick="alert(event.type)"/>

//this
//<input type="button" id="" value="clicks" onclick="this.value"/>
//<input type="button" id="" value="clicks" onclick="value"/>

//<form action="">
//	<input type="text" id="" value="aa" name="a"/>
//	<input type="button" id="" value="bb" name="b" onclick="alert(a.value)"/>
//</form>

//DOM0
//冒泡阶段被处理
var btn = document.getElementById('myBtn');
btn.onclick = function() {
	alert(this.id); //myBtn
};

//删除
btn.onclick = null;

//DOM2
var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() { //ie9+
	alert(this.id);
}, false);

//可绑定多个事件
var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() {
	alert(this.id);
}, false);
btn.addEventListener('click', function() {
	alert('hello');
}, false);

var btn = document.getElementById('myBtn');
btn.addEventListener('click', function() {
	alert(this.id);
}, false);
btn.removeEventListener('click', function() { //没有用，需要函数名
	alert(this.id);
}, false);

var btn = document.getElementById('myBtn');
var handler = function() {
	alert(this.id);
};
btn.addEventListener('click', handler, false);
btn.removeEventListener('click', handler, false); //有用了

//ie5-10only
var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function() {
	alert();
});

var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function() {
	alert(this === window); //true	
});

//添加多个事件处理程序
var btn = document.getElementById('myBtn');
btn.attachEvent('onclick', function() {
	alert(1);
});
btn.attachEvent('onclick', function() {
	alert(2);
});
//移除事件处理程序
var btn = document.getElementById('myBtn');
var handler = function() {
	alert(this.id);
};
btn.attachEvent('click', handler);
btn.detachEvent('click', handler);

//跨浏览器
var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	}
};
var btn = document.getElementById('myBtn');
var handler = function() {
	alert(this.id);
};
EventUtil.addHandler(btn, 'click', handler);
EventUtil.removeHandler(btn, 'click', handler);

var btn = document.getElementById('myBtn');
btn.onclick = function(event) {
	alert(event.currentTarget === this); //true
	alert(event.target === this); //true
};

document.body.onclick = function(event) {
		alert(event.currentTarget === document.body); //true
		alert(this = document.body); //true
		alert(event.target === document.getElementById('myBtn')); //true
	}
	//一个函数处理多个事件
var btn = document.getElementById('myBtn');
var handler = function(event) {
	switch(event.type) {
		case 'click':
			alert('c');
			break;
		case 'mouseover':
			event.target.style.backgroundColor = 'red';
			break;
		case 'mouseout':
			event.target.style.backgroundColor = '';
			break;
	}
};

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;

var link = document.getElementById('myLink');
link.onclick = function(event) {
	event.preventDefault(); //阻止默认行为，需要cancelabel是true
	event.stopPropagation(); //阻止冒泡
	alert(event.eventPhase); //确定事件处理程序的阶段
};

var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelable = true;
		}
	}
};

btn.onclick = function(event) {
	event = EventUtil.getEvent(event); //传event
	var target = EventUtil.getTarget(event); //传target	
	EventUtil.stopPropagation(event); //阻止冒泡
};
var link = document.getElementById('myLink');
link.onclick = function(event) {
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event); //阻止默认行为
};

//load，完全加载后在window上触发
EventUtil.addHandler(window, 'load', function(event) {
	alert();
});
//<body onload='alert()'>

//图像上也可以触发
//<img src='smile.gif' onload='alert()'>
EventUtil.addHandler(image, 'load', function(event) {
	event = EventUtil.getEvent(event);
	alert(EventUtil.getTarget(evnet).src);
});

//图片加载完后给出提示
EventUtil.addHandler(window, 'load', function() {
	var image = document.createElement('img');
	EventUtil.addHandler(image, 'load', function(event) {
		event = EventUtil.getEvent(event);
		alert();
	});
	document.body.appendChild(image);
	image.src = 'smile.gif';
});

//dom0
EventUtil.addHandler(window, 'load', function() {
	var image = new Image();
	EventUtil.addHandler(image, 'load', function(event) {
		alert();
	});
	image.src = 'smile.gif';
});

//为scipt元素指定事件处理程序
EventUtil.addHandler(window, 'load', function() {
	var script = document.createElement('scirpt');
	EventUtil.addHandler(script, 'load', function(event) {
		alert();
	});
	script.src = 'example.js';
	document.body.appendChild(script);
});

//unload
EventUtil.addHandler(window, 'unload', function(event) {
	alert();
});
//<body onunload='alert()'>

//resize
EventUtil.addHandler(window, 'resize', function(event) {
	alert();
}); //可能被频繁执行

//scroll
EventUtil.addHandler(window, 'scroll', function(event) {
	if(document.compatMode == 'CSS1Compat') {
		alert(document.documentElement.scrollTop);
	} else {
		alert(document.body.scrollTop);
	}
});

//客户区坐标位置
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	alert('Client coordinates:' + event.clientX + ',' + event.clientY);
});

//鼠标在页面中的坐标
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	alert('page coordinates:' + event.pageX + ',' + event.pageY);
});

//ie8-
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	var pageX = event.pageX,
		pageY = event.pageY;
	if(pageX === undefined) {
		pageX = event.clientX + (document.body.scrollLeft || ddocument.documentElement.scrollLeft)
	};
	if(pageY === undefined) {
		pageY = event.clientY + (document.body.scrollTop || ddocument.documentElement.scrollTop)
	}

	alert('page coordinates:' + event.pageX + ',' + event.pageY);
});

//屏幕坐标位置
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	alert('Screen coordinates:' + event.screenX + ',' + event.screenY);
});

//修改键
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	var keys = new Array();
	if(event.shiftKey) {
		keys.push('shift');
	}
	if(event.ctrlKey) {
		keys.push('ctrl');
	}
	if(event.altKey) {
		keys.push('alt');
	}
	if(event.metaKey) {
		keys.push('meta');
	}
	alert('keys:' + keys.join(','));
});

var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelable = true;
		}
	},
	getRelatedTarget: function(event) {
		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement) {
			return event.toElement;
		} else if(event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	getButton: function(event) { //add
		if(document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button;
		} else {
			switch(event.button) { //兼容ie8-
				case 0:
				case 1:
				case 2:
				case 3:
				case 7:
					return 0; //主鼠标按钮，左键
				case 2:
				case 6:
					return 2; //中键，滚轮
				case 4:
					return 1; //次鼠标按钮，右键
			}
		}
	}
};
var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'mouseout', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var relatedTarget = EventUtil.getRelatedTarget(event);
	alert('mouse out of' + target.tagName + 'to' + relatedTarget.tagName);
});

var div = document.getElementById('myDiv');
EventUtil.addHandler(div, 'click', function(event) {
	event = EventUtil.getEvent(event);
	alert(EventUtil.getButton(event));
});

//mousewheeel，除了ff
EventUtil.addHandler(document, 'mousewheel', function(event) {
	event = EventUtil.getEvent(event);
	alert(EventUtil.wheelDelta); //滚轮向前为120的倍数，向后为-120的备份
});
//兼容opera 9.5-
EventUtil.addHandler(document, 'mousewheel', function(event) {
	event = EventUtil.getEvent(event);
	//第九章的代理检测
	var delta = (client.engine.opera && client.engine.opera < 9.5 ?
		-event.wheelDelta : event.wheelDelta
	);
	alert(delta);
});
//ff
EventUtil.addHandler(window, 'DOMMouseScroll', function(event) {
	event = EventUtil.getEvent(event);
	alert(EventUtil.detail); //滚轮向前为-3的倍数，向后为3的备份
});

var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelable = true;
		}
	},
	getRelatedTarget: function(event) {
		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement) {
			return event.toElement;
		} else if(event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	getButton: function(event) {
		if(document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	//add mousewheel
	getWheelDelta: function(event) {
		if(event.wheelDelta) {
			return(client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},
};

//demo
(function() {
	function handleMouseWheel(event) {
		event = EventUtil.getEvent(event);
		var delta = EventUtil.getWheelDelta(event);
		alert(delta);
	}
	EventUtil.addHandler(document, 'mousewheel', handleMouseWheel);
	EventUtil.addHandler(document, 'DOMMouseScroll', handleMouseWheel);
})();

var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keyup', function(event) {
	event = EventUtil.getEvent(event);
	alert(event.keyCode);
});

var EventUtil = {
	addHandler: function(element, type, handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if(element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	preventDefault: function(event) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	removeHandler: function(element, type, handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if(element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	stopPropagation: function(event) {
		if(event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelable = true;
		}
	},
	getRelatedTarget: function(event) {
		if(event.relatedTarget) {
			return event.relatedTarget;
		} else if(event.toElement) {
			return event.toElement;
		} else if(event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	getButton: function(event) {
		if(document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button;
		} else {
			switch(event.button) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	getWheelDelta: function(event) {
		if(event.wheelDelta) {
			return(client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},
	//add charcode
	getCharCode: function(event) {
		if(typeof(event.charCode) == "number") {
			return event.charCode;
		} else {
			return event.keyCode; //ie8-
		}
	},
};

//demo
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	alert(event.getCharCode(event));
});

//key
//兼容问题，不推荐使用
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	var identifier = event.key || event.keyIdentifier;
	if(identifier) {
		alert(identifier);
	}
});
//location
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	var loc = event.Location || event.keyLocation;
	if(loc) {
		alert(loc);
	}
});

var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	if(event.getModifierState) {
		alert(event.getModifierState('Shift'));
	}
});

//textinput
var textbox = document.getElementById('myText');
EventUtil.addHandler(textbox, 'textInput', function(event) {
	event = EventUtil.getEvent(event);
	alert(event.data);
});

//
//<!doctype html>
//<html lang="en">
//
//	<head>
//		<meta charset="UTF-8" />
//		<title>Document</title>
//	</head>
//
//	<body>
//		<div id="myDiv">demo</div>
//		<ul id="myMenu" style="position: absolute;visibility: hidden;background-color: #AAB8C2;">
//			<li>11</li>
//			<li>22</li>
//			<li>33</li>
//		</ul>
//	</body>
//
//</html>

EventUtil.addHandler(window, 'load', function(event) {
	var div = document.getElementById('myDiv');
	EventUtil.addHandler(div, 'contextmenu', function(event) {
		event = EventUtil.getEvent(event);
		EventUtil.preventDefault(event);

		var menu = document.getElementById('myMenu');
		menu.style.left = event.clientX + 'px';
		menu.style.top = event.clientY + 'px';
		menu.style.visibility = 'visible';

	});
	EventUtil.addHandler(document, 'click', function(event) {
		document.getElementById('myMenu').style.visibility = 'hidden';
	});
});
//beforeunload
EventUtil.addHandler(window, 'beforeunload', function(event) {
	event = EventUtil.getEvent(event);
	var msg = 'hello';
	event.returnValue = msg;
	return msg;
});
//DOMContentLoaded
EventUtil.addHandler(document, 'DOMContentLoaded', function(event) {
	alert('content loaded');
});

//not support  DOMContentLoaded
setTimeout(function() {
	//add event
}, 0);

//readystatechange
EventUtil.addHandler(window, 'load', function(event) {
	var script = document.createElement('script');
	EventUtil.addHandler(script, 'readystatechange', function(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		if(target.readyState == 'loaded' || target.readyState == 'complete') {
			EventUtil.removeHandler(target, 'readystatechange', arguments.callee);
			alert('script loaded');
		}
	});
	script.src = 'example.js';
	document.body.appendChild(script);
});

//haschange
EventUtil.addHandler(window, 'haschange', function(event) {
	alert('old url:' + event.oldURL + '\nNew URL' + event.newURL);
	alert('current hash:' + location.hash);
});

var isSupported = ('onhashchange' in window) && (document.documentMode === undefined || document.documentMode > 7);

//orientationchange
//ios only
EventUtil.addHandler(window, 'load', function(event) {
	var div = document.getElementById(',yDiv');
	div.innerHTML = 'Current orientation is' + window.orientation;
	EventUtil.addHandler(window, 'orientationchange', function(event) {
		div.innerHTML = 'Current orientation is' + window.orientation;
	});
});

//deviceorientation
EventUtil.addHandler(window, 'deviceorientation', function(event) {
	var output = document.getElementById('output');
	output.innerHTML = 'Alpha:' + event.alpha + ', Beta:' + event.beta + ', Gamma:' + event.gamma + '<br>';
});

//设备方向改变而旋转元素
EventUtil.addHandler(window, 'deviceorientation', function(event) {
	var arrow = document.getElementById('arrow');
	arrow.style.transform = 'rotate(' + Math.round(event.alpha)) + 'deg)';
});

//devicemotion
EventUtil.addHandler(window, 'deviceorientation', function(event) {
	var output = document.getElementById('output');
	if(event.rotationRate !== null) {
		output.innerHTML += 'Alpha=' + event.rotationRate.alpha + ', Beat' + event.rotationRate.beta + ', Gamma' + event.rotationRate.gamma;
	}
});

//touch
function handleTouchEvent(event) {
	//只跟踪一次触摸
	if(event.touches.length == 1) {
		var output = document.getElementById('output');
		switch(event.type) {
			case 'touchstart':
				output.innerHTML = 'touch started(' + event.touches[0].clientX + ',' + event.touches[0].clientY + ')';
				break;
			case 'touchend':
				output.innerHTML += '<br>touch ended(' + event.touches[0].clientX + ',' + event.touches[0].clientY + ')';
				break;
			case 'touchmove':
				event.getPreventDefault(); //阻止滚动
				output.innerHTML += '<br>touch moveed(' + event.touches[0].clientX + ',' + event.touches[0].clientY + ')';
				break;
		}
	}
}

EventUtil.addHandler(document, 'touchstart', handleTouchEvent);
EventUtil.addHandler(document, 'touchend', handleTouchEvent);
EventUtil.addHandler(document, 'touchmove', handleTouchEvent);

//gesture
function handleGestureEvent(event) {
	//只跟踪一次触摸

	var output = document.getElementById('output');
	switch(event.type) {
		case 'gesturestart':
			output.innerHTML = 'gesture started(rotation=' + event.rotation + ',scale=' + event.scale + ')';
			break;
		case 'gestureend':
			output.innerHTML += '<br>gesture ended(rotation=' + event.rotation + ',scale=' + event.scale + ')';
			break;
		case 'gesturechange':
			event.getPreventDefault(); //阻止滚动
			output.innerHTML += '<br>gesture changed(' + event.rotation + ',scale=' + event.scale + ')';
			break;
	}

}

document.addEventListener('gesturestart', handleGestureEvent, false);
document.addEventListener('gestureend', handleGestureEvent, false);
document.addEventListener('gesturechange', handleGestureEvent, false);

//<ul id="myLinks">
//	<li id="a1">a</li>
//	<li id="a2">aa</li>
//	<li id="a3">aaa</li>
//</ul>

var list = document.getElementById('myLinks';)
EventUtil.addHandler(list, 'click', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.id) {
		case 'a1':
			document.title = '1';
			break;
		case 'a2':
			document.title = '2';
			break;
		case 'a3':
			document.title = '3';
			break;
	}
});

//移除事件处理程序
//<div id="myDiv">
//	<input type="button" id="myBtn" value="" />
//</div>
btn.onclick = function() {
	//do
	btn.onclick = null;
	document.getElementById('myDiv').innerHTML = 'processing..';
};

var btn = document.getElementById('myBtn');
var event = document.createEvent('MouseEvents'); //创建事件对象
event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化事件对象
btn.dispatchEvent(event); //触发事件

var textbox = document.getElementById('myTextbox'),
	event;

//以DOM3级方式创建对象
if(document.implementation.hasFeature("KeyboardEvents", '3.0')) {
	event = document.createEvent('KeyboardEvents');

	//初始化事件对象
	event.initKeyboardEvent('keydown', true, true, document.defaultView, 'a', 0, 'Shift', 0);

}
//触发事件
textbox.dispatchEvent(event);
//模拟了shift+A

//ff only
var textbox = document.getElementById('myTextbox');
var event = document.createEvent('KeyEvents'); //创建事件对象
//初始化事件对象
event.initKeyEvent('keypress', true, true, document.defaultView, false, false, false, false, 65, 65);
//触发事件
textbox.dispatchEvent(event);
//模拟了在输入框输入字母A

//other
var textbox = document.getElementById('myTextbox');
var event = document.createEvent('Events'); //创建事件对象
//初始化事件对象
event.initEvent(type, bubbles, cancelable);
event.view = document.defaultView;
event.altKey = false;
event.ctrlKey = false;
event.shiftKey = false;
event.metaKey = false;
event.keyCode = 65;
event.charCode = 65;
//触发事件
textbox.dispatchEvent(event);

//自定义事件
var div = document.getElementById('myDiv'),
	event;
EventUtil.addHandler(div, 'myevent', function(event) {
	alert('div:' + event.detail);
});
EventUtil.addHandler(document, 'myevent', function(event) {
	alert('document:' + event.detail);
});
if(document.implementation.hasFeature('CustomEvents', '3.0')) {
	event = document.createEvent('CustomEvents');
	event.initCustomEvent('myevent', true, false, 'hello');
	div.dispatchEvent(event);
};
//创建了冒泡事件myevent

//ie模拟click
var btn = document.getElementById('myBtn');
//创建事件对象
var event = document.createEventObject();
//初始化事件对象
event.screenX = 100;
event.screenY = 0;
event.clientX = 0;
event.clientY = 0;
event.ctrlKey = false;
event.altKey = false;
event.shiftKey = false;
event.button = 0;
//触发事件
btn.fireEvent('onclick', event);

//ie模拟keypress
var textbox = document.getElementById('myTextbox');
var event = document.createEventObject(); //创建事件对象
//初始化事件对象

event.altKey = false;
event.ctrlKey = false;
event.shiftKey = false;
event.keyCode = 65;

//触发事件
textbox.fireEvent('onkeypress', event);