const {
    join
} = require("path");
// 用于深度范围分析的webpack插件.该插件只适用于import和export语法模块
    // webpack tree-tracking增效，强力清楚没有引用的代码
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
// 创建一个HTML文件，为html文件引入外部资源,将script和link打入进来。
    // 可以将script、link动态添加compile后的hash，防止引入缓存的外部文件问题
    // 可以生成创建html入口文件，比如单页面生成1个HTML入口文件，配置N个html-webpack-plugin生成N个入口文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 用于在构建之前删除/清除构建文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 轻量级CSS提取插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 净化CSS,删除没有用到的CSS。要安装两个包-purifycss-webpack 和 purify-css
const PurifyCSSPlugin = require('purifycss-webpack');
// 为webpack设计的合并，合并配置，合并对象
const merge=require("webpack-merge");
// 解析命令行参数，返回键和值的简单映射。参数，表示要解析的选项的字符串或字符串数​​组。
    // { _: [], mode: 'development' }
var argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || "development";

// 设置当前命令窗口 给一个标识
const setIterm2Badge = require('set-iterm2-badge');
setIterm2Badge(_mode);
// 是否正式环境
const _modeflag=_mode=="production" ? true : false;
const _mergeConfig=require(`./config/webpack.${_mode}.js`);
// 匹配获取文件
const glob = require("glob");
// 同步获取匹配文件
console.log("寻找文件", glob.sync(join(__dirname, './dist/*.html')));
WebpackConfig={
    module: {
        rules: [
          {
            test: /\.css$/,
            use:[
                // 把css打到js里
                // 'style-loader',
                // 把css提到外部css文件里
                {
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../'
                    }
                },
                // css类名 改成modules
                {
                    loader:'css-loader'
                    // loader:'css-loader?modules&localIndetName=[name]_[local]-[hash:base64:5]'
                }
            ]
          }
        ]
    },
    optimization:{
        // 生成common.bundles.js-
            // 公共包
        splitChunks:{
            // 以前用commensChunks,现在用这个
            cacheGroups:{
                commons:{
                    chunks:"initial",
                    name:"common",
                    minChunks:1,
                    // 最大请求出
                    maxInitialRequests:5,
                    minSize:0
                }
            }
        },
        // 生成runtime.bundles.js-
            // webpack运行时
        runtimeChunk:{
            name:"runtime"
        }
    },
    plugins: [
        // webpack tree-tracking增效，强力清楚没有引用的代码
        // new WebpackDeepScopeAnalysisPlugin(),
        // 把css提到外部css文件里
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css"
        }),
        // 净化css
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(join(__dirname, './src/*.html')),
        }),
        // 创建一个HTML文件，将script和link打入进来
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:"src/index.html"
        }),
        new CleanWebpackPlugin(['dist']),
    ],
}
module.exports=merge(_mergeConfig,WebpackConfig)