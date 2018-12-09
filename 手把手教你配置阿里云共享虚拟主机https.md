# 手把手教你配置阿里云共享虚拟主机https



> 想配https好久了，一开始折腾了几下没弄出来，卡在`开启`那边，后来有天瞎点点倒配出来了。。
>
> 注意哦
>
> ![前置条件](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0s7gutlhj20n00cl3za)

## 1、申请证书

[证书申请地址](https://common-buy.aliyun.com/?spm=5176.7968328.1120760.1.25a61232vsdtgf&commodityCode=cas&accounttraceid=880db52d-44eb-4986-8822-072e023d644a#/buy)



![img](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0sbnaygzj210t0mzn02)

依次点击`Symantec`->`一个域名`->`免费型DV SSL`

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0sfcfd9ej20vo0kygnv)

点击购买，确认后

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0shfeakyj20w60db0tb)

点击[证书控制台](https://yundunnext.console.aliyun.com/?p=casnext#/overview/cn-hangzhou)

也可以在控制台->安全（云盾）->SSL 证书（应用安全）进入

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0sno1effj21hg0p277h)

点击左侧未签发证书里的证书卡片的`申请`,在右侧弹窗中输入信息，点击下一步等待系统验证。

验证成功后可在`已签发证书`里看到（忘记多久了，反正蛮快的，我好像是吃了顿午饭就过了）

## 2、启用https

进入云虚拟主机控制台，可在控制台->域名与网站（万网）->云虚拟主机->管理

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0syxkarkj20k40da74z)



接着 站点信息->域名绑定

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0t09li5lj216u073t9f)

点击`开启`

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0t1spy6tj20hc0a6q3a)



选择`云盾证书`，确定后稍等片刻（我第一次申请就几分钟）

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0t311cj1j20e704ot8n)

这样就好啦,直接输入原来http开头的网址会强制变成https

![](http://wx1.sinaimg.cn/large/6c7bfb12gy1fy0t6y8drnj20f307paa6)

