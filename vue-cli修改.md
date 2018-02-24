# vue-cli常用设置

> 基于vue-cli做了好几个项目了，想把一些自己的常用设置写出来，磨了好久，一看vue-cli3.0都快出来了，不能再磨了。。

## 路径相关

### css内引用的资源

`build` -> `utils.js`

```js
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
	//less

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        publicPath: '../../', //注意: 此处根据路径, 自动更改
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
```

### 本地访问

`config` -> `index.js`

```js
module.exports = {
  build: {
	//less
    //assetsPublicPath: '/',
    assetsPublicPath: './',
	//less
  },
  //less
}

```

## 调试相关

### 内网访问

`config` -> `index.js`

```js
module.exports = {
  //less
  dev: {
    //less
    port: process.env.PORT || 8080,//可改端口
    host:'192.168.0.105',//不是8080端口可能需要指定host为本机IP
  }
}

```

### 跨域代理

`config` -> `index.js`

```js
module.exports = {
  //less
  dev: {
    //less
    proxyTable: {
      '/AppHome': {
        target: 'http://192.168.0.211:2334',//接口域名
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^/AppHome': '/AppHome'//需要rewrite重写
        }
      }
    },
  }
}
```

```js
config -> dev.env.js
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST: '"AppHome/"' 
})

config -> prod.env.js
module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '"http://xxx.xxx.com/AppHome/"' //生产环境改为绝对地址，免得路径错了
}

//调用
this.$http
    .post(process.env.API_HOST + "GetApproveTypeList", { ID: 0 })
    .then(data => {
    let $data = data.data;
    if ($data.IsSuccess) {
        this.list.push(...$data.Model);
    }
});
```

### 路由加载切换

> 异步加载可以加快首屏加载速度，但是在开发阶段会导致热加载变慢，所以根据NODE_ENV来判断，开发环境不使用异步

```js
let _import
if (process.env.NODE_ENV === 'development') {
  _import = file => require('@/components/' + file + '.vue').default
}
if (process.env.NODE_ENV === 'production') {
  _import = file => () => import('@/components/' + file + '.vue')
}

routes: [
    {
        path: '/',
        name: 'Index',
        component: _import('Approve/Index'),
        meta: {
            level: 1
        }
    },
]
```



## 打包

### dll打包

1、在`build`目录新建`webpack.dll.conf.js`

```js
var path = require("path");
var webpack = require("webpack");

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        vendor: ['vue/dist/vue.esm.js', //有些资源需要直接指定js，否则会重复打包
                 'vuex',
                 'axios',
                 'vue-router'
                ]
    },
    output: {
        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
        // vendor.dll.js中暴露出的全局变量名。

    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        }),
        // 压缩打包的文件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
```

2、在`build`目录下的`webpack.prod.conf.js`添加新插件

```js
const webpackConfig = merge(baseWebpackConfig, {
   //less
  plugins: [
    //less
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../vendor-manifest.json')
    })
  ]
})
```

3、在项目根目录下的`index.html`内添加`dll.js`引用

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="./static/js/vendor.dll.js"></script>
  </body>
</html>
```

4、在项目根目录下的`package.json`内添加`dll`命令(顺便给`build`命令添加report)，运行一次生成`dll.js`

```json
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "build": "node build/build.js --report",
    "dll": "webpack --config build//webpack.dll.conf.js"
  }
```

### 关闭SourceMap

`config` -> `index.js`

```js
module.exports = {
  //less
  build: {
    //less
    productionSourceMap: false,
  },
}

```

