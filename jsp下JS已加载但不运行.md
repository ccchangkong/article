# jsp下JS已加载但不运行

> 一个愚蠢的错误

某天，某后端拿着咱们前端的页面改JSP，其中有上传图片的功能（用的[WebUploader](http://fex.baidu.com/webuploader/)）,前端测试一切正常，然后在快下班的时候，某后端跟我们说出问题了，症状是JS文件已加载但不运行，语法检查不报错。

这般那般，最后发现是引用外部JS文件的时候type里多打了个斜杠。。。。

明明静态页面的时候type写错是加载不到的。要不以后干脆不写type了，反正默认就是text/javascript。

~~一个赛艇!~~[IKS)JO1BWJ]F28YB%_AY}TD.png](http://www.vastskycc.com/zb_users/upload/2016/06/201606271466990539909709.png)