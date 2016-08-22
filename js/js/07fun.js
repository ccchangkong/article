//不要这么做
if (condition) {
	function sayHi() {
		//1
	}
} else {
	function sayHi() {
		//2
	}
} //结果在不同的浏览器中不同

//可以这么做
var sayHi;
if (condition) {
	sayHi = function() {
		//1
	};
} else {
	sayHi = function() {
		//2
	};
}
//递归
function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * factorial(num - 1);
	}
}

//完善
function factorial(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * arguments.callee(num - 1) //防止factorial的更改
	}
}
//严格模式
var factorial = (function f(num) {
	if (num <= 1) {
		return 1;
	} else {
		return num * f(num - 1) //防止factorial的更改
	}
});

//闭包
function createComparisionFunction(propertyName) {
	return function(object1, object2) {
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	}
}

//function compare(v1, v2) {
//	if (v1 < v2) {
//		return -1;
//	} else if (v1 > v2) {
//		return 1;
//	} else {
//		return 0;
//	}
//}
//var result = compare(5, 10);

//demo
function creatFunctions() {
	var result = new Array();
	for (var i = 0; i < 10; i++) {
		result[i] = function() {
			return i;
		};
	}
	return result;
}

function creatFunctions() {
	var result = new Array();
	for (var i = 0; i < 10; i++) {
		result[i] = function(num) {
			return function() {
				return num;
			}
		}(i);
	}
	return result;
}
//关于this对象
var name = "w";
var object = {
	name: 'o',
	getNameFunc: function() {
		return function() {
			return this.name;
		};
	}
};
alert(object.getNameFunc()); //w

var name = "w";
var object = {
	name: 'o',
	getNameFunc: function() {
		var that = this;
		return function() {
			return that.name;
		};
	}
};
alert(object.getNameFunc()); //o

//内存泄漏
function assignHandler() {
	var element = document.getElementById("some");
	var id = element.id;
	element.onclick = function() {
		alert(id);
	};
	element = null;
}

//块级作用域
function outputNumbers(count) {
	(function() {
		for (var i = 0; i < count; i++) {
			alert(i);
		}
	})();
	alert(i); //error
};

//私有变量
function MyObject() {
	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}

	//特权方法

	this.publicMethod = function() {
		privateVariable++;
		return privateFunction();
	}
}

//静态私有变量
function MyObject() {
	//私有变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}
	//构造函数
	MyObject = function() {

	}; //此为全局变量

	//特权方法

	MyObject.prototype.publicMethod = function() {
		privateVariable++;
		return privateFunction();
	}
}

//单例
var singleton = {
	name: value,
	method: function() {}
};

var singleton = function() {
	//	添加变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}
	//特权/共有方法和属性
	return {
		publicProperty: true,
		publicMethod: function() {
			privateVariable++;
			return privateFunction();
		}
	};
}();

var application = function() {
	//	私有变量和函数
	var components = new Array();
	//	初始化
	components.push(new BaseComponent());
	//	公共
	return {
		getComponentCount: function() {
			return components.length;
		},
		registerComponent: function(component) {
			if (typeof component == "object") {
				components.push(component);
			}
		}
	}
}();

//增强的模块模式
var singleton = function() {
	//	添加变量和私有函数
	var privateVariable = 10;

	function privateFunction() {
		return false;
	}
	//	创建对象
	var object = new CustomType();
	//特权/共有方法和属性

	object.publicProperty = true,
		object.publicMethod = function() {
			privateVariable++;
			return privateFunction();
		};

	return object;

}();

var application = function() {
	//	私有变量和函数
	var components = new Array();
	//	初始化
	components.push(new BaseComponent());

	var app = new BaseComponent();
	//	公共
	app.getComponentCount = function() {
		return components.length;
	};
	app.registerComponent = function(component) {
		if (typeof component == "object") {
			components.push(component);
		}
	};;
	return app;

}();