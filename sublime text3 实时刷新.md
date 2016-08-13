# sublime text3 实时刷新

> 请先安装Package Control！

按ctrl+shift+p,输install按enter，输入LiveReload，回车确定安装；

在浏览器中安装对应插件，chrome下，在商店里搜索LiveReload，扩展程序里第一个就是，[或者直接戳这里](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)，然后在管理扩展程序里livereload的“允许访问文件网址”的权限打开；

![QQ图片20160728102559.png](http://www.vastskycc.com/zb_users/upload/2016/07/201607281469672917201341.png)

![img](http://www.vastskycc.com/zb_users/upload/2016/07/201607281469673642931818.png)关闭状态

![img](http://www.vastskycc.com/zb_users/upload/2016/07/201607281469673642671232.png)开启状态

回到sublime，在preferences（首选项） -> Packge Settings （插件设置）-> LiveReload -> Settings - User

输入

```js
{
    "enabled_plugins": [
        "SimpleReloadPlugin",
        "SimpleRefresh"
    ]
}
```

这里如果编辑的是Settings - Default的话，貌似不能保存，则每次打开sublime都要手动开启livereload（ctrl+shift+p>输入livereload找livereload：enable/disable plug-ins按enter>enable simple reload）。

到这里直接在浏览器里打开文件，在sublime里编辑对应文件，保存后就能实时刷新了！

配合view in brower（在浏览器中预览效果更佳），安装：ctrl+shift+p>view in brower按enter

```md
CTRL + ALT + F - Firefox
CTRL + ALT + C - Chrome
CTRL + ALT + I - Internet Explorer
CTRL + ALT + S - Safari
```

也可在Settings - User里自己设置快捷键；

2016年8月7日补充：直接在首选项 ->按键绑定-用户设置 { "keys": ["f12"], "command": "open_in_browser" }即可，不需安装插件。

>附录：插件推荐

emmet，不解释;

terminal，安装完后按ctrl+shift+t在文件位置打开cmd；

HTML-CSS-JS Prettify,代码格式整理，快捷键ctrl+shift+h;