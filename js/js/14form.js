var form = document.getElementById('form1');

var firstForm = document.forms[0]; //获取页面中的第一个表单
var myForm = document.forms['form2']; //取得页面中名称为‘form2’的表单，不推荐

//<!--通用按钮-->
//<input type="submit" value="submit form"/>
//<!--自定义提交按钮-->
//<button type="submit">submit form</button>
//<!--图像按钮-->
//<input type="image" src="demo.gif" />

var form = document.getElementById('myForm');
EventUtil.addHandler(form, 'submit', function(event) {
	event = EventUtil.getEvent(event); //取得事件对象
	EventUtil.preventDefault(event); //阻止默认事件
});

var form = document.getElementById('myForm');
form.submit();//提交表单，以此方式提交表单不会触发submit事件，因此记得先验证表单


// <!--通用重置按钮-->
//<input type="reset" value="reset form" />
//<!--自定义重置按钮-->
//<button type="reset">reset form</button>

var form = document.getElementById('myForm');
EventUtil.addHandler(form, 'reset', function(event) {
	event = EventUtil.getEvent(event); //取得事件对象
	EventUtil.preventDefault(event); //阻止默认事件
});
var form = document.getElementById('myForm');
form.reset();//重置表单


 var form = document.getElementById('myForm');
 var field1=form.elements[0];//取得表单中的第一个字段
 var field2=form.elements['textbox1'];//取得名为‘textbox1’的字段
 var fieldCount=form.elements.length;//取得表单中包含的字段的数量
 
// 		<form action="" method="post" id='myForm'>
//			<ul>
//				<li><input type="radio" name="color" value="red" />red</li>
//				<li><input type="radio" name="color" value="green" />green</li>
//				<li><input type="radio" name="color" value="blue" />blue</li>
//			</ul>
//		</form>

 var form = document.getElementById('myForm');
var colorFields=form.elements['color'];
alert(colorFields.length);//3

var firstColorField=colorFields[0];
var firstFormField=form.elements[0];//尽可能用这种方式
alert(firstColorField===firstFormField);//true

var form = document.getElementById('myForm');
var field=form.elements[0];
//修改value属性
field.value='another value';
//检查form属性的值
alert(field.form===form);//true
//把焦点设置到当前字段
field.focus();
//禁用当前字段
field.disabled=true;
//修改type属性（不推荐，但对input来说时可行的）
field.type='checkbox';


//避免多次提交表单
EventUtil.addHandler(form,'submit',function (event) {
	event=EventUtil.getEvent(event);
	var target=EventUtil.getTarget(event);
	//取得提交按钮
	var btn=target.elements['submit-btn'];
	//禁用她
	btn.disabled=true;
});


