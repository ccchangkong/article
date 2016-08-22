var person {};
Object.defineProperty(person, 'name', {
	writable: false,
	value: "N"
});
alert(person.name); //N
person.name = "g";
alert(person.name); //N

var person {};
Object.defineProperty(person, 'name', {
	configurable: false,
	value: "N"
});
alert(person.name); //N
delete person.name;
alert(person.name); //N

//demo1
var book = {
	_year: 2004,
	edition: 1
};
Object.defineProperty(book, "year", {
	get: function() {
		return this._year;
	},
	set: function(nV) {
		if (nV > 2004) {
			this._year = nV;
			this.edition += nV - 2004;
		}
	}
});
book.year = 2005;
//alert(book.edition);
alert(book.year);
//alert(book._year);

//demo2
var book = {};
Object.defineProperties(book, {
	_year: {
		value: 2004
	},
	edition: {
		value: 1
	},
	year: {
		get: function() {
			return this._year;
		},
		set: function(nV) {
			if (nV > 2004) {
				this._year = nV;
				this.edition += nV - 2004;
			}
		}
	}

});
book.year = 2005;
//alert(book.edition);
alert(book.year);
//alert(book._year);

var book = {};
Object.defineProperties(book, {
	_year: {
		value: 2004
	},
	edition: {
		value: 1
	},
	year: {
		get: function() {
			return this._year;
		},
		set: function(nV) {
			if (nV > 2004) {
				this._year = nV;
				this.edition += nV - 2004;
			}
		}
	}

});
var descriptor = Object.getOwnPropertyDescriptor(book, '_year');
alert(descriptor.value); //2004
alert(descriptor.configurable); //false
//	工厂模式
function createP(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	};
	return o;
};
var p1 = createP("N", 29, "SOFT");
//构造函数模式
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		alert(this.name);
	};
};
var p1 = new Person("N", 29, "SOFT");
alert(p1.constructor == Person);
alert(p1 instanceof Person);
alert(p1 instanceof Object);

//将构造函数当作函数
var p1 = new Person("N", 29, "SOFT");
p1.sayName();
//作为普通函数调用
Person("g", 29, "SOFT");
window.sayName();
//在另一个对象的作用域中调用
var o = new Object();
Person().call("k", 29, "SOFT");
o.sayName();

//构造函数的问题
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = sayName;
};

function sayName() {
	alert(this.name);
}

//原型
function Person() {}
Person.prototype.name = "n";
Person.prototype.age = 29;
Person.prototype.sayName = function() {
	alert(this.name);
}
var p1 = new Person();
p1.sayName(); //n
var p2 = new Person();
p2.sayName(); //n
alert(p1.sayName() == p2.sayName()); //true

Person.prototype.constructor

function Person() {}
Person.prototype.name = "n";
Person.prototype.age = 29;
Person.prototype.sayName = function() {
	alert(this.name);
}
var p1 = new Person();
var p2 = new Person();
p1.name = "g";
alert(p1.name); //g,来自实例
alert(p2.name); //n，来自原型

delete p1.name;
alert(p1.name); //n，来自原型

function hasPrototypeProperty(object, name) {
	return !object.hasOwnProperty(name) && (name in object);
}

var keys = Object.getOwnPropertyNames(Person.prototype);

//	更简单的原型语法,但实例的constructor属性不再指向Person了
function Person() {}
Person.prototype = {
	name: "n",
	age: 29,
	sayName: function() {
		alert(this.name);
	}
};

function Person() {}
Person.prototype = {
	constructor: Person, //
	name: "n",
	age: 29,
	sayName: function() {
		alert(this.name);
	}
};

function Person() {}
Person.prototype = {
	name: "n",
	age: 29,
	sayName: function() {
		alert(this.name);
	}
};
Object.defineProperty(Person.prototype, "constructor", { //ES5
	enumerable: false,
	value: Person
});
//	原型对象的问题
function Person() {}
Person.prototype = {
	constructor: Person,
	name: "n",
	age: 29,
	friends: ["a", "b", "c"],
	sayName: function() {
		alert(this.name);
	}
};
var p1 = new Person();
var p2 = new Person();
p1.friends.push('d');
alert(p1.friends); //a,b,c,d
alert(p2.friends); //a,b,c,d
alert(p1.friends === p2.friends); //true

//	组合使用构造函数模式和原型模式
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	friends: ["a", "b", "c"];
};
Person.prototype = {
	constructor: Person,
	sayName: function() {
		alert(this.name);
	}
};

//动态原型模式
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	friends: ["a", "b", "c"];

	if (typeof(this.sayName) != "function") {
		Person.prototype.sayName = function() {
			alert(this.name);
		};

	}
};
var friend = new Person('n', 20, 'ss');
friend.sayName();
//	寄生构造函数模式
function Person(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(this.name);
	};
	return o;
};
var friend = new Person("N", 29, "SOFT");
friend.sayName(); //N

function SpecialArray() {
	var values = new Array();
	values.push().apply(values, arguments);
	values.toPipedString = function() {
		return this.join("|");
	};
	return values;
}
var colors = new SpecialArray("red", "blue");
alert(colors.toPipedString());

//	稳妥构造函数模式
function Person(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		alert(name);
	};
	return o;
};