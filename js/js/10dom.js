var div = document.getElementById('div');
div.id = 'div2';
dic.className = 'divv';
//create
if(client.browser.ie && client.browser.ie <= 7) {
	//	创建一个带name特性的iframe
	var iframe = document.createElement("<iframe name=\"myframe\"></iframe>");

	//创建input元素
	var input = document.createElement("<input type=\"checkbox\">");
	//button
	var button = document.createElement("<button type=\"reset\"></button>");
	//radio
	var radio1 = document.createElement("<input type=\"radio\" name=\"choice\"" + "value=\"1\">");
	var radio2 = document.createElement("<input type=\"radio\" name=\"choice\"" + "value=\"2\">");
}

//text
var element = document.createElement('div');
element.className = 'message';

var textNode = document.createTextNode('Hello world');
element.appendChild(textNode);
document.body.appendChild(element);

//动态脚本  外链
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'demo.js';
document.body.appendChild(script);
//封装
function loadScript(url) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	document.body.appendChild(script);
}
//行内
function loadScriptString(code) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	try {
		script.appendChild(document.createTextNode(code));
	} catch(e) {
		script.text = code;
	}
	document.body.appendChild(script);
}

//css
function loadStyles(url) {
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
}

function loadStyleString(css) {
	var style = document.createElement('style');
	style.type = 'text/css';
	try {
		style.appendChild(document.createTextNode(css));
	} catch(e) {
		style.styleSheet.cssText = css;
	}

	var head = document.getElementsByTagName('head')[0];
	head.appendChild(style);
}

//更清晰的创建表格
var table = document.createElement('table');
table.border = 1;
table.width='100%';

var tbody=document.createElement('tbody');
table.appendChild(tbody);

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode('cell 1,1'));
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode('cell 2,1'));

tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode('cell 1,2'));
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode('cell 2,2'));

document.body.appendChild(table);
