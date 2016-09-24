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
		if(subcookies) {
			delete subcookies[subName];
			this.setAll(name, subcookies, null, path, domain, secure);
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
SubCookieUtil.set('data', 'name', 'N');
SubCookieUtil.set('data', 'book', 'jsjs');
//设置全部子cookie和失效日期
SubCookieUtil.setAll('data', {
	'data': 'name',
	'data': 'book'
}, new Date('Jan 1,2010'));
//修改名字的值，并修改cookie的失效日期
SubCookieUtil.setAll('data', 'name', 'Mc', new Date('Jan 1,2010'));

//仅删除名为name的子cookie
SubCookieUtil.unset('data', 'name');
//删除整个cookie
SubCookieUtil.unsetAll('data');

//<div style="behavior:url(#default#userData)" id=dadaStore''></div>

//保存
var dataStore = document.getElementById('dataStore');
dataStore.setAttribute('name', 'N');
dataStore.setAttribute('book', 'JSer');
dataStore.save('BookInfo');
//获取
dataStore.load('BookInfo');
console.log(dataStore.getAttribute('name')); //N
console.log(dataStore.getAttribute('book')); //JSer
//删除
dataStore.removeAttribute('name');
dataStore.removeAttribute('book');
dataStore.save('BookInfo');
//使用方法存储数据
sessionStorage.setItem('name', 'N');
//使用属性存储数据
sessionStorage.book = 'JSer';
//IE8 only
sessionStorage.begin();
sessionStorage.book = 'JSer';
sessionStorage.commit();

//使用方法读取数据
var name = sessionStorage.getItem('name');
//使用属性读取数据
var book = sessionStorage.book;

for(var i = 0, len = sessionStorage.length; i < len; i++) {
	var value = sessionStorage.getItem(key);
	console.log(key + '=' + value);
}

//使用delete删除一个值
delete sessionStorage.name;
//使用方法删除一个值
sessionStorage.removeItem('book');

//保存数据
globalStorage['worx.com'].name = 'N';
//获取数据
var name = globalStorage['worx.com'].name;
//worx.com及其子域都可以访问
globalStorage['www.worx.com'].name = 'N';
var name = globalStorage['www.worx.com'].name;

//存储数据，任何人都可以访问-不要这么做
globalStorage[''].name = "N";
//存储数据，可以让任何以.net结尾的域名访问-不要这么做
globalStorage['net'].name = 'N';

globalStorage['www.wrox.com'].name = 'N';
globalStorage['www.wrox.com'].book = 'JSer';
globalStorage['www.wrox.com'].removeItem('name'); //记得删哦
var book = globalStorage['www.wrox.com'].getItem('book');
//localhost.host做属性名，稳
globalStorage[location.host].name = 'N';
var book = globalStorage[location.host].getItem('book');

//使用方法存储数据
localStorage.setItem('name', 'N');
//使用属性存储数据
localStorage.book = 'JSer';
//使用方法读取数据
var name = localStorage.getItem('name');
//使用属性读取数据
var book = localStorage.book;

function getLocalStorage() {
	if(typeof localStorage == 'object') {
		return localStorage;
	} else if(typeof globalStorage == 'object') {
		return globalStorage[location.host];
	} else {
		throw new Error('local storage not available');
	}
}
var storage = getLocalStorage();

EventUtil.addHandler(document, 'storage', function(event) {
	console.log('storage changed for' + event.domain);
});

var indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;

var request = indexedDB.open('admin');
request.onerror = function(event) {
	console.log('something bad happend while trying to open:' + event.target.errorCode);
};
request.onsuccess = function(event) {
	database = event.target.result;
};

//设置版本号
if(database.version != '1.0') {
	request = database.setVersion('1.0');
	request.onerror = function(event) {
		console.log('set version error:' + event.target.errorCode);
	};
	request.onsuccess = function(event) {
		console.log('complete.Database name:' + database.name + ',version:' + database.version);
	};
} else {
	console.log('Database already initialized.Database name:' + database.name + ',version:' + database.version)
}

var user = {
	username: '007',
	firstName: 'James',
	lastName: 'Bond',
	password: 'foo'
};
//示例
var store = db.createObjectStore('users', {
	keyPath: 'username'
});
//users中保存着一批用户数据
var i = 0,
	request,
	requests = [],
	len = users.length;
while(i < len) {
	request = store.add(users[i++]);
	request.onerror = function() {
		//处理错误
	};
	request.onsuccess = function() {
		//处理成功
	};
	requests.push(request);
};

//db=database
var transaction = db.transaction();
//传入要访问的对象存储空间
var transaction = db.transaction('users');
var transaction = db.transaction(['users', 'anotherStore']);

//设定访问模式，读写什么的
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var transaction = db.transaction('users', IDBTransaction.READ_WRITE);

var request = db.transaction('users').objectStore('users').get('007');
request.onerror = function(event) {
	console.log('did not get the object');
};
request.onsuccess = function(event) {
	var result = event.target.result;
	console.log(result.firstName); //James
};

transaction.onerror = function(event) {
	//整个事务都被取消了
};
transaction.oncomplete = function(event) {
	//整个事务都成功完成了
};

var store = db.transaction('users').objectStore('users'),
	request = store.openCursor();
request.onerror = function(event) {
	//处理失败
};
request.onsuccess = function(event) {
	//处理成功
};

//检索某个结果的信息
request.onsuccess = function(event) {
	var cursor = event.target.result;
	if(cursor) {
		console.log('key:' + cursor.key + ',value:' + JSON.stringify(cursor.value));
	}
};

request.onsuccess = function(event) {
	var cursor = event.target.result,
		value, updateRequest;
	if(cursor) {
		if(cursor.key == 'foo') {
			value = cursor.value; //取得当前的值
			value.password = 'npw'; //更新新值

			updateRequest = cursor.update(value); //请求保存更新
			updateRequest.onsuccess = function() {
				//处理成功
			};
			updateRequest.onerror = function(event) {
				//处理失败
			};
		}
	}
};

request.onsuccess = function(event) {
	var cursor = event.target.result,
		value, deleteRequest;
	if(cursor) {
		if(cursor.key == 'foo') {
			deleteRequest = cursor.delete(value); //请求删除当前项
			deleteRequest.onsuccess = function() {
				//处理成功
			};
			deleteRequest.onerror = function(event) {
				//处理失败
			};
		}
	}
};

request.onsuccess = function(event) {
	var cursor = event.target.result;
	if(cursor) {
		console.log('key:' + cursor.key + ',value:' + JSON.stringify(cursor.value));
		cursor.continue(); //移动到下一项
	} else {
		console.log('done');
	}
};

var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
var store = db.transaction('users').objectStore('users'),
	range = IDBKeyRange.bound('007', 'ace'), //输出的对象的键为007到ace
	request = store.openCursor(range);
request.onsuccess = function(event) {
	var cursor = event.target.result;
	if(cursor) {
		console.log('key:' + cursor.key + ',value:' + JSON.stringify(cursor.value));
		cursor.continue(); //移动到下一项
	} else {
		console.log('done');
	}
};

var IDBCursor = window.IDBCursor || window.webkitIDBCursor;
var store = db.transaction('users').objectStore('users'),
	request = store.openCursor(null, IDBCursor.NEXT_NO_DUPLICATE);
var store = db.transaction('users').objectStore('users'),
	request = store.openCursor(null, IDBCursor.PREV);

var store = db.transaction('users').objectStore('users'),
	index = store.createIndex('username', 'username', {
		unique: false
	}); //索引的名字，索引的属性的名字，键再所有纪录中是否唯一
//取得索引
var store = db.transaction('users').objectStore('users'),
	index = store.index('username');

var store = db.transaction('users').objectStore('users'),
	request = store.index('username'),
	request = index.openCursor();
request.onsuccess = function(event) {
	//处理成功
};

var store = db.transaction('users').objectStore('users'),
	request = store.index('username'),
	request = index.openKeyCursor();
request.onsuccess = function(event) {
	//处理成功
	//event.result.key中保存索引键,而event.result.value中保存主键
};
var store = db.transaction('users').objectStore('users'),
	request = store.index('username'),
	request = index.get('007');
request.onsuccess = function(event) {
	//处理成功
};
request.onerror = function(event) {
	//处理失败
}; 

var store = db.transaction('users').objectStore('users'),
	request = store.index('username'),
	request = index.getKey('007');
request.onsuccess = function(event) {
	//处理成功
	//event.result.key中保存索引键，而event.result.value中保存主键
};
var store=db.transaction('users').objectStore('users'),
indexNames=store.indexNames,
index,
i=0,
len=indexNames.length;
while (i<len){
	index=store.index(indexNames[i++]);
	console.log('index name:'+index.name+',keypath:'+index.keyPath+',unique:'+index.unique);
}

var store=db.transaction('users').objectStore('users');
store.deleteIndex('username');

var request,database;
request=indexedDB.open('admin');
request.onsuccess=function (event) {
	database=event.target.result;
	database.onversionchange=function () {
		database.close();
	};
};

var request=database.setVersion('2.0');
request.onblocked=function () {
	console.log('please close all tabs and try again');
};
request.onsuccess=function () {
	//处理成功，继续
};









