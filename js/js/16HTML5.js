var iframeWindow = document.getElementById('myFrame').contentWindow;
iframeWindow.postMessage('a secret', 'http://www.wrox.com');

EventUtil.addHandler(window, 'message', function(event) {
	//确保发送的域是已知的域
	if(event.origin == 'http://www.wrox.com') {
		//处理接收到的数据
		processMessage(event.data);

		//可选：向来源窗口发送回执
		event.source.postMessage('received', 'http://p2p.wrox.com');
	}
});
//将#droptarget变为一个放置目标
var droptarget = document.getElementById('droptarget');
EventUtil.addHandler(droptarget, 'dragover', function(event) {
	EventUtil.preventDefault(event);
});
EventUtil.addHandler(droptarget, 'dragenter', function(event) {
	EventUtil.preventDefault(event);
});
//让ff不打开新窗口
EventUtil.addHandler(droptarget, 'drag', function(event) {
	EventUtil.preventDefault(event);
});

