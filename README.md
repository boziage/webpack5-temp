# devtools和optimization
前者用于一些额外工具的配置比如socure map
后者可以配置一些优化的选项，比如tree shaking
optimization: {
    sideEffects: true,// 副作用（prod自动开启
    usedExports: true,// 用来标记为引用代码一边后续shaking（prod自动开启
    minimize: true,// 除了丑化还有shaking的作用（prod自动开启
    concatenateModules: true,// 函数作用域提升，用来将别的文件的函数等放到一个模块，可以减少体积，增加效率
},


# source Map
一些.min源码里面如果还给了source Map用于调试代码，而应用的时候开发者工具没有定位，可能是因为把引用的注释去了，可以在最后加上
//# sourceMappingUrl=文件名+后缀

目前webpack的source-map有25种

eval：是否使用eval执行模块代码
cheap：是否包含行信息
module：是否得到loader处理前的源代码
hidden：看不到sourcemap效果，得像上面自己引用回来
nosources：没有源代码，只有行列信息

推荐开发：cheap-module-eval？-source-map
生产：none

# HMR
4.1.0开始已经默认开启了
但是css有loader给我们处理了HMR，js，图片等并没有，所以他会刷新，别的框架不刷新是因为内部已经自行处理好了
文档：https://webpack.docschina.org/guides/hot-module-replacement#enabling-hmr

# 分环境配置
当你改了命名（即不为webpack.config.js）时，webpack命令执行需要加一个--config的配置（值为文件名）

# definePlugin
给代码注入全局成员，prod时默认开启，并默认在里面注入process.env.NODE_ENV

# babel
babel以及babel-loader看似将es5+转化为es5，实际上仅仅只是将如let，const转化为var，而箭头函数，promise这些，其实是babel依赖的corejs负责转化的，实现方式是如果没有这个方法，将会在预设集合里面（比如@babel/preset-env）里面拿到实现方法注入全局。

# tree-shaking 与 babel
tree-shaking是esModules特有的，而如果babel将代码转化为别的规范（如commonjs），tree-shaking就不会生效，（当然现在babel默认给我们处理了，关闭了转换插件）

# sideEffects 副作用
模块执行时，除导出成员之外所作的事，一半用于NPM包标记是否有副作用
功能开启除了在optimization里需要设置为true，
导入的npm包的package.json配置项也需要有：

  "sideEffects": false
  "sideEffects": [
    "./src/fun.js",
    "*.css"
  ]

配合标记才能实现不导入无副作用的包或者函数

# 代码切割
webpack能代码合并减少体积，以及根据动态导入不断加载模块，但是在资源加载时并不是所有资源都要在开始就要导入，而且单页面应用，资源加载的时间也会影响首屏白屏的时间，因此也要分包，按需加载

有多入口打包（多页面应用）和动态导入的方法
当然也有根据目标大小切割成一定数量的模块（这样可以并行加载模块，虽然http1.1同一个域名加载也有请求并行限制，而且也能放到cdn托管）