# QQ音乐API整理

> 最近准备用vue做个音乐播放器，网上找了找音乐API，看了一圈，还是QQ音乐最合适，这里做个整理

## 歌曲搜索

### 接口地址

```js
var num = 3,
    name = '王菲',
    urlString = `http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=${num}&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=${name}`;
```

### 调用

```js
//用了个PHP代理解决跨域问题
$.post("proxy.php", {
        urlString
      }, function(data) {
        data = JSON.parse(data)
        data['data']['song']['list'].forEach(
          e => console.log(e['f'])
        )
      })
```

```php
<?php
$url=$_POST['urlString'];
$res = file_get_contents($url);
echo $res;
?>
```
### 注释

`num`：请求搜索的数量

`name`：搜索的关键词

## 歌曲榜单

### 接口地址

```js
// 新歌榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js
// 总榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js
```

### 调用

```js
$.ajax({
  type: "get",
  async: false,
  url: "http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js",
  dataType: "jsonp",
  jsonp: "callback",
  jsonpCallback: "JsonCallback",
  scriptCharset: 'GBK',//设置编码，否则会乱码
  success: function(data) {
    console.log(JSON.stringify(data))
  },
  error: function() {
    alert('fail');
  }
});
```



### 注释

![](http://ww1.sinaimg.cn/large/6c7bfb12gw1fadx7om48cj20uk03mwh5.jpg)

主要获取的是`id`（歌曲id）、`albumId`（图片id）

## 歌曲地址

### 接口地址

```js
var id = 101369814,
    src = `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
```

### 调用

```html
<audio src="http://ws.stream.qqmusic.qq.com/101369814.m4a?fromtag=46" controls></audio>
```

### 注释

没啥好说的。。

## 歌曲图片

### 接口地址

```js
var id = 101369814,
    txt = `http://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`;
```

### 调用

待补充

### 注释

没啥说的

## 歌词地址

### 接口地址

```js
var image_id = 140820,
    width = 300,
    pic = `http://imgcache.qq.com/music/photo/album_${width}/${image_id%100}/${width}_albumpic_${image_id}_0.jpg`;
```

### 调用

```html
<img src="http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_140820_0.jpg" alt="">
```

### 注释

`image_id`：图片id

`width`：图片尺寸

![](http://ww2.sinaimg.cn/large/6c7bfb12gw1fadxwaiww5j21kw16o7wh.jpg)