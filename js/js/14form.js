//取得表单引用
var form = document.getElementById('form1');

var firstForm = document.forms[0]; //获取页面中的第一个表单
var myForm = document.forms['form2']; //取得页面中名称为‘form2’的表单，容易出错，将来浏览器可能不支持，不推荐

//<!--通用按钮-->
//<input type="submit" value="submit form"/>
//<!--自定义提交按钮-->
//<button type="submit">submit form</button>
//<!--图像按钮-->
//<input type="image" src="demo.gif" />

//阻止表单提交
var form = document.getElementById('myForm');
EventUtil.addHandler(form, 'submit', function(event) {
	event = EventUtil.getEvent(event); //取得事件对象
	EventUtil.preventDefault(event); //阻止默认事件
});

var form = document.getElementById('myForm');
form.submit(); //提交表单，以此方式提交表单不会触发submit事件，因此记得先验证表单

//<!--通用重置按钮-->
//<input type="reset" value="reset form" />
//<!--自定义重置按钮-->
//<button type="reset">reset form</button>

//阻止重置表单
var form = document.getElementById('myForm');
EventUtil.addHandler(form, 'reset', function(event) {
	event = EventUtil.getEvent(event); //取得事件对象
	EventUtil.preventDefault(event); //阻止默认事件
});
var form = document.getElementById('myForm');
form.reset(); //重置表单

var form = document.getElementById('myForm');
var field1 = form.elements[0]; //取得表单中的第一个字段
var field2 = form.elements['textbox1']; //取得名为‘textbox1’的字段
var fieldCount = form.elements.length; //取得表单中包含的字段的数量

// 		<form action="" method="post" id='myForm'>
//			<ul>
//				<li><input type="radio" name="color" value="red" />red</li>
//				<li><input type="radio" name="color" value="green" />green</li>
//				<li><input type="radio" name="color" value="blue" />blue</li>
//			</ul>
//		</form>

var form = document.getElementById('myForm');
var colorFields = form.elements['color'];
alert(colorFields.length); //3

var firstColorField = colorFields[0];
var firstFormField = form.elements[0]; //尽可能用这种方式
alert(firstColorField === firstFormField); //true

var form = document.getElementById('myForm');
var field = form.elements[0];
//修改value属性
field.value = 'another value';
//检查form属性的值
alert(field.form === form); //true
//把焦点设置到当前字段
field.focus();
//禁用当前字段
field.disabled = true;
//修改type属性（不推荐，但对input来说时可行的）
field.type = 'checkbox';

//避免多次提交表单
EventUtil.addHandler(form, 'submit', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	//取得提交按钮
	var btn = target.elements['submit-btn'];
	//禁用她
	btn.disabled = true;
});

//为表单第一个字段调用focus()方法
EventUtil.addHandler(window, 'load', function(event) {
	document.forms[0].elements[0].focus();
	//如果其为input元素，且其type特性的值为‘hidden’，则会导致错误，css设置隐藏也会导致错误
});

//HTML5 ie10+
//<input type="text" autofocus/>

EventUtil.addHandler(window, 'load', function(event) {
	var element = document.forms[0].elements[0];
	if(element.autofocus !== true) {
		element.focus();
	}
});

//<input type="text" readonly/>
document.forms[0].elements[0].blur();

var textbox = document.forms[0].elements[0];
EventUtil.addHandler(textbox, 'focus', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(target.style.backgroundColor != 'red') {
		target.style.backgroundColor = 'yellow';
	}
});
EventUtil.addHandler(textbox, 'blur', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(/[^\d]/.test(target.value)) {
		target.style.backgroundColor = 'red';
	} else {
		target.style.backgroundColor = '';
	}
});
EventUtil.addHandler(textbox, 'change', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	if(/[^\d]/.test(target.value)) {
		target.style.backgroundColor = 'red';
	} else {
		target.style.backgroundColor = '';
	}
});

//<input type="text" size="25" maxlength="50" value="texts"/>
//要表现文本框，须将type属性设置为text，显示25个字符，但输入不能超过50个字符

//<textarea name="" rows="25" cols="5"></textarea>

var textbox = document.forms[0].elements['textbox1'];
alert(textbox.value);
textbox.value = 'new valuae';

//选择文本
var textbox = document.forms[0].elements['textbox1'];
textbox.select();

EventUtil.addHandler(textbox, 'focus', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	target.select();
});

var textbox = document.forms[0].elements['textbox1'];
EventUtil.addHandler(textbox, 'select', function(event) {
	alert('text selected' + textbox.value);
});

