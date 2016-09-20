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
			cookieText += ';secure';
		}
		document.cookie = cookieText;
	},
	unset: function(name, domain, secure) {
		this.set(name, '', new Date(0), path, domain, secure);
	}
};

//demo
//设置cookie
CookieUtil.set('name', 'N');
CookieUtil.set('book', 'jser');
//读取cookie的值
console.log(CookieUtil.get('name'));
console.log(CookieUtil.get('book'));
//删除cookie
CookieUtil.unset('name');
CookieUtil.unset('book');
//设置cookie,包括它的路径、域、失效日期
CookieUtil.set('name', 'n', '/books/projs/', 'www.wrox.com', new Date("Jan 1,2010"));
//删除刚刚设置的cookie
CookieUtil.unset('name', '/books/projs/', 'www.wrox.com');
//设置安全的cookie
CookieUtil.set('name', 'n', null, null, null, true);

var SubCookieUtil = {
	get: function(name, subName) {
		var subCookies = this.getAll(name);
		if(subCookies) {
			return subCookies(subName);
		} else {
			return null;
		}
	},
	getAll: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd,
			subCookies,
			i,
			parts,
			result = {};
		if(cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(';', cookieStart);
			if(cookieEnd == -1) {
				cookieEnd = document.cookie.length;
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd);
			if(cookieValue.length > 0) {
				subCookies = cookieValue.split('&');
				for(i = 0, len = subCookies.length; i < len; i++) {
					parts = subCookies[i].split('=');
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
				}
				return result;
			}
		}
		return null;
	},
	set: function(name, subName, value, expires, path, domain, secure) {
		var subcookies = this.getAll(name) || {};
		subcookies[subName] = value;
		this.setAll(name, subcookies, expires, path, domain, secure)
	},
	setAll: function(name, subcookies, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=',
			subcookieParts = new Array(),
			subName;
		for(subName in subcookies) {
			if(subName.length > 0 && subcookies.hasOwnProperty(subName)) {
				subcookieParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subcookies[subName]));
			}
		}
		if(subcookieParts > 0) {
			cookieText += subcookieParts.join('&');
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
				cookieText += ';secure';
			}

		} else {
			cookieText += ';expires=' + (new Date(0)).toGMTString();
		}
		document.cookie = cookieText;
	},
	unset: function(name, subName, path, domain, secure) {
		var subcookies = this.getAll(name);
		if (subcookies) {
			delete subcookies[subName];
			this.setAll(name,subcookies,null,path,domain,secure);
		}
	},
	unsetAll: function(name, path, domain, secure) {
		this.set(name, null, new Date(0), path, domain, secure);
	}
};

//document.cookie=data=name=N&book=JS%20er
//取得全部子cookie
var data = SubCookieUtil.getAll('data');
console.log(data.name); //N
console.log(data.book); //JS er
//逐个获取子cookie
console.log(SubCookieUtil.get('data', 'name')); //N
console.log(SubCookieUtil.get('data', 'book')); //JS er

//设置两个cookie
SubCookieUtil.set('data','name','N');
SubCookieUtil.set('data','book','jsjs');
//设置全部子cookie和失效日期
SubCookieUtil.setAll('data',{'data': 'name','data': 'book'},new Date('Jan 1,2010'));
//修改名字的值，并修改cookie的失效日期
SubCookieUtil.setAll('data','name','Mc',new Date('Jan 1,2010'));

//仅删除名为name的子cookie
SubCookieUtil.unset('data','name');
//删除整个cookie
SubCookieUtil.unsetAll('data');
 