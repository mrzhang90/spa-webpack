module.exports={
    output:{
        filename:"scripts/[name].bundles.js"
    },
    devServer:{
        // 指定要监听的端口号
        port:3000,
        // 启用 webpack 的模块热替换特性
        // hot:true,
        // 接口-可以做mock数据
        before(app){
            app.get('/api/test',(req,res)=>{
                res.json({'code':200,'name':'john'})
            })
        }
    },
}