//ie9+
function getSelectedText(textbox) {
	return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
}
//ie4-10
function getSelectedText(textbox) {
	if(typeof textbox.selectionStart == 'number') {
		return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
	} else if(document.selection) {
		return document.selection.createRange().text;
	}
}

//选择部分文本
//ie9+
textbox.value = 'hello world';
//选择所有文本
textbox.setSelectionRange(0, textbox.value.length); //hello world
//选择前3个字符
textbox.setSelectionRange(0, 3); //'hel'
//选择第4到第6个字符
textbox.setSelectionRange(4, 7); //'o w'

function selectText(textbox, startIndex, stopIndex) {
	if(typeof textbox.selectionStart == 'number') {
		return textbox.value.substring(startIndex, stopIndex);
	} else if(textbox.createTextRange) {
		var range = textbox.createTextRange();
		range.collapse(true);
		range.moveStart('character', startIndex);
		range.moveEnd('character', stopIndex - startIndex);
		range.select();
	}
	textbox.focus();
}

//例子
textbox.value = 'hello world';
//选择所有文本
selectText(textbox, 0, textbox.value.length); //hello world
//选择前3个字符
selectText(textbox, 0, 3); //'hel'
//选择第4到6个字符
selectText(textbox, 4, 7); //'o w'

//屏蔽所有按键操作
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
});

//只允许输入数值
EventUtil.addHandler(textbox, 'keypress', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var charCode = EventUtil.getCharCode(event);
	if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
		EventUtil.preventDefault(event)
	}
});

var EventUtil = {
	//addclip
	getClipboardText: function(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData('text');
	},
	setClipboardText: function(event, value) {
		if(event.clipboardData) {
			return event.clipboardData.setData('text/plain', value);
		} else if(window.clipboardData) {
			return window.clipboardData.setData('text', value);
		}
	},
};

EventUtil.addHandler(textbox, 'paste', function(event) {
	event = EventUtil.getEvent(event);
	var text = EventUtil.getClipboardText(event);
	if(!/^\d*$/.test(text)) {
		EventUtil.preventDefault(event);
	}
});

//<input type="text" name="tel1" id="txtTel1" maxlength="3"/>
//<input type="text" name="tel2" id="txtTel2" maxlength="3"/>
//<input type="text" name="tel3" id="txtTel2" maxlength="4"/>

(function() {
	function tabForward(event) {
		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);
		if(target.value.length == target.maxLength) {
			var form = target.form;
			for(var i = 0, len = form.elements.length; i < len; i++) {
				if(form.elements[i] == target) {
					if(forms.elements[i + 1]) {
						forms.elements[i + 1].focus();
					}
				}
			}
		}
	}
	var textbox1 = document.getElementById('TextTel1');
	var textbox2 = document.getElementById('TextTel2');
	var textbox1 = document.getElementById('TextTel3');
	EventUtil.addHandler(textbox1, 'keyup', tabForward);
	EventUtil.addHandler(textbox2, 'keyup', tabForward);
	EventUtil.addHandler(textbox3, 'keyup', tabForward);

})();

//<input type="text" name="username" required/>
//检查是否为必填字段
var isUsernameRequired = document.forms[0].elements['username'].required;
//检查是否支持
var isRequiredSupported = 'required' in document.createElement('input');

//其他输入类型
//<input type="email" name="email"/>
//<input type="url" name="homepage"/>

var input = document.createElement('input');
input.type = 'email';
var isEmailSupported = (input.type == 'email');

//用户只能输入0到100的值，且这个值必须时5的倍数；效果不一定
//<input type="number" name="count" min='0' max='100' step='5'/>
//ie10+
input.stepUp(); //+1
input.stepUp(5); //+5
input.stepDown(); //-1
input.stepDown(10); //-10

//ie10+
//<input type="number" name="count" pattern='\d+'/>
var pattern = document.forms[0].elements['count'].pattern;
var isPatternSupported = 'pattern' in document.createElement('input');
//表单字段
if(document.forms[0].elements[0].checkValidity()) {
	//continue
} else {
	//
}
//表单
if(document.forms[0].checkValidity()) {
	//continue
} else {
	//
}

if(input.validity && !input.validity.valid) {
	if(input.validity.valueMissing) {
		alert('please specify a value')
	} else if(input.validity.typeMismatch) {
		alert('please enter an email address')
	} else {
		alert('value is invalid');
	}
}
//<form novalidate></form>
document.forms[0].noValidate = true; //禁用验证

//<form novalidate><input type='submit' formnovalidate name='btn'></form>
document.forms[0].elements['btn'].formNoValidate = true;

//<select name="selects" id='selectss'>
//	<option value="aa">1</option>
//	<option>2</option>	
//	<option value="">3</option>
//</select>

