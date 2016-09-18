//检测网络状态
if(navigator.onLine) {
	//正常工作
} else {
	//执行离线状态时的任务
}
EventUtil.addHandler(window, 'online', function() {
	console.log('online');
});
EventUtil.addHandler(window, 'offline', function() {
	console.log('offline');
});
var CookieUtil = {
	get: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(';', cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));

		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
		if(expires instanceof Date) {
			cookieText += ';expires=' + expires.toGMTString();
		}
		if(path) {
			cookieText += ';path=' + path;
		}
		if(domain) {
			cookieText += ';domain=' + domain;
		}
		if(secure) {
			cookieText +=';secure';
		}
		document.cookie=cookieText;
	},
	unset:function (name,domain, secure) {
		this.set(name,'',new Date(0),path,domain,secure);
	}
};