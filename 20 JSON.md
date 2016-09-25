# 20 JSON

> JavaScript Object Notation,JS对象表示法

## 20.1 语法

JSON的语法可以表示以下三种类型的值

| 类型   | 介绍                              |
| ---- | ------------------------------- |
| 简单值  | 可表示字符串、数值、布尔值和null，不支持undefined |
| 对象   | 一组无序的键值对                        |
| 数组   | 一组有序的值的列表                       |

### 20.1.1 简单值

数值5和字符串，字符串必须要双引号

```json
5
"hello world"
```

### 20.1.2 对象  

```js
//js对象
var person = {
	name: 'N',
	age: 29
};
var person = {
	"name": "N",
	"age": 29
};
```

```json
//json对象
{
	"name": "N",
	"age": 29
}
//没有变量声明
//不需要分号

//嵌套
{
	"name": "N",
	"age": 29,
	"school": {
		"name": "College",
		"localtion": "SHAXI"
	}
}
//可以出现相同的属性

//双引号！！！！
```

### 20.1.3 数组

```js
//js
var values = [25, 'hi', true];
```

```json
//json
[25, 'hi', true]
```

```json
//数组对象结合
[{
	"name": "N",
	"age": 29,
	"school": {
		"name": "College",
		"localtion": "SHAXI"
	}
}, {
	"name": "C",
	"age": 28,
	"school": {
		"name": "College",
		"localtion": "SHAXI"
	}
}]
```

> 对象和数组通常时JSON数据结构的最外层形式

## 20.2 解析与序列化

```js
//解析后
people[1].name;
```

### 20.2.1 JSON对象

早期解析使用`eval()函数`；

现代一般使用JSON对象，IE8+；

```js
var jsonText = JSON.stringify(people);
//console.log(jsonText);->{"name":"C","age":28,"school":{"name":"College","localtion":"SHAXI"}}

var peopleCopy = JSON.parse(jsonText);
//people与peopleCopy没什么关系，是两个独立的对象
```

> 在序列化js对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为`undefined`的任何属性也都会被跳过。

### 20.2.2 序列化选项

#### 1 过滤结果

```js
var jsonText = JSON.stringify(people, ["name", "age"]);
//{"name":"C","age":28}
```

```js
var people = {
	name: ["C"], //这里改成数组了
	age: 28,
	school: {
		name: "College",
		localtion: "SHAXI"
	}
}
var jsonText = JSON.stringify(people, function(key, value) {
	switch(key) {
		case "name":
			return value.join(".");
		case "age":
			return 18; //永远的18岁
		case "school":
			return undefined;
		default:
			return value;
	}
});
//console.log(jsonText);->{"name":"C","age":18}
```

#### 2 字符串缩进

```js
var people = {
	name: "C",
	age: 28,
	school: {
		name: "College",
		localtion: "SHAXI"
	}
}
var jsonText = JSON.stringify(people, null, 4); //缩进4空格
var jsonText = JSON.stringify(people, null, "--"); //缩进2个段划线
```

#### 3 toJSON()方法

```js
var people = {
	name: "C",
	age: 28,
	school: {
		name: "College",
		localtion: "SHAXI"
	},
	toJSON: function() {
		return this.name;
	}
};
var jsonText = JSON.stringify(people);
//console.log(jsonText);->"C"
```

### 20.2.3 解析选项

```js
var people = {
	name: "C",
	age: 28,
	school: {
		name: "College",
		localtion: "SHAXI"
	},
	releaseDate: new Date(2011, 11, 11)
};
var jsonText = JSON.stringify(people);
//console.log(jsonText);
//->{"name":"C","age":28,"school":{"name":"College","localtion":"SHAXI"},"releaseDate":"2011-12-10T16:00:00.000Z"}
var peopleCopy=JSON.parse(jsonText,function (key,value) {
	if (key=='releaseDate') {
		return new Date(value);
	} else{
		return value;
	}
});
//console.log(peopleCopy.releaseDate.getFullYear());->2011
```