var selectbox = document.forms[0].elements['selects'];
//不推荐
var text = selectbox.options[0].firstChild.nodeValue; //选项的文本值
var value = selectbox.options[0].getAttribute('value'); //选项的值
//推荐
var text = selectbox.options.text; //选项的文本值
var value = selectbox.options.value; //选项的值

var selectedOption = selectbox.options[selectbox.selectedIndex];
//选中项之后
var selectedIndex = selectbox.selectedIndex;
var selectedOption = selectbox.options[selectedIndex];
console.log('selected index:' + selectedIndex + '\nSelected text:' + selectedOption.text + '\nSelected value:' + selectedOption.value); //索引、文本、值

selectbox.options[0].selected = true;

function getSelectedOptions(selectbox) {
	var result = new Array();
	var option = null;
	for(var i = 0, len = selectbox.options.length; i < len; i++) {
		option = selectbox.options[i];
		if(option.selected) {
			result.push(option);
		}
	}
	return result;
}

var selectbox = document.getElementById('selectss');
var selectedOptions = getSelectedOptions(selectbox);
var message = '';
for(var i = 0, len = selectedOptions.length; i < len; i++) {
	message += 'selected index:' + selectedOptions[i].index + '\nSelected text:' + selectedOptions[i].text + '\nSelected value:' + selectedOptions[i].value + '\n\n';
}
//DOM方法
var newOption = document.createElement('option');
newOption.appendChild(document.createTextNode('Option text'));
newOption.setAttribute('value', 'Option value');
selectbox.appendChild(newOption);

//构造函数方法
var newOption = new Option('Option text', 'Option value');
selectbox.appendChild(newOption);

//add方法
var newOption = new Option('Option text', 'Option value');
selectbox.add(newOption, undefined); //最佳方案
//移除第一个选项
selectbox.removeChild(selectbox.options[0]);
selectbox.remove(0);
selectbox.options[0] = null;

//清除所有选项
function clearSelectbox(selectbox) {
	for(var i = 0, len = selectbox.options.length; i < len; i++) {
		selectbox.remove(i);
	}
}
//将第一个选择框的第一个选项移动到第二个选择框
var selectbox1 = document.getElementById('selectbox1');
var selectbox2 = document.getElementById('selectbox2');
selectbox2.appendChild(selectbox1.options[0]);

//DOM方法
var optionToMove = selectbox.options[1];
selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index - 1]);
var optionToMove = selectbox.options[1];
selectbox.insertBefore(optionToMove, selectbox.options[optionToMove.index + 2]);

//表单序列化
function serialize(form) {
	var parts = [],
		field = null,
		len,
		j,
		optLen,
		option,
		optValue;
	for(i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i];
		switch(field.type) {
			case 'select-one':
			case 'select-multiple':
				if(field.name.length) {
					for(j = 0, optLen = field.options.length; j < optLen; j++) {
						option = field.options[j];
						if(option.selected) {
							optValue = ''
							if(option.hasAttribute) {
								optValue = (option.hasAttribute('value') ? option.value : option.text);
							} else {
								optValue = (option.attributes['value'].specified ? option.value : option.text);
							}
							parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
						}
					}
				}
				break;
			case undefined: //字段集
			case 'file': //文件输入
			case 'submit': //提交按钮
			case 'reset': //重置按钮
			case 'button': //自定义按钮
				break;
			case 'radio': //单选按钮
			case 'checkbox': //复选框
				if(!field.checked) {
					break;
				}
				//执行默认操作
			default:
				//不包含没有名字的表单字段
				if(field.name.length) {
					parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
				}
		}
	}
	return parts.join("&");
}

//blank.html
//<!doctype html>
//<html lang="en">
//<head>
//	<meta charset="UTF-8" />
//	<title>Document</title>
//</head>
//<body>
//	
//</body>
//</html>

//<iframe src="blank.html" style='height:100px;width:100px;'></iframe>
//	<script>
//		EventUtil.addHandler(window,'load',function(){
//			frames['richedit'].document.designMode='on';
//		});
//	</script>

//<div class='editable' id='richedit' contenteditable></div>
//打开和关闭
var div = document.getElementById('richedit');
div.contentEditable = 'true';//true,false,inherit

//提交
EventUtil.addHandler(form,'submit',function (event) {
	event=EventUtil.getEvent(event);
	var target=EventUtil.getTarget(event);
	target.elements['comments'].value=frames['richedit'].document.body.innerHTML;
});
EventUtil.addHandler(form,'submit',function (event) {
	event=EventUtil.getEvent(event);
	var target=EventUtil.getTarget(event);
	target.elements['comments'].value=document.getElementById('richedit').innerHTML;
});