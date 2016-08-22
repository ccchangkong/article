function SuperType() {
	this.property = true;
}
SuperType.prototype.getSuperValue = function() {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
	return this.subproperty;
};
var instance = new SubType();
alert(instance.getSubValue()); //true

//确定原型和实例的关系
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true

alert(Object.prototype.isPrototypeOf(instance)); //true	
alert(SuperType.prototype.isPrototypeOf(instance)); //true	
alert(SubType.prototype.isPrototypeOf(instance)); //true

//谨慎
function SuperType() {
	this.property = true;
}
SuperType.prototype.getSuperValue = function() {
	return this.property;
};

function SubType() {
	this.subproperty = false;
}
SubType.prototype = new SuperType(); //继承
SubType.prototype = { //使用字面量添加方法，会导致上一行到吗失效
	getSubValue: function() {
		//
	},
	someOtherMethod: function() {
		//
	}
};
var instance = new SubType();
alert(instance.getSuperValue()); //error

//原型链的问题
function SuperType() {
	this.colors = ["a", "b"]
}

function SubType() {}
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push('c');
alert(instance1.colors); //a,b,c
var instance2 = new SubType();
alert(instance2.colors); //a,b,c
//借用构造函数
function SuperType() {
	this.colors = ["a", "b"];
}

function SubType() {
	SuperType.call(this); //借用
}

var instance1 = new SubType();
instance1.colors.push('c');
alert(instance1.colors); //a,b,c
var instance2 = new SubType();
alert(instance2.colors); //a,b

//	优势
function SuperType(name) {
	this.name = name;
}

function SubType() {
	SuperType.call(this, 'n'); //继承并传参
	this.age = 29; //实例属性
}
var instance = new SubType();
alert(instance.name, instance.age); //n,29

//	组合继承
function SuperType(name) {
	this.name = name;
	this.colors = ["a", "b"];
}
SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name); //继承属性
	this.age = age;
}
SubType.prototype = new SuperType(); //继承方法
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
	alert(this.age);
};
var instance1 = new SubType('n', 29);
instance1.colors.push('c');
alert(instance1.colors); //a,b,c
instance1.sayName(); //n
instance1.sayAge(); //29
var instance2 = new SubType('m', 27);
alert(instance1.colors); //a,b
instance1.sayName(); //m
instance1.sayAge(); //27

//原型式继承
function object(o) {
	function F() {};
	F.prototype = o;
	return new F();
}
var person = {
	name: 'n',
	friends: ['a', 'b']
};
var person1 = object(person);
person1.name = 'g';
person1.friends.push('c');
var person2 = object(person);
person2.name = 'e';
person2.friends.push('d');
alert(person.friends); //a,b,c,d
//Objcet.create()
var person = {
	name: 'n',
	friends: ['a', 'b']
};
var person1 = Object.create(person);
person1.name = 'g';
person1.friends.push('c');
var person2 = Object.create(person);
person2.name = 'e';
person2.friends.push('d');
alert(person.friends); //a,b,c,d

var person = {
	name: 'n',
	friends: ['a', 'b']
};
var person1 = Object.create(person, {
	name: {
		value: 'g'
	}
});
alert(person1.name); //g

//		寄生式继承
function createAnother(original) {
	var clone = object(original); //通过调用函数创建一个新对象
	clone.sayHi = function() { //以某种方式来增强这个对象
		alert("hi");
	};
	return clone; //返回这个对象
};

var person = {
	name: "n",
	friends: ['a', 'b']
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //hi

//寄生组合式继承
function inheritPrototype(subType, superType) {
	var prototype = objcet(superType.prototype); //创建对象
	prototype.constructor = subType; //增强对象
	subType.prototype = prototype; //指定对象
}

function SuperType(name) {
	this.name = name;
	this.colors = ["a", "b"];
}
SuperType.prototype.sayName = function() {
	alert(this.name);
};

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function() {
	alert(this.age);
}