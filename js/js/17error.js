try {
	//可能导致错误的代码
} catch(e) {
	//TODO handle the exception
}

try {
	cc.aa == 22;
} catch(e) {
	console.log(e.message);
}
//cc is not defined

function testFinally() {
	try {
		return 2;
	} catch(e) {
		return 1;
	} finally {
		return 0;
	}
}
//finally始终都会执行

//自定义错误消息
throw new Error('Something bad happend');

//自定义错误类型
function CustomError (msg) {
	this.name='CustomError';
	this.message=msg;
}
CustomError.prototype=new Error();
throw new CustomError('My msg';)
//时机
function process(values){
	if (!(values instanceof Array)) {
		throw new Error('process():Argument must be an array');
	}
	value.sort();
	for (var i=0,len=values.length;i<len;i++) {
		if (values[i]>100) {
			return values[i];
		}
	}
	return -1;
};


