console.log(Object.prototype.toString.call(value)); //[object Array]

function isArray(value) {
	return Object.prototype.toString.call(value) == '[object Array]';
}

function isFunction(value) {
	return Object.prototype.toString.call(value) == '[object Function]';
}

function isRegExp(value) {
	return Object.prototype.toString.call(value) == '[object RegExp]';
}

var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) = '[object JSON]';

function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
}
var person = new Person('n', 29, 'Engineer'); //没问题

var person = Person('n', 29, 'Engineer'); //this指向window
alert(window.name); //'n'

function Person(name, age, job) {
	if(this instanceof Person) {
		this.name = name;
		this.age = age;
		this.job = job;
	} else {
		return new Person(name, age, job);
	}
}

function Polygon(sides) {
	if(this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function() {
			return 0;
		};
	} else {
		return new Polygon(sides);
	}
}

function Rectangle(width, height) {
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function() {
		return this.width * this.height;
	};
}
var revt = new Rect(5, 10);
console.log(rect.sides); //undefined

function Polygon(sides) {
	if(this instanceof Polygon) {
		this.sides = sides;
		this.getArea = function() {
			return 0;
		};
	} else {
		return new Polygon(sides);
	}
}

function Rectangle(width, height) {
	Polygon.call(this, 2);
	this.width = width;
	this.height = height;
	this.getArea = function() {
		return this.width * this.height;
	};
}
Rectangle.prototype = new Polygon();
var revt = new Rect(5, 10);
console.log(rect.sides); //2

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

function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		createXHR = function() {
			return new XMLHttpRequest();
		};
	} else if(typeof ActiveXObject != 'undefined') {
		createXHR = function() {
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
		};

	} else {
		createXHR = function() {
			throw new Error('no xhr object available')

		};

	}
	return createXHR();
}

var createXHR = (function() {
	if(typeof XMLHttpRequest != 'undefined') {
		return function() {
			return new XMLHttpRequest();
		};
	} else if(typeof ActiveXObject != 'undefined') {
		return function() {
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
		};

	} else {
		return function() {
			throw new Error('no xhr object available')
		};
	}
})();

var handler = {
	msg: 'event handled',
	handleClick: function(event) {
		console.log(this.msg);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', function(event) {
	handler.handleClick(event);
});

function bind(fn, context) {
	return function() {
		return fn.apply(context, arguments);
	};
}

