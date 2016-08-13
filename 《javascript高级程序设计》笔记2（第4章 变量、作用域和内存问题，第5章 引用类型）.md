# 《javascript高级程序设计》笔记2（第4章 变量、作用域和内存问题，第5章 引用类型）

代码示例：[https://github.com/ccchangkong/js/tree/master/js](https://github.com/ccchangkong/js/tree/master/js)

##第四章 变量、作用域和内存问题

###4.1变量

引用类型：可添加属性，如Object,存放在堆内存，变量为指针；

基本类型：Undefined、Null、Boolean、Number、String、~栈内存；
```javascript

var obj1=new Object();

var obj2=obj1;

obj1.name="N";

alert(obj2.name);//"N";

var num1=5;

var num2=num1;

num1=10:

alert(num2)//5;
```

对象传参是按值传递，而非按引用传递;

typeof:检验基本类型的最佳方法；

result=variable instanceof constructor 判断引用类型（Object,Array,RegExp）;

###4.2作用域

作用域链从底向上；

IE8-，在外部可访问catch语句内的变量；

js没有块级作用域（if,for）;

###4.3垃圾收集

设null解除引用；

##第五章 引用类型

###5.1 Object类型

创建实例 
```js
var person=new Object();//构造函数

var person={};//对象字面量表示法

访问对象属性
```
```js
person["name"];

person.name;
```

###5.2 Array类型

构造函数创建可省略new；

数组字面量表示法（IE8下游bug）；

length

设置length可从末尾移项或添加新项；

方便的添加新项 a[a.length];

检测数组

ES3 value instanceof Array

ES5 Array.isArray(value)

转换

toString() 以逗号分隔的字符串

valueOf() 返回数组

alert() 后台会调用toString() 

join() 可使用不同的分隔符来构建字符串

栈方法

先进后出

push() 推入到最后并返回修改后的长度

pop() 移除最后并返回该值

队列方法

先进先出

shift() 移除第一项并返回该值

unshift() 在前端添加并返回修改后的长度

重排序方法

reverse() 反转顺序

sort() 按升序排列数组，比较的是字符串，“5”>“10”
```js
function compare(v1,v2){

    if(v1<v2){

        return -1;

    }else if(v1>v2){

        return 1;        

    }else{

        return 0;        

    }

}

vs.sort(compare);

function compaer(v1,v2){

    return v2-v1;

}  //数值类型 
```
操作方法

contant() 复制当前数组并返回新数组，如有传值则添置新数组末尾

slice() 接收1或2个参数（返回项的起始和结束，负数为长度+负数）

splice() 删除 2个参数 （起始位置，删除项数）；插入 3个参数 （起始位置，删除项数0，插入项）；替换3个参数 （起始位置，删除项数，替换项）

位置方法

indexOf() 参数为要查找的项和起点位置索引（可选），没找到返回-1，比较用的===

lastIndexOf() 倒序

迭代方法（ES5 IE9+）

every() 对每一项运行给定函数，全为true则返回true

filter() 对每一项运行给定函数，返回结果为true的项构成的数组

forEach() 对每一项运行给定函数，无返回

map() 对每一项运行给定函数，返回结果构成的数组

some() 对每一项运行给定函数，只要有true则返回true

function(item,index,array){};

归并方法（ES5 IE9+）

迭代数组的所有项，然后构建一个最终返回的值

reduce()

reduceRight()

function(prev,cur,index,array){};

###5.3Date类型

UTC时间 （1970.1.1 00：00开始的毫秒数）

Date.parse("6/13/2004")；返回UTC毫秒数，支持多种日期格式

Date.UTC(2005,4,5,17,55,55);//GMT 2005.5.5 17:55:55 日默认是1，其余默认0

ES5 Date.now() 等同于 + new Date();

继承的方法

    value0f()返回毫秒数

日期格式化方法

    推荐toUTCString()

日期/时间组件方法

    太多了。。

###5.4 RegExp类型

var expression=/pattern/flags;

new RegExp["pattern","flags"];

pattern 正则表达式；flags标志（g全局，i不区分大小写，m多行）

元字符（需转义，加转义符号\） ([{\^$|)?*+.]}

字面量方式共享同一实例，而构造函数创建的实例每个都是新的；

RegExp实例方法

exec() 接受要应用的字符串，返回包含第一个匹配项信息的数组或null，为Array实例，多了index和input属性

test() 返回布尔值

###5.5 Function 类型

函数名是一个指向函数对象的指针

没有重载

    变量被覆盖了

作为值的函数

    去掉函数名后的括号可访问函数的指针而不执行函数

函数内部属性

    arguments.callee 指向arguments对象的函数，可用于解耦

    this 函数据以执行的环境对象

    caller(ES5 Opera9.6+) 保存着调用当前函数的函数引用

函数属性和方法

    length 函数希望接收的命名参数的个数

    prototype 第六章

    apply() call() 在特定的作用域中调用函数

    apply() 两个参数，作用域和参数数组

    call() 作用域，其余参赛需逐个列举出来

    bind() IE9+ 会创建一个函数的实例，其this值会被绑定到传给bind()函数的值

    window.color="red";

    var o={color:"blue"};

    function sayColor(){

        alert(this.color);

    }

    var os =sayColor.bind(o);

    os();//blue

###5.6基本包装类型

Boolean,Number,String

    是基本类型值，但封装了一些方法，因为对象的生存期，不能再运行时为基本类型值添加属性和方法

Boolean

    略

Number

    toString() 以n进制数值的字符串形式返回

    toFixed()    返回指定的小数位数值的字符串

    toExponential()    指数表示法..

    toPrecision()    以合适的形式..

String

    length() 包含多少个字符

    charAt()    返回给定位置的那个字符

    charCodeAt()    。。。的编码

    （ES5 IE8+）stringValue[1]

    contact() 拼接字符并将其返回为新字符串（不如用+）

    slice(),substr(),substring() 返回心字符串

    indexOf 返回从头开始的子字符串位置，没有则返回-1，可接受第二个参数，表示初始位置

    lastIndexOf() ..尾。。

    trim() (ES5,IE9+)去前后空格

    match(),search() 匹配正则

    replace() 两个参数，正则表达式或字符串（只替换第一个），字符串或函数（模式匹配项，匹配到的位置，原始字符串）

    split() 指定分隔符将字符串切割并返回一个数组，可指定第2个参数（数组的最大长度）

    localCompare() 比较，返回1或-1或0

###5.7单体内置对象

Global对象

    encodeURL(),encodeURLCompontent() URI编码，后者用的多

    decodeURL(),decodeURLCompontent()  解码

    eval() 解析器，注意使用安全

window 第八章

Math

    Math.E e

    Math.LN10 以e为底10的自然对数

    Math.PI π

    min(),max()确定最小值和最大值，数组中：var vs=[];var max=Math.max.apply(Math,vs);

    ceil() 向上舍入

    floor() 向下舍入

    round() 四舍五入

    random() 返回0到1的随机数

    Math.abs(num) 返回num的绝对值，还好多不写了。

 

![6f4ec6f41bd5ad6edb6415f389cb39dbb7fd3cdb.jpg](http://www.vastskycc.com/zb_users/upload/2016/07/201607171468757211263480.jpg)

字好多。。