

# 由Webpack+Vue的一个demo说说Webpack配置

最近想做个基于vue的webApp，就先找了点webpack的demo看看，自己动手玩了下，坑也踩到几个，马马虎虎，写篇文章记录一下

## 目录结构

  ![20160930](http://ww1.sinaimg.cn/mw690/6c7bfb12gw1f8bpoiapwzj206o0eq0su.jpg)

## package.json注释

```json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --inline --config webpack.dev.config.js",//开发
    "build": "webpack --progress --hide-modules --config webpack.prod.config.js"//发布
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.14.0",//编译es6
    "babel-loader": "^6.2.5",//es6加载器
    "babel-plugin-transform-runtime": "^6.15.0",//编译es6
    "babel-preset-es2015": "^6.14.0",//编译es6
    "css-loader": "^0.25.0",//css加载器
    "extract-text-webpack-plugin": "^1.0.1",//单独打包css的插件
    "file-loader": "^0.9.0",//用于加载文件
    "html-loader": "^0.4.4",//html加载器
    "html-webpack-plugin": "^2.22.0",//用于配置html模板
    "node-sass": "^3.9.3",//编译sass
    "sass-loader": "^4.0.1",//sass加载器
    "style-loader": "^0.13.1",//css加载器
    "url-loader": "^0.5.7",//file-loader的封装，用于加载图片之类的东西
    "vue": "^1.0.26",//vue
    "vue-hot-reload-api": "^2.0.6",//vue热加载
    "vue-html-loader": "^1.2.3",//加载vue中的html
    "vue-loader": "^8.5.2",//vue加载器
    "vue-router": "^0.7.13",//vue路由
    "vue-style-loader": "^1.0.0",//加载vue中的样式
    "webpack": "^1.13.2",//webpack
    "webpack-dev-server": "^1.15.1"//webpack服务器
  }
}
```

## webpack.config.js

这里把webpack.config.js拆开来配置了，另外把启动命令写在package.json里啦。

### webpack.base.config.js

```js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //简化操作HTMl的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //用来关联外部文件
module.exports = {
    entry: './src/entry.js',//入口文件
    output: {
        path: path.join(__dirname, './dist'),
        // publicPath: '', //打包后的url前缀
        // filename: 'bundle.js'
        filename: 'bundle.[hash].js'

    },
    resolve: {
        extensions: ['', '.js', '.scss'], //省略扩展名
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            Css: './sass/style.scss', //后续直接 require('Css') 即可
        }
    },
    module: {
        loaders: [                
          		//loader的编译顺序为从后往前
                //'style-loader!css-loader',可省略-loader，如'style!css'
                // 解析.vue文件
                { test: /\.vue$/, loader: 'vue' },
          		//解析js文件， exclude为排除，query为编译为es2015,
                { test: /\.js$/, loader: "babel", exclude: /node_modules/, query: { presets: ['es2015'], plugins: ['transform-runtime'] } },

                { test: /\.css$/, loader: ExtractTextPlugin.extract('style', ['css']), exclude: /node_modules|bootstrap/, },

          		//将小于8192字节的图片转换为base64
                { test: /\.(jpg|png)$/, loader: "url?limit=8192" },
          
                //解析scss文件
                { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', ['css', 'sass']), exclude: /node_modules|bootstrap/, },

                //html模板编译
                { test: /\.(html|tpl)$/, loader: 'html' }
            ] 
    },
    plugins: [ //这里变中括号了！
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/tpl/index.html',
            inject: true //true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
        }),
      	//重命名css文件
        new ExtractTextPlugin('[name].[chunkhash].css')
    ]
}
```

### webpack.dev.config.js

```js
var config = require('./webpack.base.config.js');//引入base

config.devtool = 'eval-source-map';//开启source-map

config.devServer = {
  noInfo: true,
  hot:false//将热更新关闭，否则自动刷新会出错，在package.json里不要把热更新加进去
};

module.exports = config;
```

### webpack.prod.config.js

```js
var config = require('./webpack.base.config.js');
config.plugins = (config.plugins || []).concat([//这么写好像是为了避免出错。。
    new Webpack.BannerPlugin("author:cc"),//添加字符串
    new Webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new Webpack.optimize.UglifyJsPlugin({//开启压缩
        compress: {
            warnings: false
        }
    })
]);
module.exports = config;
```

## 坑

### package.json

加了多余的逗号 ' , ' ,如

```json
  "scripts": {
    "dev": "webpack-dev-server --inline --config webpack.dev.config.js",
    "build": "webpack --progress --hide-modules --config webpack.prod.config.js",
  }
```
编译sass可能会出错，把node-sass卸了重装可能有用。

应为

```json
  "scripts": {
    "dev": "webpack-dev-server --inline --config webpack.dev.config.js",
    "build": "webpack --progress --hide-modules --config webpack.prod.config.js"
  }
```

### webpack.config.js

不支持es6导入模块

output中filename设置[chunkhash]热刷新时会出错，可改为[hash]

resolve中alias，路径要搞清楚，是相对于使用了别名（即其所代表的模块）的模块的。

module拼错。。。。

loader里exclude排除啊，babel-loader那些杂七杂八的不能少

## 参考资料

[webpack入坑之旅](http://guowenfh.github.io/2016/03/24/vue-webpack-01-base/)

[进阶：构建具备版本管理能力的项目](http://www.jianshu.com/p/bb48898eded5)

[一小时包教会 —— webpack 入门指南](http://www.w2bc.com/Article/50764)

[ webpack多页应用架构系列](https://segmentfault.com/a/1190000006843916)

![](http://ww3.sinaimg.cn/mw690/6c7bfb12gw1f8bpv6ynwng205k03on1o.gif)

国庆喽~