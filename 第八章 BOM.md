# 第八章 BOM

> BOM:浏览器对象模型

## 8.1 window对象

### 8.1.1 全局作用域

所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。

全局变量不能通过delete删除，而直接在window对象上定义的属性可以。



```javascript
//全局作用域

var age = 29;

window.color = 'red';

 

delete window.age; //false

delete window.color; //return true

 

alert(window.age); //29

alert(window.color); //undefined;
```



### 8.1.2窗口关系及框架

```javascipt
window.frames[0];//第一个框架

top.frames[0];//最外层框架
```

### 8.1.3 窗口位置

> 距

