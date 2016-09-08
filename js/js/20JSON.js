//js
var person = {
	name: 'N',
	age: 29
};
var person = {
	"name": "N",
	"age": 29
};
//json
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

//js
var values = [25, 'hi', true];
//json
[25, 'hi', true]

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

var people = {
	name: "C",
	age: 28,
	school: {
		name: "College",
		localtion: "SHAXI"
	}
}
var jsonText = JSON.stringify(people);
//console.log(jsonText);->{"name":"C","age":28,"school":{"name":"College","localtion":"SHAXI"}}

var peopleCopy = JSON.parse(jsonText);
//people与peopleCopy没什么关系，是两个独立的对象

//序列化选项
var jsonText = JSON.stringify(people, ["name", "age"]);
//{"name":"C","age":28}
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