var handler = {
	msg: 'event handled',
	handleClick: function(event) {
		console.log(this.msg);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', bind(handler.handleClick, handler));

var handler = {
	msg: 'event handled',
	handleClick: function(event) {
		console.log(this.msg + ':' + event.type);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', bind(handler.handleClick, handler));

//es5
var handler = {
	msg: 'event handled',
	handleClick: function(event) {
		console.log(this.msg + ':' + event.type);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', handler.handleClick.bind(handler));

//currying
function add(num1, num2) {
	return num1 + num2;
}

function curriedAdd(num2) {
	return add(5, num2);
}
console.log(add(2, 3)); //5
console.log(curriedAdd(3)); //8

function curry(fn) {
	var args = Array.prototype.slice.call(arguments, 1);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(null, finalArgs);
	};
} //没考虑执行环境
//demo
function add(num1, num2) {
	return num1 + num2;
}
var curriedAdd = curry(add, 5);
console.log(curriedAdd(3)); //8

var curriedAdd = curry(add, 5, 12);
console.log(curriedAdd()); //17

function bind(fn, context) {
	var args = Array.prototype.slice.call(arguments, 2);
	return function() {
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(content, finalArgs);
	};
}
var handler = {
	msg: 'event handled',
	handleClick: function(name, event) {
		console.log(this.msg + ':' + name + ':' + event.type);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', bind(handler.handleClick, handler, 'my-btn'));

//es5 bind

var handler = {
	msg: 'event handled',
	handleClick: function(name, event) {
		console.log(this.msg + ':' + name + ':' + event.type);
	}
};
var btn = document.getElementById('my-btn');
EventUtil.addHandler(btn, 'click', handler.handleClick.bind(handler, 'my-btn'));

setTimeout(function() {
	//处理中
	setTimeout(arguments.callee, interval);
}, interval);

for(var i = 0, len = data.length; i < len; i++) {
	process(data[i]);
}

setTimeout(function() {
	//取出下一个条目并处理
	var item = array.shift();
	process(item);
	//若还有条目，再设置另一个定时器
	if(array.length > 0) {
		setTimeout(arguments.callee, 100);
	}
}, 100);

function chunk(array, process, context) {
	setTimeout(function() {
		//取出下一个条目并处理
		var item = array.shift();
		process(item);
		//若还有条目，再设置另一个定时器
		if(array.length > 0) {
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}

var processor = {
	timeoutId: null,
	//实际进行处理的方法
	performProcessing: function() {
		//实际执行的代码
	},
	//初始处理调用的方法
	process: function() {
		clearTimeout(this.timeoutId);
		var that = this;
		this.timeoutId = setTimeout(function() {
			that.performProcessing();
		}, 100);
	}
};
//尝试开始执行
processor.process();

//简化
function throttle(method, context) {
	clearTimeout(method.tId);
	method.tId = setTimeout(function() {
		method.call(content);
	}, 100);
}

//demo
window.onresize = function() {
	var div = document.getElementById('myDiv');
	dic.style.height = div.offsetWidth + 'px';
};

//butter
function resizeDiv() {
	var div = document.getElementById('myDiv');
	dic.style.height = div.offsetWidth + 'px';
}
window.onresize = function() {
	throttle(resizeDiv);
}

function EventTarget() {
	this.handlers = {};
}

EventTarget.prototype = {
	constructor: EventTarget,
	addHandler: function(type, handler) {
		if(typeof this.handlers[type] == 'undefined') {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	},
	fire: function(event) {
		if(!event.target) {
			event.target = this;
		}
		if(this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for(var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	},
	removeHandler: function(type, handler) {
		if(this.handlers[type] instanceof Array) {
			if(var i = 0, len = handlers.length; i < len; i++) {
				if(handlers[i] === handler) {
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}
};

//demo
function handleMessage(event) {
	console.log('msg received:' + event.message);
}
//创建一个对象
var target = new EventTarget();
//添加一个事件处理程序
target.addHandler('message', handleMessage);
//触发事件
target.fire({
	type: 'message',
	message: 'hello'
});
//删除事件处理程序
target.removeHandler('message', handleMessage);

function Person(name, age) {
	EventTarget.call(this);
	this.name = name;
	this.age = age;
}
inheritPrototype(Person, EventTarget);
Person.prototype.say = function(message) {
	this.fire({
		type: 'message',
		message: 'hello'
	});
};

//
function handleMessage(event) {
	console.log(event.target.name + 'says:' + event.message);
}
//创建新person
var person = new Person('N', 22);
//添加一个事件处理程序
target.addHandler('message', handleMessage);
//再该对象上调用1个方法，它触发消息事件
person.say('hi');
//onmousemove事件
EventUtil.addHandler(document, 'mousemove', function(event) {
	var myDiv = document.getElementById('myDiv');
	myDiv.style.left = event.clientX + 'px';
	myDiv.style.top = event.clientY + 'px';
});

var DragDrop = function() {
	var dragging = null;

	function handleEvent(event) {
		//获取事件 和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//确定事件类型
		switch(event.type) {
			case 'mousedown':
				if(target.className.indexOf('draggable') > -1) {
					dragging = target;
				}
				break;
			case 'mousemove':
				if(dragging != null) {
					//指定位置
					dragging.style.left = event.clientX + 'px';
					dragging.style.top = event.clientY + 'px';
				}
				break;
			case 'mouseup':
				dragging = null;
				break;
			default:
				break;
		}
	};
	return {
		enable: function() {
			EventUtil.addHandler(document, 'mousedown', handleEvent);
			EventUtil.addHandler(document, 'mousemove', handleEvent);
			EventUtil.addHandler(document, 'mouseup', handleEvent);
		},
		disable: function() {
			EventUtil.removeHandler(document, 'mousedown', handleEvent);
			EventUtil.removeHandler(document, 'mousemove', handleEvent);
			EventUtil.removeHandler(document, 'mouseup', handleEvent);
		}
	}
}();

var DragDrop = function() {
	var dragging = null,
		diffX = 0,
		diffY = 0;

	function handleEvent(event) {
		//获取事件 和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//确定事件类型
		switch(event.type) {
			case 'mousedown':
				if(target.className.indexOf('draggable') > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetLTop;

				}
				break;
			case 'mousemove':
				if(dragging != null) {
					//指定位置
					dragging.style.left = (event.clientX - diffX) + 'px';
					dragging.style.top = (event.clientY - diffY) + 'px';
				}
				break;
			case 'mouseup':
				dragging = null;
				break;
			default:
				break;
		}
	};
	return {
		enable: function() {
			EventUtil.addHandler(document, 'mousedown', handleEvent);
			EventUtil.addHandler(document, 'mousemove', handleEvent);
			EventUtil.addHandler(document, 'mouseup', handleEvent);
		},
		disable: function() {
			EventUtil.removeHandler(document, 'mousedown', handleEvent);
			EventUtil.removeHandler(document, 'mousemove', handleEvent);
			EventUtil.removeHandler(document, 'mouseup', handleEvent);
		}
	}
}();

var DragDrop = function() {
	var dragdrop = new EventTarget(),
		dragging = null,
		diffX = 0,
		diffY = 0;

	function handleEvent(event) {
		//获取事件 和目标
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		//确定事件类型
		switch(event.type) {
			case 'mousedown':
				if(target.className.indexOf('draggable') > -1) {
					dragging = target;
					diffX = event.clientX - target.offsetLeft;
					diffY = event.clientY - target.offsetLTop;
					dragdrop.fire({
						type: 'dragstart',
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;
			case 'mousemove':
				if(dragging != null) {
					//指定位置
					dragging.style.left = (event.clientX - diffX) + 'px';
					dragging.style.top = (event.clientY - diffY) + 'px';
					//触发自定义事件
					dragdrop.fire({
						type: 'drag',
						target: dragging,
						x: event.clientX,
						y: event.clientY
					});
				}
				break;
			case 'mouseup':
				dragdrop.fire({
					type: 'dragend',
					target: dragging,
					x: event.clientX,
					y: event.clientY
				});
				dragging = null;
				break;
			default:
				break;
		}
	};

	dragdrop.enable = function() {
		EventUtil.addHandler(document, 'mousedown', handleEvent);
		EventUtil.addHandler(document, 'mousemove', handleEvent);
		EventUtil.addHandler(document, 'mouseup', handleEvent);
	};
	dragdrop.disable = function() {
		EventUtil.removeHandler(document, 'mousedown', handleEvent);
		EventUtil.removeHandler(document, 'mousemove', handleEvent);
		EventUtil.removeHandler(document, 'mouseup', handleEvent);
	};
	return dragdrop;
}();
DragDrop.addHandler('dragstart', function(event) {
	var status = document.getElementById('status');
	status.innerHTML = 'started dragging' + event.target.id;
});
DragDrop.addHandler('drags', function(event) {
	var status = document.getElementById('status');
	status.innerHTML = '<br/>dragged' + event.target.id + 'to(' + event.x + ',' + event.y + ')';
});
DragDrop.addHandler('dragend', function(event) {
	var status = document.getElementById('status');
	status.innerHTML = '<br/>dropped' + event.target.id + 'to(' + event.x + ',' + event.y + ')';
});