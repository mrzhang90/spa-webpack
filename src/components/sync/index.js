// 这里是为了试验webpack tree-tracking增效插件，正常开发不要这么写，包会全部引入不规范，应该用第二种写法：{isArray}大括号的写法才是按需加载，正常加载和打包压缩也快
// import lodash from "lodash-es";
import {
    isArray
} from "lodash-es";
import item from "./sync.css";
console.log('item.main::',item)
const sync=function(){
    console.log('sync')
    // 通过css-loader 把css类名改成modules，就可以拿到item下的类
    document.querySelector('#app').innerHTML=`<h1 class="${item.test}">hello world</h1>`;
}
const isArray_custom=(args)=>{
    // console.log(lodash.isArray(args))
    console.log(isArray(args));
}
export {
    sync,
    isArray_custom
}