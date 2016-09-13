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

var handler={
	msg:'event handled',
	handleClick:function (event) {
		console.log(this.msg);
	}
};
var btn=document.getElementById('my-btn');
EventUtil.addHandler(btn,'click',function (event) {
	handler.handleClick(event);
});


function bind (fn,context) {
	return function () {
		return fn.apply(context,arguments);
	};
}


var handler={
	msg:'event handled',
	handleClick:function (event) {
		console.log(this.msg);
	}
};
var btn=document.getElementById('my-btn');
EventUtil.addHandler(btn,'click',bind(handler.handleClick,handler));



var handler={
	msg:'event handled',
	handleClick:function (event) {
		console.log(this.msg+':'+event.type);
	}
};
var btn=document.getElementById('my-btn');
EventUtil.addHandler(btn,'click',bind(handler.handleClick,handler));

//es5
var handler={
	msg:'event handled',
	handleClick:function (event) {
		console.log(this.msg+':'+event.type);
	}
};
var btn=document.getElementById('my-btn');
EventUtil.addHandler(btn,'click',handler.handleClick.bind(handler));