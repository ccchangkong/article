# 《javascript高级程序设计》笔记3（第6章 面向对象的程序设计，第7章 函数表达式）

![90165 (1).jpg](http://www.vastskycc.com/zb_users/upload/2016/07/201607301469871073749473.jpg)慧慧我老婆啊！

代码示例：[https://github.com/ccchangkong/js/tree/master/js](https://github.com/ccchangkong/js/tree/master/js)

##第六章 面向对象的程序设计

对象：无序属性的集合，其属性可包含基本值、对象或函数。

###6.1理解对象

属性类型:数据属性和访问器属性

数据属性有4个描述其行为的特性；

[[Configurable]]：能否通过delete删除从而重新定义属性，能否修改属性的特性，或能否把属性修改为访问器属性；

[[Enumerable]]：能否通过for-in循环返回属性；

[[Writable]]：能否修改属性的值；

[[Value]]：包含这个属性的数据值；

要修改属性的默认的特性，必须使用ES5的Object.defineProperty()方法；



```js
var person {};
Object.defineProperty(person, 'name', {
writable: false,
value: "N"
});
alert(person.name); //N
person.name = "g";
alert(person.name); //N
```

writable: false,设置为只读，name属性的值不可更改；



```js
var person {};
Object.defineProperty(person, 'name', {
configurable: false,
value: "N"
});
alert(person.name); //N
delete person.name;
alert(person.name); //N
```

configurable: false,不能从对象删除；

另外在调用Object.defineProperty()方法修改除writable之外的特性都会导致错误；如果不指定，则writable、configurable、enumerable的默认值都是false；

访问器属性：不包含数据值，包含一对geter（读取访问器属性调用）和seter（写入访问器属性调用）函数；vue.js实现用了这个。

四个特性

[[Configurable]]：能否通过delete删除从而重新定义属性，能否修改属性的特性，或能否把属性修改为数据属性；

[[Enumerable]]：能否通过for-in循环返回属性；

[[Get]]：读取访问器属性调用；

[[Set]]：写入访问器属性调用；



```JavaScript
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
```

_year表示只能通过对象方法访问的属性；

定义多个属性 Object.defineProperties()



```JavaScript
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
```

读取属性的特性



```JavaScript
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
alert(descriptor.value);//2004
alert(descriptor.configurable);//false
```

###6.2 创建对象

工厂模式



```JavaScript
//工厂模式
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
```

解决了创建多个相似对象的问题，但没有解决对象识别的问题。

构造函数模式



```JavaScript
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
alert(p1.constructor == Person);//true
alert(p1 instanceof Person);//true
alert(p1 instanceof Object);//true
```

constructor可以将他的实例标识为一种特定的类型；



```JavaScript
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
```



```JavaScript
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
```

每定义一函数，也就是实例化了一个对象，那将构造函数内的函数转移到构造函数外，则美什么封装性可言了；

原型模式 prototype



```JavaScript
function Person() {}
Person.prototype.name = "n";
Person.prototype.age = 29;
Person.prototype.sayName = function() {
alert(this.name);
}
var p1 = new Person();
p1.sayName();//n
var p2 = new Person();
p2.sayName();//n
alert(p1.sayName()==p2.sayName());//true
```

Person.prototype.constructor->Person;

![js.png](http://www.vastskycc.com/zb_users/upload/2016/07/201607301469864985545159.png)

原型方法

isPrototypeOf(),getPrototypeOf()



```JavaScript
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
```

hasOwnPrototype()检测一个属性是否存在于实例中，为对象实例添加一个属性时，这个属性会屏蔽原型对象中保存的同名属性；

in操作符 "name" in p1检测一个属性是否存在于实例中或其属性上；

检测属性是存在于对象还是原型上



```JavaScript
function hasPrototypeProperty(object, name) {
return !object.hasOwnProperty(name) && (name in object);
}
```

for-in 返回可访问、可枚举(enymerated)的属性（包括实例属性及原型）；

Object.keys() 返回对象参数所以可枚举的实例属性为一个字符串；

得到所有实例属性，包含了不可枚举的constructor属性；



```JavaScript
var keys = Object.getOwnPropertyNames(Person.prototype);
```

更简单的原型语法



```JavaScript
//更简单的原型语法,但实例的constructor属性不再指向Person了
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
```

原型的动态性

可以随时为原型添加属性和方法，并且修改能够立即在所有对象实例中反映出来，但如果重写了整个原型对象，就将联系切断了；

原生对象的原型

慎重

原生对象的问题



```JavaScript
//原型对象的问题
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
```

原型包含引用类型值就有问题了，friends数组存在于Person.prototype而非在P1中；

组合使用构造函数模式和原型模式



```JavaScript
//组合使用构造函数模式和原型模式
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
```

构造函数模式用于定义实例属性（私有），原型模式用于定义方法和共享属性（共享）。

**是目前在JS中使用最广泛，认同度最高的一种创建自定义类型的方法，事实上是用来定义引用类型的一种默认模式。**

动态原型模式



```JavaScript
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
```

只在sayName()方法不存在的时候才会将其添加到原型之中，且这段代码只会在初次调用构造函数时才会执行；

不能使用对象字面量来重写原型。

寄生构造函数模式



```JavaScript
//寄生构造函数模式
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
```

封装创建对象的代码，然后返回新创建的对象。

由于与构造函数的原型没关系。不能用instanceof()来确定对象类型。

稳妥构造函数模式

没有公共属性，不引用this对象，也不用new来调用构造函数



```JavaScript
//稳妥构造函数模式
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
```

###6.3 继承

JS无法实现接口继承（函数没有签名），只支持实现继承，且主要依靠原型链



```JavaScript
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
```

![js2.png](http://www.vastskycc.com/zb_users/upload/2016/07/201607301469868050106302.png)

所以引用类型默认都继承了Object.

确定原型和实例的关系



```JavaScript
//确定原型和实例的关系
alert(instance instanceof Object); //true
alert(instance instanceof SuperType); //true
alert(instance instanceof SubType); //true
alert(Object.prototype.isPrototypeOf(instance)); //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance)); //true
```

谨慎地定义方法



```JavaScript
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
```

原型链的问题

包含引用类型值的原型属性会被所有实例共享；

在创建子类型的实例时，不能向超类型的构造函数中传递参数；



```JavaScript
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
```

借用构造函数



```JavaScript
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
```



```JavaScript
//优势
function SuperType(name) {
this.name = name;
}
function SubType() {
SuperType.call(this, 'n'); //继承并传参
this.age = 29; //实例属性
}
var instance = new SubType();
alert(instance.name, instance.age); //n,29
```

方法都在函数中定义，不利于函数复用。

组合继承



```JavaScript
//组合继承
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
```

**最常用的继承模式，instanceof()和isPrototypeOf()也能识别。**

原型链继承



```JavaScript
//原型式继承
function object(o) {
function F() {};
F.prototype = o;
return new F();
}
```



```JavaScript
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
```



```JavaScript
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
```

Object.create() 规范化的原型式继承；

引用类型值的属性始终都会共享。

寄生式继承



```JavaScript
//寄生式继承
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
```

寄生组合式继承



```JavaScript
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
```

通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。

**是引用类型最理想的继承范式。**

##第七章 函数表达式

创建函数 

函数声明 function funName(){};

函数表达式 var funName-funtion(){};必须先赋值后调用



```JavaScript
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
```

###7.1 递归

递归函数是在一个函数通过名字调用自身的情况下构成的



```JavaScript
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
```

###7.2 闭包

闭包指有权访问另一个函数作用域中的变量的函数



```JavaScript
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
```

内部函数（一个匿名函数）访问了外部函数中的变量propertyName。

闭包与变量



```JavaScript
function creatFunctions() {
var result = new Array();
for (var i = 0; i < 10; i++) {
result[i] = function() {
return i;
};
}
return result;
}
```

每个函数都引用着保存变量i的同一个变量对象，i最后的值为10；



```JavaScript
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
```

参数为按值传递的；

关于this对象

在全局函数中，this等于window；

当函数被被作为某个对象方法调用时，this等于那个对象；

匿名函数的执行环境具有全局性，this等于window；（顺带一提，ES6中箭头函数没有自己的this值）

可通过call()和apply()改变函数执行环境，使this指向其他对象；



```JavaScript
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
```



```JavaScript
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
```

内存泄漏



```JavaScript
//内存泄漏
function assignHandler() {
var element = document.getElementById("some");
var id = element.id;
element.onclick = function() {
alert(id);
};
element = null;
}
```

设为null切断联系

###7.3 模仿块级作用域

用匿名函数模拟



```JavaScript
//块级作用域
function outputNumbers(count) {
(function() {
for (var i = 0; i < count; i++) {
alert(i);
}
})();
alert(i); //error
};
```

ES6中可使用let

###7.4 私有变量  

这块自己也没弄太明白。。。

私有变量



```JavaScript
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
```

静态私有变量



```JavaScript
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
```

模块模式



```JavaScript
//单例
var singleton = {
name: value,
method: function() {}
};
var singleton = function() {
//添加变量和私有函数
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
```



```JavaScript
var application = function() {
//私有变量和函数
var components = new Array();
//初始化
components.push(new BaseComponent());
//公共
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
```

增强的模块模式



```JavaScript
//增强的模块模式
var singleton = function() {
//添加变量和私有函数
var privateVariable = 10;
function privateFunction() {
return false;
}
//创建对象
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
//私有变量和函数
var components = new Array();
//初始化
components.push(new BaseComponent());
var app = new BaseComponent();
//公共
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
```