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

//设置和接收文本数据
event.dataTransfer.setData('text', 'some test');
var text = event.dataTransfer.getData('text');
//设置和接收URL
event.dataTransfer.setData('URL', 'http://www.acfun.com');
var url = event.dataTransfer.getData('URL');

//兼容
var dataTransfer = event.dataTransfer;
//读取URL
var url = dataTransfer.getData('URL') || dataTransfer.getData('text/url-list');
//读取文本
var text = dataTransfer.getData('text');

//		<div class="mediaplayer">
//			<div class="video">
//				<video width="800" height="400" id="player">
//					<source src="myvideo.mp4" type="video/mp4"></source>
//					<source src="myvideo.ogv" type="video/ogg"></source>
//					<source src="myvideo.webm" type="video/webm"></source>
//					<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
//						<param name="movie" value="myvideo.swf" />
//						<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
//					</object> 当前浏览器不支持 video直接播放，点击这里下载视频：
//					<a href="myvideo.webm">下载视频</a>
//				</video>
//			</div>
//			<div class="controls">
//				<input type="button" name="video-btn" id="video-btn" value="Play" />
//				<span id="curtiome">0</span>/<span id="duration">0</span>
//			</div>
//		</div>
//

//取得元素的引用
var player = document.getElementById('player'),
	btn = document.getElementById('video-btn'),
	curtime = document.getElementById('curtime'),
	duratime = document.getElementById('duratime');
//更新播放时间
duratime.innerHTML = player.duration;
//为按钮添加事件处理程序
EventUtil.addHandler(btn, 'click', function(event) {
	if(player.paused) {
		player.play();
		btn.value = 'Pause';
	} else {
		player.pause();
		btn.value = 'Play';
	}
});
//定时更新当前时间
setInterval(function () {
	curtime.innerHTML=player.currentTime;
},250);



if (audio.canPlayType('audio/mpeg') {
	//
};

var audio=new Audio('sound.mp3');
EventUtil.addHandler(audio,'canplaythrough',function (event) {
	audio.play();	
});

history.pushState({name:'N'},'N page' ,'n.html');//状态对象，新状态的标题，可选的相对URL

EventUtil.addHandler(window,'popstate',function (event) {
	var state=event.state;
	if (state) {
		processState(state);
	}
});
history.replaceState({name:'G'},'g page');